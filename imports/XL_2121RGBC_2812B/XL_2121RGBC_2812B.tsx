import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["DIN"],
  pin2: ["VDD"],
  pin3: ["DO"],
  pin4: ["GND"]
} as const

const pinAttributes = {
  pin2: {requiresPower: true},
  pin4: {requiresGround: true}
} as const

export const XL_2121RGBC_2812B = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C5349957"
  ]
}}
      manufacturerPartNumber="XL-2121RGBC-2812B"
      footprint={<footprint>
        <smtpad portHints={["pin4"]} pcbX="-0.86995mm" pcbY="-0.499999mm" width="0.850011mm" height="0.5999988mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-0.86995mm" pcbY="0.499999mm" width="0.850011mm" height="0.5999988mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="0.86995mm" pcbY="0.499999mm" width="0.850011mm" height="0.5999988mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="0.86995mm" pcbY="-0.499999mm" width="0.850011mm" height="0.5999988mm" shape="rect" />
<silkscreenpath route={[{"x":1.0500105999999505,"y":-1.0311891999999716},{"x":1.0500105999999505,"y":-1.0500359999999773}]} />
<silkscreenpath route={[{"x":-1.0499597999998969,"y":1.0310622000000649},{"x":-1.0499597999998969,"y":1.0499344000000974},{"x":1.0500105999999505,"y":1.0499344000000974},{"x":1.0500105999999505,"y":1.0310622000000649}]} />
<silkscreenpath route={[{"x":1.0500105999999505,"y":-1.0500359999999773},{"x":-1.0499597999998969,"y":-1.0500359999999773},{"x":-1.0499597999998969,"y":-1.0311891999999716}]} />
<silkscreentext text="{NAME}" pcbX="0.1524mm" pcbY="2.0414mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-1.5453999999999724,"y":1.291400000000067},{"x":1.8502000000000862,"y":1.291400000000067},{"x":1.8502000000000862,"y":-1.3675999999999249},{"x":-1.5453999999999724,"y":-1.3675999999999249},{"x":-1.5453999999999724,"y":1.291400000000067}]} />
      </footprint>}
      
      {...props}
    />
  )
}