# Fabrication and assembly notes

Applies to the Trellis Core layout in this repository. View the board from the
component/top side with USB-C J1 at the bottom. All components are top-side.

## Files to supply with the order

Run `bun run verify`, then `bun run export:assembly`. Supply the resulting
`dist/index/assembly-top.svg` and this document with the BOM, component placement
file and final fabrication outputs. The assembly drawing is a top view, not a
mirrored bottom view. Fabrication notes belong in the assembly/F.Fab documentation;
they are not extra copper or extra silkscreen text.

Confirm that the assembler's placement preview aligns the physical package marks
with the pad functions below. A placement-file rotation number alone is
insufficient because library zero-angle conventions can differ.

## Orientation of the polarized parts

| Reference | Part | Orientation on this board |
| --- | --- | --- |
| D1 | NCD0805R1 | Pin 1/anode is the upper pad, connected to P3V3. Pin 2/cathode is the lower pad, connected through R4 to GND. The printed `K` identifies the cathode end; assembly labels are `A (+)` and `K (-)`. |
| U5 | ZDSD04GLGEAG | Pin 1/DAT2 is the leftmost pad in the lower row. Align the package pin-1 corner with the PCB circle and `1 DAT2` callout. U5 is placed at 90 degrees in the source layout. |
| U7 | XL-2121RGBC-2812B | The package's marked/chamfered corner is pin 1/DIN, at the lower-right corner on this board. Align it with the PCB circle and `1 DIN` callout. |

U7 top view:

```text
       3 / DO       2 / VDD (+5 V)
           +-------+
           |  U7   |
           +------/  <- package mark
       4 / GND      1 / DIN   o <- PCB dot
```

Pin 3/DO is intentionally unconnected. Do not use a generic WS2812 package pinout
to override the drawing for this exact XINGLIGHT part.

U5 top view in its current board rotation:

```text
   8 VDD     7 DAT1     6 DAT0     5 CMD
        +-----------------------+
        |          U5           |
        +-----------------------+
   1 DAT2    2 DAT3     3 CLK      4 GND
 o <- PCB pin-1 circle
```

### U5 package pitch and solder lands

The Zetta package has **1.25 mm terminal pitch**. The existing PCB solder lands
retain **1.27 mm spacing**, with centers at +/-1.905 and +/-0.635 mm in each
unrotated column. These are different dimensions: the wider solder lands can
accommodate the package terminals. With a centered package, the largest terminal
center offset is 0.030 mm. The 0.800 mm land width along the pitch direction and
datasheet maximum terminal width `b = 0.425 mm` leave a minimum nominal side
margin of `(0.800 - 0.425) / 2 - 0.030 = 0.1575 mm`.

This land pattern preserves the verified copper routing. The geometry check
requires at least 0.15 mm nominal side margin; it does not establish assembly
placement/process tolerances. Ask the assembler to confirm this exact LGA8 land
pattern against the package drawing during DFM. Do not substitute a generic
1.27 mm-pitch IC for U5.

U5 and U7 orientation circles use 0.18 mm strokes; D1's cathode character is
1 mm high.

The remaining ICs must also match their pin-1 marks and the placement preview.
J2/J3 pin 1 is P3V3 and pin 2 is GND; connector pinouts are in the README. All
populated capacitors are ceramic/MLCC parts and do not require +/- polarity.

## PCB fabrication settings

| Item | Design value |
| --- | --- |
| Size | 50 x 50 mm |
| Copper layers | 4; inner1 is GND |
| Nominal thickness | 1.6 mm |
| Via hole / outer copper diameter | 0.30 / 0.45 mm |
| Via radial annular ring | 0.075 mm |
| Trace width | 0.15 mm minimum; 0.20 mm nominal |
| Mounting holes | Four 2.7 mm NPTH holes |

Select the **0.30 mm minimum via-hole option**. Do not allow the drill size to be
enlarged automatically without checking the copper ring and all clearances.
Confirm support and pricing for 0.30/0.45 mm vias in the fabrication quote.
If changing outer diameters for cost, rerun routing
and clearance checks. The chosen copper weight, stackup, mask treatment and
surface finish must be reflected in the actual manufacturing order.

Before release, inspect the generated Gerber/drill files and placement preview,
including pin-1 marks, mask openings and the manufacturer's DFM results. The
repository's checks do not replace that review.

## Reference drawings

- [Zetta ZDSD04GLGEAG manufacturer datasheet](https://www.lcsc.com/datasheet/C2875854.pdf): revision 1.3, printed pages 4 and 16, top-view pin assignment and LGA8 dimensions (`e = 1.25 BSC`).
- [XINGLIGHT XL-2121RGBC-2812B manufacturer datasheet](https://www.lcsc.com/datasheet/C5349957.pdf): printed page 11, marked corner, top-view DI/VDD/DO/GND arrangement and pin table.
- [JLCPCB rigid PCB capabilities](https://jlcpcb.com/capabilities/pcb-capabilities): via/drill and legend dimensions, checked 15 September 2026. Recheck the selected process at order time.
