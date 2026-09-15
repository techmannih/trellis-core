import { readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { checkAssembly } from "./check-assembly.mjs"

const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const buildErrors = circuit.filter((item) => item.type.endsWith("_error"))
if (buildErrors.length) throw new Error(`Refusing to export an assembly drawing from a build with ${buildErrors.length} errors. Run bun run verify and resolve them first.`)
const errors = checkAssembly(circuit)
if (errors.length) throw new Error(errors.join("\n"))
// Keep component pads, silk, pin numbers and fabrication notes. Remove routed
// copper so the assembly notes are legible; this is not a fabrication Gerber.
const drawing = circuit.filter((item) => !["pcb_trace", "pcb_via", "pcb_copper_pour", "pcb_solder_paste"].includes(item.type))
  .map((item) => item.type.startsWith("pcb_fabrication_note_") ? { ...item, color: "#174ea6" } : item)
writeFileSync("dist/index/assembly-top.svg", convertCircuitJsonToPcbSvg(drawing, {
  width: 1600, height: 1600, layer: "top", backgroundColor: "#fff",
  showPinNumbers: true, showPcbNotes: true, showCourtyards: false,
  colorOverrides: { copper: { top: "#b8c1cc" }, silkscreen: { top: "#222" },
    drill: "#fff", boardOutline: "#555", substrate: "#fff" },
}))
console.log("Wrote dist/index/assembly-top.svg; send with docs/assembly.md, BOM and placement files.")
