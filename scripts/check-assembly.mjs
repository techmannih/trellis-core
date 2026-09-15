import { readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"

// Check generated geometry, including component rotations, against the package
// drawings cited in docs/assembly.md. This is not a complete fabrication DRC.
export function checkAssembly(circuit) {
  const errors = []
  const ofType = (type) => circuit.filter((item) => item.type === type)
  const pads = ofType("pcb_smtpad")
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
  for (const name of ["D1", "U5", "U7"]) {
    const source = ofType("source_component").find((item) => item.name === name)
    const component = ofType("pcb_component").find((item) =>
      source && item.source_component_id === source.source_component_id)
    if (!component) { errors.push(`${name}: missing PCB component`); continue }
    const own = (type) => ofType(type).filter((item) => item.pcb_component_id === component.pcb_component_id)
    const ownPads = own("pcb_smtpad")
    const pad = (number) => ownPads.find((item) => item.port_hints?.includes(`pin${number}`))
    if (component.layer !== "top") errors.push(`${name}: assembly notes require a top-side component`)
    const requiredNotes = name === "D1" ? ["A (+)", "K (-)"] : [name === "U5" ? "1 DAT2" : "1 DIN"]
    for (const text of requiredNotes) {
      if (!own("pcb_fabrication_note_text").some((item) => item.text === text && item.layer === "top")) {
        errors.push(`${name}: missing assembly note ${text}`)
      }
    }
    if (name === "D1") {
      const label = own("pcb_silkscreen_text").find((item) => item.text === "K")
      if (!label || label.font_size < 1 || !pad(1) || !pad(2) ||
          distance(label.anchor_position, pad(2)) >= distance(label.anchor_position, pad(1))) {
        errors.push("D1: cathode label must be at least 1 mm high and nearest pin 2")
      }
      continue
    }
    const marker = own("pcb_silkscreen_circle").find((item) => item.layer === "top" && item.stroke_width >= 0.15)
    const nearest = marker && [...ownPads].sort((a, b) => distance(marker.center, a) - distance(marker.center, b))[0]
    if (!marker || !pad(1) || nearest !== pad(1)) {
      errors.push(`${name}: printable pin-1 marker is missing or points at the wrong pad`)
    } else {
      for (const other of pads.filter((item) => item.layer === "top")) {
        // Bounding rectangles are conservative for rounded pads. The current
        // board uses axis-aligned rect/rotated_rect pads after placement.
        const angle = -(other.ccw_rotation ?? 0) * Math.PI / 180
        const dx = marker.center.x - other.x, dy = marker.center.y - other.y
        const x = dx * Math.cos(angle) - dy * Math.sin(angle)
        const y = dx * Math.sin(angle) + dy * Math.cos(angle)
        if (!Number.isFinite(other.width) || !Number.isFinite(other.height)) continue
        const gap = Math.hypot(Math.max(Math.abs(x) - other.width / 2, 0),
          Math.max(Math.abs(y) - other.height / 2, 0)) - marker.radius - marker.stroke_width / 2
        if (gap < 0.15 - 1e-6) errors.push(`${name}: pin-1 marker is too close to ${other.pcb_smtpad_id} (${gap.toFixed(3)} mm)`)
      }
    }
    if (name === "U5") {
      // Check terminal coverage, not equality between package and land pitch.
      // Zetta section 9: e=1.25 BSC, b(max)=0.425 mm. Existing 0.8 mm
      // wide lands at 1.27 mm pitch provide 0.1575 mm nominal side margin.
      const rotation = -(component.rotation ?? 0) * Math.PI / 180
      const expectedY = { 1: 1.875, 2: 0.625, 3: -0.625, 4: -1.875,
        8: 1.875, 7: 0.625, 6: -0.625, 5: -1.875 }
      for (const [number, terminalY] of Object.entries(expectedY)) {
        const land = pad(number)
        if (!land) { errors.push(`U5: missing pad ${number}`); continue }
        const dx = land.x - component.center.x, dy = land.y - component.center.y
        const landY = dx * Math.sin(rotation) + dy * Math.cos(rotation)
        const sideMargin = Math.min(land.width, land.height) / 2 - 0.425 / 2 - Math.abs(landY - terminalY)
        if (!Number.isFinite(sideMargin) || sideMargin < 0.15 - 1e-6) errors.push(`U5: pad ${number} has insufficient terminal side margin (${sideMargin.toFixed(3)} mm)`)
      }
    }
  }
  return errors
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const circuit = JSON.parse(readFileSync(process.argv[2] ?? "dist/index/circuit.json", "utf8"))
  const errors = checkAssembly(circuit)
  for (const error of errors) console.error(error)
  console.log(`Assembly orientation/footprint check: ${errors.length} errors.`)
  if (errors.length) process.exitCode = 1
}
