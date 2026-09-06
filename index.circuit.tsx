import "tscircuit"
import { CM4024M00008001 } from "./imports/CM4024M00008001"
import { HX_TYPE_C_16P_L8_35 } from "./imports/HX_TYPE_C_16P_L8_35"
import { JK_nSMD100_16 } from "./imports/JK_nSMD100_16"
import { NCD0805R1 } from "./imports/NCD0805R1"
import { Q13FC13500004 } from "./imports/Q13FC13500004"
import { SN74AHCT1G125DCKR } from "./imports/SN74AHCT1G125DCKR"
import { SN74AHC1G08DCKR } from "./imports/SN74AHC1G08DCKR"
import { SM04B_SRSS_TB_LF__SN_ } from "./imports/SM04B_SRSS_TB_LF__SN_/SM04B_SRSS_TB_LF__SN_"
import { SM06B_SRSS_TB_LF__SN_ } from "./imports/SM06B_SRSS_TB_LF__SN_/SM06B_SRSS_TB_LF__SN_"
import { T113_S3 } from "./imports/T113_S3/T113_S3"
import { TLV62569PDDCR } from "./imports/TLV62569PDDCR"
import { TSA010A2026B } from "./imports/TSA010A2026B"
import { USBLC6_2SC6 } from "./imports/USBLC6_2SC6"
import { XRIM252012S2R2MBCA } from "./imports/XRIM252012S2R2MBCA"
import { XL_2121RGBC_2812B } from "./imports/XL_2121RGBC_2812B/XL_2121RGBC_2812B"
import { ZDSD04GLGEAG } from "./imports/ZDSD04GLGEAG"

/**
 * Derived tscircuit implementation of Protolux Electronics' Trellis Core.
 * Components are intentionally expressed as explicit JSX so the schematic,
 * PCB placement, supplier selection, and connectivity are reviewable from the
 * main circuit entrypoint.
 */
export const TrellisCore = () => (
  <board
    name="TRELLIS_CORE"
    title="Trellis Core Linux System-on-Module"
    width="50mm"
    height="50mm"
    borderRadius="3mm"
    layers={4}
    thickness="1.6mm"
    solderMaskColor="#245f2b"
    defaultTraceWidth="0.2mm"
    minViaHoleDiameter="0.2mm"
    minViaPadDiameter="0.4mm"
    pcbStyle={{ viaPadDiameter: "0.4mm", viaHoleDiameter: "0.2mm" }}
    autorouterEffortLevel="5x"
    schAutoLayoutEnabled
    schTraceAutoLabelEnabled
    schMaxTraceDistance="0.8mm"
  >
    <schematicsheet name="power" displayName="Power" sheetIndex={1} />
    <schematicsheet name="cpu-core" displayName="CPU Core" sheetIndex={2} />
    <schematicsheet name="cpu-io" displayName="Expansion, Boot and Status" sheetIndex={3} />
    <schematicsheet name="storage" displayName="Storage" sheetIndex={4} />
    <schematicsheet name="usb" displayName="USB-C" sheetIndex={5} />

    <net name="VBUS" isPowerNet />
    <net name="P3V3" isPowerNet />
    <net name="P1V8" isPowerNet />
    <net name="P1V5" isPowerNet />
    <net name="P0V9" isPowerNet />
    <net name="GND" isGroundNet />
    <net name="USB_VBUS_RAW" isPowerNet />
    {/* These names contain voltage text but represent signals, not supply rails. */}
    <net name="BUCK_3V3_EN" isPowerNet={false} />
    <net name="BUCK_3V3_SW" isPowerNet={false} />
    <net name="BUCK_3V3_FB" isPowerNet={false} />
    <net name="BUCK_0V9_SW" isPowerNet={false} />
    <net name="BUCK_0V9_FB" isPowerNet={false} />
    <net name="P3V3_PG" isPowerNet={false} />
    <net name="AUDIO_VRA1" isPowerNet={false} />
    <net name="AUDIO_VRA2" isPowerNet={false} />
    <net name="ADDR_LED_DATA_5V" isPowerNet={false} />


    <schematicsection name="power-3v3" displayName="3.3 V Buck Regulator" />
    <schematicsection name="power-0v9" displayName="0.9 V Core Buck Regulator" />
    <schematicsection name="cpu-processor" displayName="T113 Processor and Rail Decoupling" />
    <schematicsection name="cpu-clocks" displayName="24 MHz and 32.768 kHz Clocks" />
    <schematicsection name="cpu-analog" displayName="CPU Analog Support" />
    <schematicsection name="cpu-reset" displayName="CPU Reset" />
    <schematicsection name="cpu-boot" displayName="Boot Selection" />
    <schematicsection name="cpu-board-id" displayName="Board Identification" />
    <schematicsection name="cpu-expansion" displayName="SPI Display and Debug UART" />
    <schematicsection name="cpu-status" displayName="Addressable RGB Status LED" />
    <schematicsection name="storage-flash" displayName="SD NAND Flash and Pull-ups" />
    <schematicsection name="storage-clock-gate" displayName="Storage Clock Gate" />
    <schematicsection name="storage-reset" displayName="FEL Recovery" />
    <schematicsection name="usb-port" displayName="USB-C Receptacle and CC" />
    <schematicsection name="usb-protection" displayName="USB Power and Data Protection" />

    {/* Short, dedicated bypass routes. Limits include the 1.6 mm through-via.
        Via waypoints use U3 footprint coordinates (U3 is rotated 90° on the PCB). */}
    <trace
      name="DECOUPLE_C7"
      from=".U2 > .VIN"
      to=".C7 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C1"
      from=".U1 > .VIN"
      to=".C1 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C28"
      from=".U3 > .LDOB_OUT"
      to=".C28 > .pin1"
      maxLength="3mm"
      pcbPath={[{ x: 5.400040, y: -8.729906 }]}
    />
    <trace
      name="DECOUPLE_C20"
      from=".U3 > .VCC_LVDS"
      to=".C20 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C23"
      from=".U3 > .VDD_SYS0"
      to=".C23 > .pin1"
      maxLength="3mm"
      pcbPath={[{ x: 8.679906, y: -0.999998 }]}
    />
    <trace
      name="DECOUPLE_C27"
      from=".U3 > .VDD_CORE1"
      to=".C27 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: -8.579906, y: -1.800098 },
        { x: -8.729906, y: -2.050098 },
        { x: -8.729906, y: -2.050098, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: -8.729906, y: -2.050098 },
      ]}
    />
    <trace
      name="DECOUPLE_C14"
      from=".U3 > .VCC_PD"
      to=".C14 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: 5.800090, y: 8.579906 },
        { x: 5.550090, y: 8.729906 },
        { x: 5.550090, y: 8.729906, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: 5.550090, y: 8.729906 },
      ]}
    />
    <trace
      name="DECOUPLE_C34"
      from=".U3 > .HPVCC"
      to=".C34 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C17"
      from=".U3 > .VCC_RTC"
      to=".C17 > .pin1"
      maxLength="3mm"
      pcbPath={[{ x: 3.800094, y: -8.729906 }]}
    />
    <trace
      name="DECOUPLE_C31"
      from=".U3 > .VCC_DRAM0"
      to=".C31 > .pin1"
      maxLength="3mm"
      pcbPath={[{ x: 8.679906, y: -0.199898 }]}
    />
    <trace
      name="DECOUPLE_C30"
      from=".U3 > .VCC_DRAM1"
      to=".C30 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: 8.579906, y: 0.199898 },
        { x: 8.680000, y: 0.079993 },
        { x: 8.680000, y: 0.079993, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: 8.680000, y: 0.079993 },
      ]}
    />
    <trace
      name="DECOUPLE_C25"
      from=".U3 > .VDD_SYS2"
      to=".C25 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C11"
      from=".U3 > .VCC_IO"
      to=".C11 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: -0.999998, y: 8.579906 },
        { x: -0.999998, y: 8.729906 },
        { x: -0.999998, y: 8.729906, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: -0.999998, y: 8.729906 },
      ]}
    />
    <trace
      name="DECOUPLE_C24"
      from=".U3 > .VDD_SYS1"
      to=".C24 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: 8.579906, y: 0.999998 },
        { x: 8.680000, y: 1.349993 },
        { x: 8.680000, y: 1.349993, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: 8.680000, y: 1.349993 },
      ]}
    />
    <trace
      name="DECOUPLE_C15"
      from=".U3 > .VCC_TVOUT"
      to=".C15 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C19"
      from=".U3 > .VCC_TVIN"
      to=".C19 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C38"
      from=".U3 > .VRA2"
      to=".C38 > .pin1"
      maxLength="4mm"
      pcbPath={[
        { x: -3.800094, y: 8.579906 },
        { x: -4.000000, y: 8.679993 },
        { x: -4.000000, y: 8.679993, via: true, fromLayer: "top", toLayer: "bottom" },
        { x: -4.000000, y: 8.679993 },
      ]}
    />
    <trace
      name="DECOUPLE_C35"
      from=".U3 > .AVCC"
      to=".C35 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C39"
      from=".U3 > .VRA1"
      to=".C39 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C9"
      from=".U3 > .LDO_IN"
      to=".C9 > .pin1"
      maxLength="3mm"
      pcbPath={[{ x: 4.999990, y: -8.729906 }]}
    />
    <trace
      name="DECOUPLE_C13"
      from=".U3 > .VCC_PG"
      to=".C13 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C16"
      from=".U3 > .LDOA_OUT"
      to=".C16 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C18"
      from=".U3 > .VCC_PLL"
      to=".C18 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C21"
      from=".U3 > .VDD18_DRAM"
      to=".C21 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C26"
      from=".U3 > .VDD_CORE0"
      to=".C26 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C12"
      from=".U3 > .VCC_PE"
      to=".C12 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C45"
      from=".U7 > .VDD"
      to=".C45 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C41"
      from=".U5 > .VDD"
      to=".C41 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C42"
      from=".U5 > .VDD"
      to=".C42 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />
    <trace
      name="DECOUPLE_C43"
      from=".U6 > .VCC"
      to=".C43 > .pin1"
      maxLength="3mm"
      pcbStraightLine
    />

    {/* Local bypass returns connect to the inner ground plane through these vias. */}
    <via name="GND_C1" pcbX={-13.700000} pcbY={-8.375000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C1" from=".C1 > .pin2" to=".GND_C1 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C7" pcbX={8.300000} pcbY={-8.375000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C7" from=".C7 > .pin2" to=".GND_C7 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C9" pcbX={5.910000} pcbY={12.900000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C9" from=".C9 > .pin2" to=".GND_C9 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C11" pcbX={-16.539913} pcbY={6.400002}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C11" from=".C11 > .pin2" to=".GND_C11 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C12" pcbX={0.500000} pcbY={18.210000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C12" from=".C12 > .pin2" to=".GND_C12 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C13" pcbX={0.900000} pcbY={-3.410000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C13" from=".C13 > .pin2" to=".GND_C13 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C14" pcbX={-16.539913} pcbY={13.200090}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C14" from=".C14 > .pin2" to=".GND_C14 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C15" pcbX={-16.110000} pcbY={8.800000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C15" from=".C15 > .pin2" to=".GND_C15 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C16" pcbX={5.910000} pcbY={11.800000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C16" from=".C16 > .pin2" to=".GND_C16 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C17" pcbX={5.910000} pcbY={10.700000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C17" from=".C17 > .pin2" to=".GND_C17 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C18" pcbX={5.910000} pcbY={8.800000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C18" from=".C18 > .pin2" to=".GND_C18 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C19" pcbX={-7.500000} pcbY={-3.410000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C19" from=".C19 > .pin2" to=".GND_C19 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C20" pcbX={-16.110000} pcbY={13.600000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C20" from=".C20 > .pin2" to=".GND_C20 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C21" pcbX={-6.000000} pcbY={18.210000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C21" from=".C21 > .pin2" to=".GND_C21 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C23" pcbX={-3.400000} pcbY={18.210000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C23" from=".C23 > .pin2" to=".GND_C23 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C24" pcbX={-6.500000} pcbY={18.640000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C24" from=".C24 > .pin2" to=".GND_C24 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C25" pcbX={-16.110000} pcbY={7.200000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C25" from=".C25 > .pin2" to=".GND_C25 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C26" pcbX={-3.900000} pcbY={-3.410000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C26" from=".C26 > .pin2" to=".GND_C26 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C27" pcbX={-3.499909} pcbY={-3.839906}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C27" from=".C27 > .pin2" to=".GND_C27 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C28" pcbX={5.910000} pcbY={14.100000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C28" from=".C28 > .pin2" to=".GND_C28 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C30" pcbX={-5.499905} pcbY={18.639906}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C30" from=".C30 > .pin2" to=".GND_C30 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C31" pcbX={-4.700000} pcbY={18.210000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C31" from=".C31 > .pin2" to=".GND_C31 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C34" pcbX={-11.700000} pcbY={-3.510000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C34" from=".C34 > .pin2" to=".GND_C34 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C35" pcbX={-16.110000} pcbY={4.000000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C35" from=".C35 > .pin2" to=".GND_C35 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C38" pcbX={-16.539913} pcbY={3.599906}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C38" from=".C38 > .pin2" to=".GND_C38 > .bottom"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C39" pcbX={-16.110000} pcbY={2.800000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C39" from=".C39 > .pin2" to=".GND_C39 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C41" pcbX={12.950000} pcbY={13.325000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C41" from=".C41 > .pin2" to=".GND_C41 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C42" pcbX={15.395000} pcbY={14.410000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C42" from=".C42 > .pin2" to=".GND_C42 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C43" pcbX={9.090000} pcbY={16.900000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C43" from=".C43 > .pin2" to=".GND_C43 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C45" pcbX={12.010000} pcbY={2.500000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C45" from=".C45 > .pin2" to=".GND_C45 > .top"
      maxLength="1mm" pcbStraightLine />
    <via name="GND_C46" pcbX={4.650000} pcbY={2.510000}
      fromLayer="top" toLayer="bottom" outerDiameter="0.4mm" holeDiameter="0.2mm" connectsTo="net.GND" />
    <trace name="RETURN_C46" from=".C46 > .pin2" to=".GND_C46 > .top"
      maxLength="1mm" pcbStraightLine />
    <copperpour name="GND_PLANE" layer="inner1" connectsTo="net.GND" clearance="0.2mm" boardEdgeMargin="0.3mm" />

    <hole name="H1" diameter="2.7mm" pcbX={-22} pcbY={22} />
    <hole name="H2" diameter="2.7mm" pcbX={-22} pcbY={-22} />
    <hole name="H3" diameter="2.7mm" pcbX={22} pcbY={22} />
    <hole name="H4" diameter="2.7mm" pcbX={22} pcbY={-22} />

    <TLV62569PDDCR
        name="U1"
        schX={-7.84}
        schY={3.42}
        schSheetName="power"
      pcbX={-11.000007}
      pcbY={-13.2}
      pcbRotation={90}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.BUCK_3V3_EN",
        pin2: "net.GND",
        pin3: "net.BUCK_3V3_SW",
        pin4: "net.VBUS",
        pin5: "net.P3V3_PG",
        pin6: "net.BUCK_3V3_FB",
      }}
    />
    <TLV62569PDDCR
        name="U2"
        schX={-8.11}
        schY={-4.58}
        schSheetName="power"
      pcbX={10.999993}
      pcbY={-13.2}
      pcbRotation={90}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.P3V3_PG",
        pin2: "net.GND",
        pin3: "net.BUCK_0V9_SW",
        pin4: "net.VBUS",
        pin6: "net.BUCK_0V9_FB",
      }}
      noConnect={["pin5"]}
    />
    <XRIM252012S2R2MBCA
        name="L1"
        schX={-3.61}
        schY={4}
        schSheetName="power"
      pcbX={-14.500007}
      pcbY={-13.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.BUCK_3V3_SW",
        pin2: "net.P3V3",
      }}
    />
    <XRIM252012S2R2MBCA
        name="L2"
        schX={-3.89}
        schY={-4}
        schSheetName="power"
      pcbX={7.499993}
      pcbY={-13.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.BUCK_0V9_SW",
        pin2: "net.P0V9",
      }}
    />
    <NCD0805R1
        name="D1"
        schX={5.5}
        schY={4.8}
        schSheetName="power"
      color="red"
      pcbX={-6.900007}
      pcbY={-21.2}
      pcbRotation={90}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.POWER_LED_K",
        pin2: "net.P3V3",
      }}
    />
    <capacitor
        name="C7"
        schX={-12}
        schY={-4}
        schSheetName="power"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={8.3}
      pcbY={-9.9}
      pcbRotation={90}
      schRotation={0}
      schSectionName="power-0v9"
      decouplingFor=".U2 > .VIN"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C2"
        schX={0.2}
        schY={5}
        schSheetName="power"
      capacitance="10pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05C100JB5NNNC"
      supplierPartNumbers={{ jlcpcb: ["C32949"] }}
      pcbX={-8.000007}
      pcbY={-12.5}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.BUCK_3V3_FB",
      }}
    />
    <capacitor
        name="C5"
        schX={3}
        schY={-4}
        schSheetName="power"
      capacitance="22uF"
      footprint="cap0805"
      schOrientation="vertical"
      manufacturerPartNumber="CL21A226MAQNNNE"
      supplierPartNumbers={{ jlcpcb: ["C45783"] }}
      pcbX={10.999993}
      pcbY={-9.3}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C6"
        schX={5}
        schY={-4}
        schSheetName="power"
      capacitance="22uF"
      footprint="cap0805"
      schOrientation="vertical"
      manufacturerPartNumber="CL21A226MAQNNNE"
      supplierPartNumbers={{ jlcpcb: ["C45783"] }}
      pcbX={10.999993}
      pcbY={-7.1}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C4"
        schX={0.2}
        schY={-3}
        schSheetName="power"
      capacitance="10pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05C100JB5NNNC"
      supplierPartNumbers={{ jlcpcb: ["C32949"] }}
      pcbX={13.999993}
      pcbY={-13.9}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.BUCK_0V9_FB",
      }}
    />
    <capacitor
        name="C8"
        schX={9}
        schY={-1}
        schSheetName="power"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={13.999993}
      pcbY={-11.1}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.P3V3_PG",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C3"
        schX={3}
        schY={4}
        schSheetName="power"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={-11.000007}
      pcbY={-9.5}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C1"
        schX={-12}
        schY={4}
        schSheetName="power"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={-13.7}
      pcbY={-9.9}
      pcbRotation={90}
      schRotation={0}
      schSectionName="power-3v3"
      decouplingFor=".U1 > .VIN"
      maxDecouplingTraceLength="3mm"
    />
    <resistor
        name="R1"
        schX={-10.54}
        schY={5}
        schSheetName="power"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={-8.000007}
      pcbY={-11.1}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.VBUS",
        pin2: "net.BUCK_3V3_EN",
      }}
    />
    <resistor
        name="R5"
        schX={-1.5}
        schY={-3.58}
        schSheetName="power"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={13.999993}
      pcbY={-15.3}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.BUCK_0V9_FB",
      }}
    />
    <resistor
        name="R2"
        schX={-1.5}
        schY={4.42}
        schSheetName="power"
      resistance="453kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF4533TCE"
      supplierPartNumbers={{ jlcpcb: ["C27009"] }}
      pcbX={-8.000007}
      pcbY={-13.9}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.BUCK_3V3_FB",
      }}
    />
    <resistor
        name="R4"
        schX={5.5}
        schY={-1.58}
        schSheetName="power"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={-6.900007}
      pcbY={-18.400000000000002}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.POWER_LED_K",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R6"
        schX={9}
        schY={1}
        schSheetName="power"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={13.999993}
      pcbY={-12.5}
      pcbRotation={180}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.VBUS",
        pin2: "net.P3V3_PG",
      }}
    />
    <resistor
        name="R3"
        schX={-1.5}
        schY={3}
        schSheetName="power"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={-8.000007}
      pcbY={-15.3}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.BUCK_3V3_FB",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R7"
        schX={-1.5}
        schY={-5}
        schSheetName="power"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={13.999993}
      pcbY={-16.7}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.BUCK_0V9_FB",
        pin2: "net.GND",
      }}
    />
    <T113_S3
        name="U3"
        schX={0}
        schY={0}
        schSheetName="cpu-core"
      schWidth="3mm"
      schHeight="13mm"
      pcbX={-5.300007}
      pcbY={7.3999999999999995}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin7: "net.SDC0_D1",
        pin8: "net.SDC0_D0",
        pin9: "net.SDC0_CLK",
        pin10: "net.SDC0_CMD",
        pin11: "net.SDC0_D3",
        pin12: "net.SDC0_D2",
        pin13: "net.BOARD_ID_1",
        pin16: "net.BOOT_SEL1",
        pin17: "net.BOOT_SEL0",
        pin20: "net.P1V8",
        pin22: "net.DXOUT",
        pin23: "net.DXIN",
        pin24: "net.LXOUT",
        pin25: "net.LXIN",
        pin26: "net.P1V8",
        pin27: "net.RESET",
        pin28: "net.P1V8",
        pin29: "net.P3V3",
        pin30: "net.P1V5",
        pin33: "net.UART0_RX",
        pin34: "net.P3V3",
        pin35: "net.UART0_TX",
        pin42: "net.ADDR_LED_CTRL",
        pin46: "net.P0V9",
        pin47: "net.DDR_DZQ",
        pin48: "net.P1V5",
        pin49: "net.P1V5",
        pin50: "net.P1V8",
        pin51: "net.P0V9",
        pin52: "net.BOARD_ID_3",
        pin53: "net.BOARD_ID_2",
        pin65: "net.P1V8",
        pin66: "net.P3V3",
        pin67: "net.SPI1_CS0",
        pin68: "net.SPI1_CLK",
        pin69: "net.SPI1_MISO",
        pin70: "net.SPI1_MOSI",
        pin77: "net.P3V3",
        pin81: "net.P0V9",
        pin83: "net.P3V3",
        pin89: "net.P1V8",
        pin90: "net.AUDIO_VRA2",
        pin91: "net.GND",
        pin92: "net.AUDIO_VRA1",
        pin93: "net.GND",
        pin94: "net.GND",
        pin97: "net.P1V8",
        pin101: "net.BOARD_ID_ADC",
        pin107: "net.P1V8",
        pin114: "net.USB0_DN",
        pin115: "net.USB0_DP",
        pin116: "net.P0V9",
        pin117: "net.P0V9",
        pin128: "net.P3V3",
        pin129: "net.GND",
      }}
      noConnect={[
        "pin1",
        "pin2",
        "pin3",
        "pin4",
        "pin5",
        "pin6",
        "pin14",
        "pin15",
        "pin18",
        "pin19",
        "pin21",
        "pin31",
        "pin32",
        "pin36",
        "pin37",
        "pin38",
        "pin39",
        "pin40",
        "pin41",
        "pin43",
        "pin44",
        "pin45",
        "pin54",
        "pin55",
        "pin56",
        "pin57",
        "pin58",
        "pin59",
        "pin60",
        "pin61",
        "pin62",
        "pin63",
        "pin64",
        "pin71",
        "pin72",
        "pin73",
        "pin74",
        "pin75",
        "pin76",
        "pin78",
        "pin79",
        "pin80",
        "pin82",
        "pin84",
        "pin85",
        "pin86",
        "pin87",
        "pin88",
        "pin95",
        "pin96",
        "pin98",
        "pin99",
        "pin100",
        "pin102",
        "pin103",
        "pin104",
        "pin105",
        "pin106",
        "pin108",
        "pin109",
        "pin110",
        "pin111",
        "pin112",
        "pin113",
        "pin118",
        "pin119",
        "pin120",
        "pin121",
        "pin122",
        "pin123",
        "pin124",
        "pin125",
        "pin126",
        "pin127",
      ]}
    />
    <CM4024M00008001
        name="OSC1"
        schX={-9}
        schY={3}
        schSheetName="cpu-core"
      pcbX={8.697617}
      pcbY={8.60129}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-clocks"
    />
    <Q13FC13500004
        name="OSC2"
        schX={-9}
        schY={0}
        schSheetName="cpu-core"
      pcbX={9.199993}
      pcbY={12}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-clocks"
    />
    <trace name="XTAL24_DXIN" from=".OSC1 > .pin1" to="net.DXIN" schDisplayLabel="DXIN" />
    <trace name="XTAL24_GND1" from=".OSC1 > .GND1" to="net.GND" schDisplayLabel="GND" />
    <trace name="XTAL24_DXOUT" from=".OSC1 > .pin3" to="net.DXOUT" schDisplayLabel="DXOUT" />
    <trace name="XTAL24_GND2" from=".OSC1 > .GND2" to="net.GND" schDisplayLabel="GND" />
    <trace name="XTAL32_LXIN" from=".OSC2 > .pin1" to="net.LXIN" schDisplayLabel="LXIN" />
    <trace name="XTAL32_LXOUT" from=".OSC2 > .pin2" to="net.LXOUT" schDisplayLabel="LXOUT" />
    <TSA010A2026B
        name="SW1"
        displayName="RESET"
        schX={11}
        schY={-4.53}
        schSheetName="cpu-core"
      pcbX={8.999993}
      pcbY={20.8}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-reset"
      connections={{
        pin1: "net.GND",
        pin2: "net.RESET",
      }}
    />
    <capacitor
        name="C33"
        schX={-5.5}
        schY={3}
        schSheetName="cpu-core"
      capacitance="10pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05C100JB5NNNC"
      supplierPartNumbers={{ jlcpcb: ["C32949"] }}
      pcbX={11.697617000000001}
      pcbY={7.60129}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.DXOUT",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C28"
        schX={5}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="2.2uF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05A225MQ5NSNC"
      supplierPartNumbers={{ jlcpcb: ["C12530"] }}
      pcbX={4.7}
      pcbY={14.1}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .LDOB_OUT"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C10"
        schX={-10}
        schY={8}
        schSheetName="cpu-core"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={-18.900007000000002}
      pcbY={7.6}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C20"
        schX={10}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-14.9}
      pcbY={13.6}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_LVDS"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C40"
        schX={9}
        schY={-4}
        schSheetName="cpu-core"
      capacitance="2.2uF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05A225MQ5NSNC"
      supplierPartNumbers={{ jlcpcb: ["C12530"] }}
      pcbX={6.249993000000001}
      pcbY={22}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-reset"
      connections={{
        pin1: "net.RESET",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C23"
        schX={-10}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-3.4}
      pcbY={17}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD_SYS0"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C27"
        schX={-2}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-3.4999090000000006}
      pcbY={-2.6299060000000005}
      pcbRotation={90}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD_CORE1"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C14"
        schX={-2}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-15.329913}
      pcbY={13.20009}
      pcbRotation={0}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_PD"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C34"
        schX={5}
        schY={5}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-11.7}
      pcbY={-2.3}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-analog"
      decouplingFor=".U3 > .HPVCC"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C36"
        schX={-11}
        schY={-2}
        schSheetName="cpu-core"
      capacitance="18pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="0402CG180J500NT"
      supplierPartNumbers={{ jlcpcb: ["C1549"] }}
      pcbX={8.199993}
      pcbY={13.8}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.LXIN",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C17"
        schX={4}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={4.7}
      pcbY={10.7}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_RTC"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C31"
        schX={11}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-4.7}
      pcbY={17}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_DRAM0"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C30"
        schX={9}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-5.499904999999999}
      pcbY={17.429906}
      pcbRotation={270}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_DRAM1"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C25"
        schX={-6}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-14.9}
      pcbY={7.2}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD_SYS2"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C11"
        schX={-8}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-15.329913}
      pcbY={6.400002}
      pcbRotation={0}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_IO"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C24"
        schX={-8}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-6.5}
      pcbY={17.43}
      pcbRotation={270}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD_SYS1"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C37"
        schX={-7}
        schY={-2}
        schSheetName="cpu-core"
      capacitance="18pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="0402CG180J500NT"
      supplierPartNumbers={{ jlcpcb: ["C1549"] }}
      pcbX={10.199993}
      pcbY={13.8}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.LXOUT",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C22"
        schX={-12}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={-2.500007}
      pcbY={-5.8}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C15"
        schX={0}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-14.9}
      pcbY={8.8}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_TVOUT"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C19"
        schX={8}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-7.5}
      pcbY={-2.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_TVIN"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C38"
        schX={7.25}
        schY={-1}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-15.329913}
      pcbY={3.599906}
      pcbRotation={0}
      layer="bottom"
      schRotation={0}
      schSectionName="cpu-analog"
      decouplingFor=".U3 > .VRA2"
      maxDecouplingTraceLength="4mm"
    />
    <capacitor
        name="C35"
        schX={7}
        schY={5}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-14.9}
      pcbY={4}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-analog"
      decouplingFor=".U3 > .AVCC"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C39"
        schX={9}
        schY={-1}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-14.9}
      pcbY={2.8}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-analog"
      decouplingFor=".U3 > .VRA1"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C9"
        schX={-12}
        schY={8}
        schSheetName="cpu-core"
      capacitance="2.2uF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05A225MQ5NSNC"
      supplierPartNumbers={{ jlcpcb: ["C12530"] }}
      pcbX={4.7}
      pcbY={12.9}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .LDO_IN"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C13"
        schX={-4}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={0.9}
      pcbY={-2.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_PG"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C29"
        schX={7}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={-5.800007}
      pcbY={20.6}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V5",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C16"
        schX={2}
        schY={8}
        schSheetName="cpu-core"
      capacitance="2.2uF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05A225MQ5NSNC"
      supplierPartNumbers={{ jlcpcb: ["C12530"] }}
      pcbX={4.7}
      pcbY={11.8}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .LDOA_OUT"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C18"
        schX={6}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={4.7}
      pcbY={8.8}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_PLL"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C32"
        schX={-12.5}
        schY={3}
        schSheetName="cpu-core"
      capacitance="10pF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05C100JB5NNNC"
      supplierPartNumbers={{ jlcpcb: ["C32949"] }}
      pcbX={11.697617000000001}
      pcbY={9.50129}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.DXIN",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C21"
        schX={12}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-6}
      pcbY={17}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD18_DRAM"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C26"
        schX={-4}
        schY={-8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={-3.9}
      pcbY={-2.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VDD_CORE0"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
      name="C12"
        schX={-6}
        schY={8}
        schSheetName="cpu-core"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={0.5}
      pcbY={17}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      decouplingFor=".U3 > .VCC_PE"
      maxDecouplingTraceLength="3mm"
    />
    <resistor
        name="R11"
        schX={7}
        schY={-4}
        schSheetName="cpu-core"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={6.249993000000001}
      pcbY={19.900000000000002}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-reset"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.RESET",
      }}
    />
    <resistor
        name="R10"
        schX={6.75}
        schY={1}
        schSheetName="cpu-core"
      resistance="240ohm"
      footprint="res0603"
      manufacturerPartNumber="0603WAF2400T5E"
      supplierPartNumbers={{ jlcpcb: ["C23350"] }}
      pcbX={-3.050007}
      pcbY={19.9}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.DDR_DZQ",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R9"
        schX={10}
        schY={3}
        schSheetName="cpu-core"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={-8.800006999999999}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.BOARD_ID_ADC",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R8"
        schX={7}
        schY={3}
        schSheetName="cpu-core"
      resistance="100kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={-10.700007000000001}
      pcbY={-4}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.BOARD_ID_ADC",
      }}
    />
    <resistor
        name="R25"
        schX={4}
        schY={-3}
        schSheetName="cpu-io"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={21.509993}
      pcbY={-10}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-board-id"
      connections={{
        pin1: "net.BOARD_ID_3",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R12"
        schX={-3}
        schY={3}
        schSheetName="cpu-io"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={21.499993}
      pcbY={-6.7}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-boot"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.BOOT_SEL1",
      }}
    />
    <resistor
        name="R13"
        schX={3}
        schY={3}
        schSheetName="cpu-io"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={21.499993}
      pcbY={-7.799999999999999}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-boot"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.BOOT_SEL0",
      }}
    />
    <resistor
        name="R24"
        schX={0}
        schY={-3}
        schSheetName="cpu-io"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={21.509993}
      pcbY={-11.5}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-board-id"
      connections={{
        pin1: "net.BOARD_ID_2",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R14"
        schX={-4}
        schY={-3}
        schSheetName="cpu-io"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={21.509993}
      pcbY={-8.9}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-board-id"
      connections={{
        pin1: "net.BOARD_ID_1",
        pin2: "net.GND",
      }}
    />
    <SM06B_SRSS_TB_LF__SN_
      name="J2"
      displayName="SPI1 DISPLAY"
      schX={-8}
      schY={4}
      schSheetName="cpu-io"
      schSectionName="cpu-expansion"
      pcbX={-21.8}
      pcbY={-9}
      pcbRotation={270}
      schRotation={0}
      schPinArrangement={{
        leftSide: { pins: ["pin1", "pin2"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin3", "pin4", "pin5", "pin6"], direction: "top-to-bottom" },
      }}
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
        pin3: "net.SPI1_CLK",
        pin4: "net.SPI1_MOSI",
        pin5: "net.SPI1_MISO",
        pin6: "net.SPI1_CS0",
      }}
    />
    <SM04B_SRSS_TB_LF__SN_
      name="J3"
      displayName="UART0 DEBUG"
      schX={-8}
      schY={-2}
      schSheetName="cpu-io"
      schSectionName="cpu-expansion"
      pcbX={-21.8}
      pcbY={0}
      pcbRotation={270}
      schRotation={0}
      schPinArrangement={{
        leftSide: { pins: ["pin1", "pin2"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin3", "pin4"], direction: "top-to-bottom" },
      }}
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
        pin3: "net.UART0_TX",
        pin4: "net.UART0_RX",
      }}
    />
    <SN74AHCT1G125DCKR
      name="U8"
      displayName="LED 3V3 TO 5V"
      pcbX={5.3} pcbY={-2} pcbRotation={0}
      schX={-3} schY={-8} schHeight="0.6mm"
      schSheetName="cpu-io" schSectionName="cpu-status"
      connections={{
        pin1: "net.GND",
        pin2: "net.ADDR_LED_CTRL",
        pin3: "net.GND",
        pin4: "net.ADDR_LED_DATA_5V",
        pin5: "net.VBUS",
      }}
    />
    <resistor
      name="R27" resistance="100kohm" footprint="res0402"
      manufacturerPartNumber="0402WGF1003TCE"
      supplierPartNumbers={{ jlcpcb: ["C25741"] }}
      pcbX={2} pcbY={-3} pcbRotation={90}
      schX={-7} schY={-8} schOrientation="vertical"
      schSheetName="cpu-io" schSectionName="cpu-status"
      connections={{ pin1: "net.ADDR_LED_CTRL", pin2: "net.GND" }}
    />
    <capacitor
      name="C46" capacitance="100nF" footprint="cap0402"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={4.65} pcbY={1.3} pcbRotation={90}
      schX={-3} schY={-5.5} schOrientation="vertical"
      schSheetName="cpu-io" schSectionName="cpu-status"
      decouplingFor=".U8 > .VCC" maxDecouplingTraceLength="3mm"
    />
    <trace name="DECOUPLE_C46" from=".U8 > .VCC" to=".C46 > .pin1"
      maxLength="3mm" pcbStraightLine />
    <resistor
      name="R26"
      resistance="33ohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF330JTCE"
      supplierPartNumbers={{ jlcpcb: ["C25105"] }}
      schX={3.2}
      schY={-8}
      schSheetName="cpu-io"
      schSectionName="cpu-status"
      pcbX={7.65}
      pcbY={-0.15}
      pcbRotation={0}
      schRotation={0}
      connections={{
        pin1: "net.ADDR_LED_DATA_5V",
        pin2: "net.ADDR_LED_DIN",
      }}
    />
    <XL_2121RGBC_2812B
      name="U7"
      displayName="ADDRESSABLE RGB"
      schX={8.5}
      schY={-8.68}
      schSheetName="cpu-io"
      schSectionName="cpu-status"
      pcbX={8}
      pcbY={2}
      pcbRotation={0}
      schRotation={0}
      connections={{
        pin1: "net.ADDR_LED_DIN",
        pin2: "net.VBUS",
        pin4: "net.GND",
      }}
      noConnect={["pin3"]}
    />
    <capacitor
      name="C45"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      schX={12}
      schY={-8}
      schSheetName="cpu-io"
      schSectionName="cpu-status"
      pcbX={10.8}
      pcbY={2.5}
      pcbRotation={0}
      schRotation={0}
      decouplingFor=".U7 > .VDD"
      maxDecouplingTraceLength="3mm"
    />
    <ZDSD04GLGEAG
        name="U5"
        schX={6}
        schY={0}
        schSheetName="storage"
      pcbX={17.299993}
      pcbY={7.4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.SDC0_D2",
        pin2: "net.SDC0_D3",
        pin3: "net.SD_FLASH_CLK",
        pin4: "net.GND",
        pin5: "net.SDC0_CMD",
        pin6: "net.SDC0_D0",
        pin7: "net.SDC0_D1",
        pin8: "net.P3V3",
      }}
    />
    <SN74AHC1G08DCKR
        name="U6"
        schX={-8.5}
        schY={1}
        schSheetName="storage"
      schHeight="0.6mm"
      pcbX={13}
      pcbY={15.8}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-clock-gate"
      connections={{
        pin1: "net.SDC0_CLK",
        pin2: "net.SD_FLASH_CLK_GATE_EN",
        pin3: "net.GND",
        pin4: "net.SD_FLASH_CLK_GATED",
        pin5: "net.P3V3",
      }}
    />
    <TSA010A2026B
        name="SW2"
        displayName="FEL / SD FLASH DISABLE"
        schX={-1.5}
        schY={-3.87}
        schSheetName="storage"
      pcbX={14.699993}
      pcbY={20.8}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-reset"
      connections={{
        pin1: "net.GND",
        pin2: "net.SD_FLASH_CLK_GATE_EN",
      }}
    />
    <capacitor
        name="C41"
        schX={12}
        schY={4}
        schSheetName="storage"
      capacitance="10uF"
      footprint="cap0603"
      schOrientation="vertical"
      manufacturerPartNumber="CL10A106MA8NRNC"
      supplierPartNumbers={{ jlcpcb: ["C96446"] }}
      pcbX={12.95}
      pcbY={11.8}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-flash"
      decouplingFor=".U5 > .VDD"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C44"
        schX={2}
        schY={-4.5}
        schSheetName="storage"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={11.949993000000001}
      pcbY={22.3}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-reset"
      connections={{
        pin1: "net.SD_FLASH_CLK_GATE_EN",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C42"
        schX={10}
        schY={4}
        schSheetName="storage"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={15.395}
      pcbY={13.2}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-flash"
      decouplingFor=".U5 > .VDD"
      maxDecouplingTraceLength="3mm"
    />
    <capacitor
        name="C43"
        schX={8}
        schY={4}
        schSheetName="storage"
      capacitance="100nF"
      footprint="cap0402"
      schOrientation="vertical"
      manufacturerPartNumber="CL05B104KB54PNC"
      supplierPartNumbers={{ jlcpcb: ["C307331"] }}
      pcbX={10.3}
      pcbY={16.9}
      pcbRotation={180}
      schRotation={0}
      schSectionName="storage-flash"
      decouplingFor=".U6 > .VCC"
      maxDecouplingTraceLength="3mm"
    />
    <resistor
        name="R23"
        schX={-3.5}
        schY={1}
        schSheetName="storage"
      resistance="22ohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF220JTCE"
      supplierPartNumbers={{ jlcpcb: ["C25092"] }}
      pcbX={17.099992999999998}
      pcbY={13.2875}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-clock-gate"
      connections={{
        pin1: "net.SD_FLASH_CLK_GATED",
        pin2: "net.SD_FLASH_CLK",
      }}
    />
    <resistor
        name="R17"
        schX={-6}
        schY={4}
        schSheetName="storage"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={18.499993}
      pcbY={0.8875}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_D1",
      }}
    />
    <resistor
        name="R18"
        schX={-3}
        schY={4}
        schSheetName="storage"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={16.599992999999998}
      pcbY={0.8875}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_D0",
      }}
    />
    <resistor
        name="R20"
        schX={3}
        schY={4}
        schSheetName="storage"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={18.999993}
      pcbY={13.2875}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_D3",
      }}
    />
    <resistor
        name="R22"
        schX={-7}
        schY={-4.5}
        schSheetName="storage"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={11.949993000000001}
      pcbY={19.6}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-reset"
      connections={{
        pin1: "net.SD_FLASH_CLK_GATE_EN",
        pin2: "net.P3V3",
      }}
    />
    <resistor
        name="R19"
        schX={0}
        schY={4}
        schSheetName="storage"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={14.699993000000001}
      pcbY={0.8875}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_CMD",
      }}
    />
    <resistor
        name="R21"
        schX={6}
        schY={4}
        schSheetName="storage"
      resistance="51kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5102TCE"
      supplierPartNumbers={{ jlcpcb: ["C25794"] }}
      pcbX={20.899993}
      pcbY={13.2875}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-flash"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_D2",
      }}
    />
    <HX_TYPE_C_16P_L8_35
        name="J1"
        schX={-9}
        schY={0}
        schWidth="3.2mm"
        schHeight="2.15mm"
        schPinArrangement={{
          leftSide: [
            "SHELL1",
            "SHELL2",
            "SHELL3",
            "SHELL4",
            "GND1",
            "GND2",
            "VBUS1",
            "VBUS2",
          ],
          rightSide: [
            "CC2",
            "SBU1",
            "DP2",
            "DM1",
            "DP1",
            "DM2",
            "CC1",
            "SBU2",
          ],
        }}
        schSheetName="usb"
      pcbX={-0.000007000000000090267}
      pcbY={-20.9}
      pcbRotation={0}
      schRotation={0}
      schSectionName="usb-port"
      connections={{
        pin1: "net.GND",
        pin2: "net.GND",
        pin3: "net.GND",
        pin4: "net.GND",
        pin5: "net.GND",
        pin6: "net.USB_VBUS_RAW",
        pin7: "net.GND",
        pin8: "net.USB_VBUS_RAW",
        pin9: "net.USB0_CC2",
        pin11: "net.USB0_CONN_DP",
        pin12: "net.USB0_CONN_DM",
        pin13: "net.USB0_CONN_DP",
        pin14: "net.USB0_CONN_DM",
        pin15: "net.USB0_CC1",
      }}
      noConnect={["pin10", "pin16"]}
    />
    <USBLC6_2SC6
        name="U4"
        schX={0}
        schY={0}
        schSheetName="usb"
      pcbX={0.599993}
      pcbY={-13.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="usb-protection"
      connections={{
        pin1: "net.USB0_CONN_DM",
        pin2: "net.GND",
        pin3: "net.USB0_CONN_DP",
        pin4: "net.USB0_DP",
        pin5: "net.USB_VBUS_RAW",
        pin6: "net.USB0_DN",
      }}
    />
    <JK_nSMD100_16
        name="F1"
        schX={6}
        schY={3}
        schSheetName="usb"
      pcbX={-3.4500069999999994}
      pcbY={-13.2}
      pcbRotation={270}
      schRotation={0}
      schSectionName="usb-protection"
      connections={{
        pin1: "net.USB_VBUS_RAW",
        pin2: "net.VBUS",
      }}
    />

    <resistor
        name="R15"
        schX={-4}
        schY={3}
        schSheetName="usb"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={3.099993}
      pcbY={-12.1}
      pcbRotation={270}
      schRotation={0}
      schSectionName="usb-port"
      connections={{
        pin1: "net.USB0_CC1",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R16"
        schX={-2}
        schY={3}
        schSheetName="usb"
      resistance="5.1kohm"
      footprint="res0402"
      manufacturerPartNumber="0402WGF5101TCE"
      supplierPartNumbers={{ jlcpcb: ["C25905"] }}
      pcbX={4.999993}
      pcbY={-12.1}
      pcbRotation={270}
      schRotation={0}
      schSectionName="usb-port"
      connections={{
        pin1: "net.USB0_CC2",
        pin2: "net.GND",
      }}
    />
  </board>
)

export default TrellisCore
