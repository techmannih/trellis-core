import { expect, test } from "bun:test"
import { createElement as h } from "react"
import { Circuit } from "@tscircuit/core"
import { NCD0805R1 } from "../imports/NCD0805R1"
import { ZDSD04GLGEAG } from "../imports/ZDSD04GLGEAG"
import { XL_2121RGBC_2812B } from "../imports/XL_2121RGBC_2812B/XL_2121RGBC_2812B"
import { checkAssembly } from "./check-assembly.mjs"

async function fixture(rotation) {
  const circuit = new Circuit()
  circuit.add(h("board", { width: 50, height: 40, routingDisabled: true },
    h(NCD0805R1, { name: "D1", pcbX: -15, pcbRotation: rotation }),
    h(ZDSD04GLGEAG, { name: "U5", pcbX: 0, pcbRotation: rotation }),
    h(XL_2121RGBC_2812B, { name: "U7", pcbX: 15, pcbRotation: rotation }),
  ))
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}

test("terminal coverage, polarity notes and markers survive 0/90/180/270 degree placement", async () => {
  for (const rotation of [0, 90, 180, 270]) expect(checkAssembly(await fixture(rotation))).toEqual([])
})

test("C84256 pin numbering preserves the LED's physical polarity and connections", async () => {
  const circuit = new Circuit()
  circuit.add(h("board", { width: 10, height: 10, routingDisabled: true },
    h(NCD0805R1, {
      name: "D1",
      connections: { anode: "net.LED_SUPPLY", cathode: "net.LED_RETURN" },
    }),
  ))
  await circuit.renderUntilSettled()
  const { db } = circuit
  const led = db.source_component.list().find((component) => component.name === "D1")
  for (const [pin, polarity, netName, x] of [
    [1, "cathode", "LED_RETURN", -1.100074],
    [2, "anode", "LED_SUPPLY", 1.100074],
  ]) {
    const port = db.source_port.list().find((p) =>
      p.source_component_id === led.source_component_id && p.pin_number === pin)
    const net = db.source_net.list().find((n) => n.name === netName)
    expect(port.port_hints).toContain(polarity)
    expect(port.subcircuit_connectivity_map_key).toBe(net.subcircuit_connectivity_map_key)
    const pcbPort = db.pcb_port.list().find((p) => p.source_port_id === port.source_port_id)
    const pad = db.pcb_smtpad.list().find((p) => p.pcb_port_id === pcbPort.pcb_port_id)
    expect(pad.x).toBeCloseTo(x, 6)
    expect(pad.port_hints).toContain(`pin${pin}`)
  }
})

test("assembly check rejects flash lands that no longer cover the 1.25 mm package terminals", async () => {
  const circuit = await fixture(0)
  const flash = circuit.find((item) => item.type === "source_component" && item.name === "U5")
  const pcb = circuit.find((item) => item.type === "pcb_component" && item.source_component_id === flash.source_component_id)
  for (const pad of circuit.filter((item) => item.type === "pcb_smtpad" && item.pcb_component_id === pcb.pcb_component_id)) pad.y *= 1.5 / 1.27
  expect(checkAssembly(circuit).join()).toContain("insufficient terminal side margin")
})

test("assembly check rejects absent notes, thin markers and wrong-corner markers", async () => {
  const circuit = await fixture(0)
  const missing = circuit.filter((item) => item.type !== "pcb_fabrication_note_text")
  expect(checkAssembly(missing).join()).toContain("missing assembly note")
  const marker = circuit.find((item) => item.type === "pcb_silkscreen_circle" && item.stroke_width >= 0.15)
  marker.stroke_width = 0.1
  expect(checkAssembly(circuit).join()).toContain("pin-1 marker")
  marker.stroke_width = 0.18
  marker.center.y *= -1
  expect(checkAssembly(circuit).join()).toContain("wrong pad")
})

test("empty assembly cannot pass", () => {
  expect(checkAssembly([])).toHaveLength(3)
})
