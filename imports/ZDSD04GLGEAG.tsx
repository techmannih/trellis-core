import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["DAT2"],
  pin2: ["DAT3"],
  pin3: ["CLK"],
  pin4: ["GND"],
  pin5: ["CMD"],
  pin6: ["DAT0"],
  pin7: ["DAT1"],
  pin8: ["VDD"]
} as const

export const ZDSD04GLGEAG = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={{
        pin8: { requiresPower: true },
        pin4: { requiresGround: true },
      }}
      supplierPartNumbers={{
  "jlcpcb": [
    "C2875854"
  ]
}}
      manufacturerPartNumber="ZDSD04GLGEAG"
      footprint={<footprint>
        {/* Zetta package pitch is 1.25 mm; retain the validated 1.27 mm
            solder-land spacing. The outer terminal offset is only 0.03 mm,
            leaving >0.157 mm nominal side margin with b(max)=0.425 mm.
            See docs/assembly.md. Pin 1 / DAT2 is top-left in this view. */}
        <smtpad portHints={["pin1"]} pcbX="-3.700018mm" pcbY="1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-3.700018mm" pcbY="0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-3.700018mm" pcbY="-0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-3.700018mm" pcbY="-1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="3.700018mm" pcbY="1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="3.700018mm" pcbY="0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="3.700018mm" pcbY="-0.635mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="3.700018mm" pcbY="-1.905mm" width="1.6999966mm" height="0.7999984mm" shape="rect" />
{/* Leave the pad rows open; short imported silk stubs were below print limits. */}
<silkscreenpath strokeWidth="0.15mm" route={[
  { x: -4, y: 2.55 }, { x: -4, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 2.55 },
]} />
<silkscreenpath strokeWidth="0.15mm" route={[
  { x: -4, y: -2.55 }, { x: -4, y: -3 }, { x: 4, y: -3 }, { x: 4, y: -2.55 },
]} />
        <silkscreencircle pcbX="-4.8mm" pcbY="2.8mm"
          radius="0.2mm" strokeWidth="0.18mm" />
        <fabricationnotetext text="1 DAT2" pcbX="-1.8mm" pcbY="1.875mm"
          fontSize="0.6mm" />
        <fabricationnotepath route={[{ x: -2.9, y: 1.875 }, { x: -3.7, y: 1.875 }]}
          strokeWidth="0.15mm" />
<silkscreentext text="{NAME}" pcbX="-0.189738mm" pcbY="4.02514mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-5.1895379999999705,"y":3.275139999999965},{"x":4.810061999999903,"y":3.275139999999965},{"x":4.810061999999903,"y":-3.2700600000000577},{"x":-5.1895379999999705,"y":-3.2700600000000577},{"x":-5.1895379999999705,"y":3.275139999999965}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2875854.obj?uuid=35d565001239477681fdfc17de9b684b",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2875854.step?uuid=35d565001239477681fdfc17de9b684b",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: -0.00005079999993995443, y: -0.004949199999946252, z: -0.02 },
      }}
      {...props}
    />
  )
}
