import { expect, test } from "bun:test"
import { createElement as h } from "react"
import { Circuit } from "@tscircuit/core"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"

test("autoroutes GND and SIGNAL between their through-vias on inner1", async () => {
  const circuit = new Circuit()
  circuit.add(h("board", { width: 12, height: 12, layers: 4, autorouterVersion: "beta_pipeline7" },
    // Force both via-to-via routes across the board on inner1.
    h("keepout", { shape: "rect", width: 0.3, height: 12, layers: ["top", "inner2", "bottom"] }),
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
  const { db } = circuit
  const connectivityMap = getFullConnectivityMapFromCircuitJson(circuit.getCircuitJson())
  const innerLayerTraces = db.pcb_trace.list().filter((trace) =>
    trace.route.some((point) => point.route_type === "wire" && point.layer === "inner1"))
  expect(innerLayerTraces).toHaveLength(2)

  const nets = ["GND", "SIGNAL"].map((name) =>
    db.source_net.list().find((net) => net.name === name))
  for (const net of nets) {
    const vias = db.pcb_via.list().filter((via) => via.source_net_id === net.source_net_id)
    expect(vias).toHaveLength(2)
    expect(connectivityMap.areAllIdsConnected([
      net.source_net_id,
      ...vias.map((via) => via.pcb_via_id),
    ])).toBe(true)

    const reachesVia = (point, via) =>
      Math.hypot(point.x - via.x, point.y - via.y) < 1e-6
    const routes = innerLayerTraces.filter((trace) => {
      const endpoints = [trace.route[0], trace.route.at(-1)]
      return vias.every((via) => endpoints.some((point) => reachesVia(point, via)))
    })
    expect(routes).toHaveLength(1)
    for (const point of routes[0].route) {
      expect(point.route_type).toBe("wire")
      expect(point.layer).toBe("inner1")
      // This unobstructed row must stay separate from the other net's row.
      expect(point.y).toBeCloseTo(vias[0].y, 5)
    }
    for (const via of vias) expect(via.layers).toContain("inner1")
  }
  expect(connectivityMap.areIdsConnected(nets[0].source_net_id, nets[1].source_net_id)).toBe(false)
})
