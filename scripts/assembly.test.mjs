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
