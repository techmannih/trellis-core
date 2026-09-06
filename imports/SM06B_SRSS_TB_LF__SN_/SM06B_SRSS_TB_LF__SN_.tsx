import objPath from "./SM06B_SRSS_TB_LF__SN_.obj"
import stepPath from "./SM06B_SRSS_TB_LF__SN_.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin6: ["pin6"]
} as const

export const SM06B_SRSS_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <connector
      standard="jst_sh"
      pinCount={6}
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C160405"
  ]
}}
      manufacturerPartNumber="SM06B-SRSS-TB(LF)(SN)"
      footprint={<footprint insertionDirection="from_bottom">
        <smtpad portHints={["pin1"]} pcbX="-2.499995mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-1.499743mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.499745mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="0.500253mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="1.500251mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="2.500249mm" pcbY="2.0500086mm" width="0.5999988mm" height="1.5500096mm" shape="rect" />
<smtpad pcbX="3.799967mm" pcbY="-1.8250154mm" width="1.499997mm" height="1.999996mm" shape="rect" />
<smtpad pcbX="-3.799967mm" pcbY="-1.8250154mm" width="1.499997mm" height="1.999996mm" shape="rect" />
<silkscreenpath route={[{"x":-3.9998904000000266,"y":1.725015600000006},{"x":-3.0310073999999076,"y":1.725015600000006}]} />
<silkscreenpath route={[{"x":3.0312613999999485,"y":1.725015600000006},{"x":4.000068199999987,"y":1.725015600000006}]} />
<silkscreenpath route={[{"x":4.000068199999987,"y":1.725015600000006},{"x":4.000068199999987,"y":-0.5938519999999698}]} />
<silkscreenpath route={[{"x":-3.9998904000000266,"y":1.725015600000006},{"x":-3.9998904000000266,"y":-0.5938519999999698}]} />
<silkscreenpath route={[{"x":-2.818714200000045,"y":-2.524963200000002},{"x":2.8188920000000053,"y":-2.524963200000002}]} />
<silkscreentext text="{NAME}" pcbX="0.002921mm" pcbY="4.1676086mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-4.793678999999997,"y":3.417608599999994},{"x":4.799521000000141,"y":3.417608599999994},{"x":4.799521000000141,"y":-3.0767913999999337},{"x":-4.793678999999997,"y":-3.0767913999999337},{"x":-4.793678999999997,"y":3.417608599999994}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 2.4999238000000332, y: 0.3445008999999346, z: -0.01 },
      }}
      {...props}
    />
  )
}
