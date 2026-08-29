# Imported components

The wrappers in this directory were generated with `tsci import --jlcpcb --use-exact-footprint`.

The upstream T113-S3 catalog record `C41411351` is unavailable to the importer. U3 therefore uses the active JLCPCB record `C5197687`, which imports the same T113-S3 ELQFP-128 pin map, its exact 129-pad footprint, and local OBJ/STEP assets. Its imported footprint has a 90-degree local-orientation difference that is compensated in `index.circuit.tsx`.

`CM4024M00008001.tsx` uses its generated default tscircuit schematic symbol because the catalog-generated custom crystal symbol triggered a duplicate-ground-alias port-resolution bug. Its footprint and CAD model remain unchanged.
