import { expect, test } from "bun:test"
import { createElement as h } from "react"
import { Circuit } from "@tscircuit/core"

test("inner-layer routes retain the distinct nets of their through-via endpoints", async () => {
  const circuit = new Circuit()
  circuit.add(h("board", { width: 12, height: 12, layers: 4, routingDisabled: true },
    ...["GND", "SIGNAL"].flatMap((net, row) => [
      h("net", { name: net }),
      ...["A", "B"].map((end, column) => h("via", {
        name: `${net}_${end}`, pcbX: column * 4 - 2, pcbY: row * 4 - 2,
        fromLayer: "top", toLayer: "bottom", outerDiameter: 0.4,
        holeDiameter: 0.2, connectsTo: `net.${net}`,
      })),
      h("trace", { name: net, from: `.${net}_A > .top`, to: `.${net}_B > .top` }),
    ]),
  ))
  await circuit.renderUntilSettled()
  const board = circuit.firstChild
  const { db } = circuit
  const expected = ["GND", "SIGNAL"].map((name) => {
    const source = db.source_trace.list().find((trace) => trace.name === name)
    const ports = source.connected_source_port_ids.map((id) =>
      db.pcb_port.list().find((port) => port.source_port_id === id))
    expect(ports.every((port) => port.layers.includes("top"))).toBe(true)
    expect(ports.every((port) => !port.layers.includes("inner1"))).toBe(true)
    return { source, ports }
  })
  // Reproduce the autorouter's output before core adds route endpoint IDs.
  board._asyncAutoroutingResult = {
    output_pcb_traces: expected.map(({ ports }, index) => ({
      type: "pcb_trace", pcb_trace_id: `routed_${index}`,
      connectsTo: ports.map((port) => port.pcb_port_id),
      route: ports.map(({ x, y }) => ({ route_type: "wire", layer: "inner1", width: 0.2, x, y })),
    })),
  }
  board._updatePcbTraceRenderFromPcbTraces()
  for (const [index, { source }] of expected.entries()) {
    expect(db.pcb_trace.get(`routed_${index}`).source_trace_id).toBe(source.source_trace_id)
  }
  expect(expected[0].source.subcircuit_connectivity_map_key)
    .not.toBe(expected[1].source.subcircuit_connectivity_map_key)
})
