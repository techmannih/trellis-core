import { expect, test } from "bun:test"
import { routeLength, checkDecoupling } from "./check-decoupling.mjs"

test("measures detours rather than endpoint distance", () => {
  const route = [[0, 0], [0, 4], [3, 4], [3, 0]].map(([x, y]) => ({ route_type: "wire", layer: "top", x, y }))
  expect(routeLength(route, 1.6)).toBe(11)
})

test("counts both sides of a via and its physical depth", () => {
  expect(routeLength([
    { route_type: "wire", layer: "top", x: 0, y: 0 },
    { route_type: "via", from_layer: "top", to_layer: "bottom", x: 1, y: 0 },
    { route_type: "wire", layer: "bottom", x: 3, y: 0 },
  ], 1.6)).toBe(4.6)
})

test("rejects a layer change with no via", () => {
  expect(() => routeLength([
    { route_type: "wire", layer: "top", x: 0, y: 0 },
    { route_type: "wire", layer: "bottom", x: 1, y: 0 },
  ], 1.6)).toThrow("without a via")
})

test("missing hardware fails instead of silently checking an empty subset", () => {
  const result = checkDecoupling([{ type: "pcb_board", thickness: 1.6 }])
  expect(result.results).toHaveLength(0)
  expect(result.errors.length).toBeGreaterThan(0)
})

const requirement = [{ capacitor: "C1", chip: "U1", pin: 1, label: "VCC", maxLength: 3 }]
function fixture() {
  return [
    { type: "pcb_board", thickness: 1.6 },
    { type: "source_net", name: "GND", source_net_id: "gnd", is_ground: true, subcircuit_connectivity_map_key: "gnd" },
    { type: "source_component", name: "C1", source_component_id: "c1", max_decoupling_trace_length: 3 },
    { type: "source_component", name: "U1", source_component_id: "u1" },
    { type: "pcb_component", source_component_id: "c1", layer: "top" },
    { type: "pcb_component", source_component_id: "u1", layer: "top" },
    { type: "source_port", source_port_id: "c+", source_component_id: "c1", pin_number: 1 },
    { type: "source_port", source_port_id: "c-", source_component_id: "c1", pin_number: 2, subcircuit_connectivity_map_key: "gnd" },
    { type: "source_port", source_port_id: "vcc", source_component_id: "u1", pin_number: 1, name: "VCC" },
    { type: "source_port", source_port_id: "via-top", source_component_id: "via" },
    { type: "source_manually_placed_via", source_manually_placed_via_id: "via", source_net_id: "gnd" },
    ...[["c+", 1], ["c-", 2], ["vcc", 0], ["via-top", 2.7]].map(([id, x]) => ({
      type: "pcb_port", source_port_id: id, pcb_port_id: `pcb-${id}`, layers: ["top"], x, y: 0,
    })),
    { type: "source_trace", name: "DECOUPLE_C1", source_trace_id: "power", connected_source_port_ids: ["vcc", "c+"], max_length: 3 },
    { type: "source_trace", name: "RETURN_C1", source_trace_id: "return", connected_source_port_ids: ["c-", "via-top"], max_length: 1 },
    { type: "pcb_trace", source_trace_id: "power", route: [
      { route_type: "wire", layer: "top", x: 0, y: 0, start_pcb_port_id: "pcb-vcc" },
      { route_type: "wire", layer: "top", x: 1, y: 0, end_pcb_port_id: "pcb-c+" },
    ] },
    { type: "pcb_trace", source_trace_id: "return", route: [
      { route_type: "wire", layer: "top", x: 2, y: 0, start_pcb_port_id: "pcb-c-" },
      { route_type: "wire", layer: "top", x: 2.7, y: 0, end_pcb_port_id: "pcb-via-top" },
    ] },
    { type: "pcb_via", source_net_id: "gnd", layers: ["top", "inner1", "bottom"], x: 2.7, y: 0 },
    { type: "pcb_copper_pour", source_net_id: "gnd", layer: "inner1" },
  ]
}

test("a local bypass and ground via pass, but a routed detour fails", () => {
  const circuit = fixture()
  expect(checkDecoupling(circuit, requirement).errors).toEqual([])
  circuit.find((item) => item.type === "pcb_trace" && item.source_trace_id === "power").route.splice(1, 0,
    { route_type: "wire", layer: "top", x: 0, y: 4 })
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("exceeds 3 mm")
})

test("logical connectivity alone is insufficient, and relaxed limits are rejected", () => {
  let circuit = fixture().filter((item) => !(item.type === "pcb_trace" && item.source_trace_id === "power"))
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("Missing direct routed connection")
  circuit = fixture()
  circuit.find((item) => item.name === "DECOUPLE_C1").max_length = 25
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("reviewed 3 mm limit")
})

test("a ground via must reach the plane, and build errors cannot be ignored", () => {
  const circuit = fixture()
  circuit.find((item) => item.type === "pcb_via").layers = ["top"]
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("does not reach")
  const failedBuild = [...fixture(), { type: "pcb_autorouting_error", message: "Unrouted connection" }]
  expect(checkDecoupling(failedBuild, requirement).errors.join()).toContain("Unrouted connection")
})

test("assembly must remain on top, including components other than bypass capacitors", () => {
  const circuit = fixture()
  circuit.find((item) => item.type === "pcb_component" && item.source_component_id === "u1").layer = "bottom"
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("U1: expected top-side assembly")
})

test("a short bypass cannot change copper layers", () => {
  const circuit = fixture()
  circuit.find((item) => item.type === "pcb_board").thickness = 0.5
  circuit.find((item) => item.type === "pcb_trace" && item.source_trace_id === "power").route.splice(1, 0,
    { route_type: "via", from_layer: "top", to_layer: "inner1", x: 0.5, y: 0 },
    { route_type: "wire", layer: "inner1", x: 0.5, y: 0 },
    { route_type: "via", from_layer: "inner1", to_layer: "top", x: 0.5, y: 0 })
  expect(checkDecoupling(circuit, requirement).errors.join()).toContain("Bypass route must stay on top with no vias")
})
