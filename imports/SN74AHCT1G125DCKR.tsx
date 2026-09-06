import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_OE"],
  pin2: ["A"],
  pin3: ["GND"],
  pin4: ["Y"],
  pin5: ["VCC"]
} as const

const pinAttributes = {
  pin3: {requiresGround: true},
  pin5: {requiresPower: true}
} as const

export const SN74AHCT1G125DCKR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C350557"
  ]
}}
      manufacturerPartNumber="SN74AHCT1G125DCKR"
      footprint="dfn6_missing(5)_p0.65mm_w3.05mm_pw0.35mm_pl0.85mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C350557.obj?uuid=4e343cd4ee3f40efaa150725a58cf9ea",
        stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C350557.step?uuid=4e343cd4ee3f40efaa150725a58cf9ea",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.00005079999993995443, y: -0.000025399999913133797, z: -0.5 },
      }}
      {...props}
    />
  )
}