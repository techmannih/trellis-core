# Notices

## Upstream covered source

Trellis Core hardware design

Copyright 2025 Protolux Electronics SARL-S

Upstream source: <https://github.com/protolux-electronics/trellis_core>

Pinned source revision: `db4fe71623c14bcea47d7457d0db4c99d3899124`

Upstream hardware licence: CERN Open Hardware Licence Version 2 — Permissive (CERN-OHL-P-2.0). A verbatim copy is included in `LICENSE`.

The upstream design is supplied without warranty. Its README says that this exact routing/layout has not been ordered or tested and should be reviewed and adapted before manufacture.

## Modification notice — 2026-08-26

The upstream KiCad hardware source was modified by converting it to a tscircuit implementation. The conversion:

- translated the 50 mm × 50 mm outline, component centers, rotations, pad nets, 528 tracks, 80 vias, and 16 filled copper polygons into committed TypeScript reference data;
- represented the hierarchy as five tscircuit schematic sheets;
- substituted exact JLCPCB catalog wrappers and CAD where available while retaining source designators and the original center coordinates in the audit data;
- converted the custom T113 129-pad footprint and added a generic official KiCad LQFP-128 STEP model;
- retained the two unresolved upstream resistor values as explicitly unspecified;
- omitted the Protolux Electronics logo and decorative branded silkscreen from the modified board, as trademark/logo rights are not granted;
- created a derived PCB placement by applying small, explicit offsets to selected components, anchoring functional groups, and autorouting the moved layout instead of rendering the upstream copper by default;
- retained the upstream copper geometry as an optional reference renderer rather than representing it as the route of the shifted board; and
- added project-local build/check commands, tscircuit snapshots, and validation documentation.

Protolux Electronics and Trellis Core are referenced factually for attribution. This modified source is not endorsed by, sponsored by, or presented as originating from Protolux Electronics.

Third-party component models and catalog metadata remain subject to their original terms.
