# Trellis Core

A derived tscircuit implementation of the standalone [Protolux Electronics Trellis Core](https://github.com/protolux-electronics/trellis_core) board, based on upstream commit [`db4fe71623c14bcea47d7457d0db4c99d3899124`](https://github.com/protolux-electronics/trellis_core/commit/db4fe71623c14bcea47d7457d0db4c99d3899124).

This is not a BoosterPack. It is a 50 mm × 50 mm, four-layer minimal Linux-capable board built around the Allwinner T113 family, with managed flash, USB-C power/data, 3.3 V and 0.9 V buck converters, 24 MHz and 32.768 kHz clocks, reset and FEL buttons, and four 2.7 mm mounting holes.

## Reconstruction scope

- All 84 electrical components and four mounting holes retain the upstream reference designators. Every value, supplier number, connection, schematic coordinate, and PCB coordinate is written explicitly in `index.circuit.tsx`; selected parts use small placement changes so this is a deliberate variant rather than an exact placement copy.
- The T113 package uses JLCPCB record `C5197687`, with its exact 129-pad footprint, complete pin map, and local CAD assets. This replaces the unavailable upstream catalog record `C41411351`.
- The active board uses a fresh four-layer tscircuit autoroute so the explicitly moved pads remain electrically connected. Upstream KiCad track/zone geometry is not copied into the runtime project.
- Five A4-framed, group-free schematic sheets use direct component-to-sheet assignments. Thirteen named sections separate the buck rails, processor support, clocks, reset, boot straps, storage control, and USB protection.
- Catalog parts use exact JLCPCB imports with their footprints, supplier numbers, and CAD models. The CPU uses the active T113-S3 JLCPCB record `C5197687` because the upstream record is no longer exposed by the catalog importer.
- The source board's 50 mm outline, green solder mask, and four-layer stack are retained. Dense passive rows, the USB section, storage section, and selected support parts are moved by small amounts to clear imported-footprint courtyards. The Protolux Electronics logo and branded decorative silkscreen are intentionally omitted because upstream explicitly excludes trademark/logo rights from the hardware license.

The upstream source leaves `R8` and `R9` as `TODO`. This variant resolves both as standard 100 kΩ 0402 resistors (`0402WGF1003TCE`, JLCPCB/LCSC `C25741`) to reuse an existing board BOM line. `R9` weakly pulls the otherwise-unused `GPADC0` input to ground, while `R8` retains the upstream `V_MEASURE` spare/no-connect pad topology.

## Files

- `index.circuit.tsx` — explicit components, supplier selections, connections, schematic organization, PCB placement, and autorouting configuration.
- `imports/` — exact catalog component wrappers and the custom T113 package.
- `package.json`, `tsconfig.json`, and `tscircuit.config.json` — project-local commands and toolchain configuration, so the commands below target Trellis Core even when run from this directory.
- `__snapshots__/` — checked PCB, schematic, and fixed-angle 3D renders.
- `NOTICE.md` and `LICENSE` — upstream attribution, modification notice, and CERN-OHL-P-2.0 text.

```text
.
├── index.circuit.tsx          Main tscircuit source, schematic organization, and PCB layout
├── imports/                   Exact component, footprint, symbol, and CAD definitions
├── __snapshots__/             Schematic, PCB, and fixed-angle 3D reference renders
├── dist/index/circuit.json    Generated circuit consumed by viewers and handoff tools
├── package.json               Development, verification, preview, and handoff commands
└── tscircuit.config.json      Project-local tscircuit entrypoint and build timeout
```

## Validation status

Re-verified on 2026-08-27 with Bun 1.3.14 and tscircuit 0.0.2442:

- `bun install` — passes and installs the project-local toolchain.
- `bun run typecheck` — passes.
- `bunx tsci check netlist` — zero errors and zero warnings.
- `bunx tsci check schematic-placement` — completes successfully and reports schematic simplification suggestions.
- `bunx tsci check placement` — reports no placement issues and zero DRC errors or warnings.
- `bunx tsci check routing-difficulty` — completes successfully and reports the expected dense T113 fan-out regions.
- `bunx tsci build index.circuit.tsx` — passes and writes the circuit build to `dist/`.
- `bunx tsci check shorts index.circuit.tsx` — no shorts detected across the generated Gerbers.
- `bun run build` — exits successfully and writes circuit JSON to `dist/`.
- `bun run build:preview` — writes circuit JSON plus PCB, schematic, and 3D previews to `dist/`.
- `bun run snapshot:update` and `bun run snapshot:3d:update` — pass and refresh all checked snapshots.
The upstream PCB contains 89 footprints: 84 electrical components, four mounting-hole footprints, and one branded logo footprint. This project renders the 84 electrical components and four holes. The logo is intentionally omitted.

The routing-difficulty check is advisory and reports congestion probabilities rather than pass/fail DRC errors. Run a fabrication-specific DRC and review the KiCad output before manufacture.

The upstream author states that this exact schematic/layout has not itself been fabricated or tested, although derived boards have been. Treat this reconstruction as reference hardware source, not as production validation.

## Run

```sh
cd /Users/manishchaudhary/repo/ts/boosters/trellis-core
bun install
bun run dev
```

The project uses the same self-contained `tsci` project pattern as the USB-C PD charger: one main circuit entrypoint, local imported parts, generated outputs, checked snapshots, and project-local commands. For the complete validation workflow:

```sh
bun run typecheck
bunx tsci check netlist
bunx tsci check schematic-placement
bunx tsci check placement
bunx tsci check routing-difficulty
bunx tsci build index.circuit.tsx
bunx tsci check shorts index.circuit.tsx
bun run build
bun run snapshot:update
bun run snapshot:3d:update
```

The complete non-snapshot verification can also be run together with either command:

```sh
bun run verify
bun run check
```

Additional product-style commands are available:

```sh
bun run build:preview
bun run snapshot:3d
bun run build:handoff
```

`build:handoff` generates KiCad, STEP, and GLB deliverables under `dist/`; inspect those exports before any manufacturing release.

## Licensing

The upstream hardware is Copyright 2025 Protolux Electronics SARL-S and is provided under CERN-OHL-P-2.0. See `NOTICE.md` and `LICENSE`. Third-party catalog CAD models remain under their respective authors' terms. No use of the Protolux Electronics name in this documentation implies endorsement.
