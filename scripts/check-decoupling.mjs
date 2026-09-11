import { readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"
import mapping from "./decoupling-map.json" with { type: "json" }

// Measure the copper polyline, not the straight-line distance or cached length.
// A through-via contributes the board thickness as well as both adjacent wires.
export function routeLength(route, thickness) {
  let length = 0
  let layer = route[0]?.layer
  for (let i = 0; i < route.length; i++) {
    const point = route[i]
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new Error("Route contains invalid coordinates")
    }
    if (i) length += Math.hypot(point.x - route[i - 1].x, point.y - route[i - 1].y)
    if (point.route_type === "via") {
      if (point.from_layer !== layer || point.to_layer === layer) {
        throw new Error("Invalid via layer transition")
      }
      // Conservatively count the full board thickness for any layer transition.
      length += thickness
      layer = point.to_layer
    } else if (point.route_type !== "wire" || point.layer !== layer) {
      throw new Error("Wire changes layer without a via")
    }
  }
  return length
}

export function checkDecoupling(circuit, requirements = mapping) {
  const ofType = (type) => circuit.filter((element) => element.type === type)
  const components = ofType("source_component")
  const pcbComponents = ofType("pcb_component")
  const ports = ofType("source_port")
  const pcbPorts = ofType("pcb_port")
  const traces = ofType("source_trace")
  const pcbTraces = ofType("pcb_trace")
  const board = ofType("pcb_board")[0]
  if (!(board?.thickness > 0)) throw new Error("Build a PCB before checking decoupling")
  const ground = ofType("source_net").find((net) => net.name === "GND" && net.is_ground)
  // The CLI can return success while the generated circuit contains routing errors.
  const errors = circuit.filter((item) => item.type.endsWith("_error"))
    .map((item) => `${item.type}: ${item.message ?? "Build error"}`)
  for (const component of components) {
    const placement = pcbComponents.find((pcb) => pcb.source_component_id === component.source_component_id)
    if (placement?.layer !== "top") errors.push(`${component.name}: expected top-side assembly`)
  }
  if (!ofType("pcb_copper_pour").some((pour) => pour.layer === "inner1" && pour.source_net_id === ground?.source_net_id)) {
    errors.push("Missing inner1 GND plane")
  }
  const results = []
  for (const { capacitor, chip, pin, label, maxLength } of requirements) {
    try {
      const component = (name) => components.find((item) => item.name === name)
      const port = (name, number) => ports.find((item) =>
        item.source_component_id === component(name)?.source_component_id && item.pin_number === number)
      const cap = component(capacitor)
      const capPower = port(capacitor, 1)
      const capGround = port(capacitor, 2)
      const target = port(chip, pin)
      if (!capPower || !target || target.name !== label) throw new Error("Missing or incorrect capacitor/IC pin")
      if (!ground || capGround?.subcircuit_connectivity_map_key !== ground.subcircuit_connectivity_map_key) {
        throw new Error("Capacitor pin 2 is not on GND")
      }
      const trace = traces.find((item) => item.name === `DECOUPLE_${capacitor}`)
      if (trace?.connected_source_port_ids?.length !== 2 ||
          ![capPower, target].every((p) => trace.connected_source_port_ids.includes(p.source_port_id))) {
        throw new Error(`Expected a dedicated connection to ${chip}.${label} (pin ${pin})`)
      }
      if (trace.max_length !== maxLength || cap.max_decoupling_trace_length !== maxLength) {
        throw new Error(`Expected the reviewed ${maxLength} mm limit on both capacitor and trace`)
      }
      const endpoints = [capPower, target].map((p) =>
        pcbPorts.find((pcb) => pcb.source_port_id === p.source_port_id))
      if (endpoints.some((p) => !p)) throw new Error("Missing PCB pads")
      const directRoutes = pcbTraces.filter((pcb) => {
        if (pcb.source_trace_id !== trace.source_trace_id) return false
        const ids = pcb.route.flatMap((p) => [p.start_pcb_port_id, p.end_pcb_port_id])
        return endpoints.every((p) => ids.includes(p.pcb_port_id))
      })
      if (!directRoutes.length) throw new Error("Missing direct routed connection; a shared rail branch is insufficient")
      const lengths = directRoutes.map((pcb) => {
        if (pcb.route.some((point) => point.route_type !== "wire" || point.layer !== "top")) {
          throw new Error("Bypass route must stay on top with no vias")
        }
        const first = pcb.route[0]
        const last = pcb.route.at(-1)
        for (const [point, id] of [[first, first.start_pcb_port_id], [last, last.end_pcb_port_id]]) {
          const pad = endpoints.find((p) => p.pcb_port_id === id)
          if (!pad?.layers.includes(point.layer)) throw new Error("Route ends on the wrong pad layer")
        }
        return routeLength(pcb.route, board.thickness)
      })
      const length = Math.max(...lengths)
      if (length > maxLength + 0.001) throw new Error(`Routed length ${length.toFixed(2)} mm exceeds ${maxLength} mm`)
      const returnTrace = traces.find((item) => item.name === `RETURN_${capacitor}`)
      if (returnTrace?.max_length !== 1 || returnTrace.connected_source_port_ids.length !== 2 ||
          !returnTrace.connected_source_port_ids.includes(capGround.source_port_id)) {
        throw new Error("Missing dedicated 1 mm ground return")
      }
      const viaSourcePort = ports.find((p) => returnTrace.connected_source_port_ids.includes(p.source_port_id) && p !== capGround)
      const sourceVia = ofType("source_manually_placed_via").find((via) =>
        via.source_manually_placed_via_id === viaSourcePort?.source_component_id)
      if (sourceVia?.source_net_id !== ground.source_net_id) throw new Error("Return via is not tied to GND")
      const returnPads = [capGround, viaSourcePort].map((p) => pcbPorts.find((pcb) => pcb.source_port_id === p?.source_port_id))
      const viaPad = returnPads[1]
      if (!viaPad || !ofType("pcb_via").some((via) => via.source_net_id === ground.source_net_id &&
          via.layers.includes("inner1") && Math.hypot(via.x - viaPad.x, via.y - viaPad.y) < 0.001)) {
        throw new Error("Return via does not reach the inner GND plane")
      }
      const returnRoutes = pcbTraces.filter((pcb) => pcb.source_trace_id === returnTrace.source_trace_id &&
        returnPads.every((pad) => pad && pcb.route.some((p) => p.start_pcb_port_id === pad.pcb_port_id || p.end_pcb_port_id === pad.pcb_port_id)))
      if (!returnRoutes.length) throw new Error("Missing routed ground return")
      const returnLength = Math.max(...returnRoutes.map((pcb) => routeLength(pcb.route, board.thickness)))
      if (returnLength > 1.001) throw new Error(`Ground return ${returnLength.toFixed(2)} mm exceeds 1 mm`)
      results.push({ capacitor, target: `${chip}.${label}`, length, maxLength, returnLength })
    } catch (error) {
      errors.push(`${capacitor}: ${error.message}`)
    }
  }
  return { results, errors }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const circuit = JSON.parse(readFileSync(process.argv[2] ?? "dist/index/circuit.json", "utf8"))
  const { results, errors } = checkDecoupling(circuit)
  for (const row of results) console.log(`${row.capacitor} → ${row.target}: ${row.length.toFixed(2)} / ${row.maxLength} mm; GND return ${row.returnLength.toFixed(2)} / 1 mm`)
  for (const error of errors) console.error(error)
  console.log(`${results.length}/${mapping.length} decoupling connections passed; ${errors.length} validation errors.`)
  if (errors.length) process.exitCode = 1
}
