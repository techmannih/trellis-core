import "tscircuit"
import { CM4024M00008001 } from "./imports/CM4024M00008001"
import { HX_TYPE_C_16P_L8_35 } from "./imports/HX_TYPE_C_16P_L8_35"
import { JK_nSMD100_16 } from "./imports/JK_nSMD100_16"
import { NCD0805R1 } from "./imports/NCD0805R1"
import { Q13FC13500004 } from "./imports/Q13FC13500004"
import { SN74AHC1G08DCKR } from "./imports/SN74AHC1G08DCKR"
import { T113_S3 } from "./imports/T113_S3/T113_S3"
import { TLV62569PDDCR } from "./imports/TLV62569PDDCR"
import { TSA010A2026B } from "./imports/TSA010A2026B"
import { USBLC6_2SC6 } from "./imports/USBLC6_2SC6"
import { XRIM252012S2R2MBCA } from "./imports/XRIM252012S2R2MBCA"
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
    autorouterEffortLevel="5x"
    routingDisabled
    schAutoLayoutEnabled
    schTraceAutoLabelEnabled
    schMaxTraceDistance="0.8mm"
  >
    <schematicsheet name="power" displayName="Power" sheetIndex={1} />
    <schematicsheet name="cpu-core" displayName="CPU Core" sheetIndex={2} />
    <schematicsheet name="cpu-io" displayName="CPU I/O" sheetIndex={3} />
    <schematicsheet name="storage" displayName="Storage" sheetIndex={4} />
    <schematicsheet name="usb" displayName="USB-C" sheetIndex={5} />

    <schematicsection name="power-3v3" displayName="3.3 V Buck Regulator" />
    <schematicsection name="power-0v9" displayName="0.9 V Core Buck Regulator" />
    <schematicsection name="cpu-processor" displayName="T113 Processor and Rail Decoupling" />
    <schematicsection name="cpu-clocks" displayName="24 MHz and 32.768 kHz Clocks" />
    <schematicsection name="cpu-analog" displayName="CPU Analog Support" />
    <schematicsection name="cpu-reset" displayName="CPU Reset" />
    <schematicsection name="cpu-boot" displayName="Boot Selection" />
    <schematicsection name="cpu-board-id" displayName="Board Identification" />
    <schematicsection name="storage-emmc" displayName="Managed Flash and Pull-ups" />
    <schematicsection name="storage-clock-gate" displayName="Storage Clock Gate" />
    <schematicsection name="storage-reset" displayName="Storage Reset" />
    <schematicsection name="usb-port" displayName="USB-C Receptacle and CC" />
    <schematicsection name="usb-protection" displayName="USB Power and Data Protection" />

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
        pin1: "net.Net_U1_EN",
        pin2: "net.GND",
        pin3: "net.Net_U1_SW",
        pin4: "net.VBUS",
        pin5: "net.P3V3_PG",
        pin6: "net.Net_U1_FB",
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
        pin3: "net.Net_U2_SW",
        pin4: "net.VBUS",
        pin6: "net.Net_U2_FB",
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
        pin1: "net.Net_U1_SW",
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
        pin1: "net.Net_U2_SW",
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
        pin1: "net.Net_D1_K",
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
      pcbX={11.199993}
      pcbY={-16.9}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-0v9"
      connections={{
        pin1: "net.VBUS",
        pin2: "net.GND",
      }}
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
        pin2: "net.Net_U1_FB",
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
        pin2: "net.Net_U2_FB",
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
      pcbX={-11.003427}
      pcbY={-16.900041}
      pcbRotation={0}
      schRotation={0}
      schSectionName="power-3v3"
      connections={{
        pin1: "net.VBUS",
        pin2: "net.GND",
      }}
    />
    <resistor
        name="R1"
        schX={-10.54}
        schY={4}
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
        pin2: "net.Net_U1_EN",
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
        pin2: "net.Net_U2_FB",
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
        pin2: "net.Net_U1_FB",
      }}
    />
    <resistor
        name="R4"
        schX={5.5}
        schY={3.2}
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
        pin1: "net.Net_D1_K",
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
        pin1: "net.Net_U1_FB",
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
        pin1: "net.Net_U2_FB",
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
        pin34: "net.P3V3",
        pin46: "net.P0V9",
        pin47: "net.Net_U3B_DZQ",
        pin48: "net.P1V5",
        pin49: "net.P1V5",
        pin50: "net.P1V8",
        pin51: "net.P0V9",
        pin52: "net.BOARD_ID_3",
        pin53: "net.BOARD_ID_2",
        pin65: "net.P1V8",
        pin66: "net.P3V3",
        pin77: "net.P3V3",
        pin81: "net.P0V9",
        pin83: "net.P3V3",
        pin89: "net.P1V8",
        pin90: "net.Net_U3F_VRA2",
        pin91: "net.GND",
        pin92: "net.Net_U3F_VRA1",
        pin93: "net.GND",
        pin94: "net.GND",
        pin97: "net.P1V8",
        pin101: "net.Net_U3F_GPADC0",
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
        "pin33",
        "pin35",
        "pin36",
        "pin37",
        "pin38",
        "pin39",
        "pin40",
        "pin41",
        "pin42",
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
        "pin67",
        "pin68",
        "pin69",
        "pin70",
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
        name="Y1"
        schX={-9}
        schY={2.32}
        schSheetName="cpu-core"
      pcbX={8.697617}
      pcbY={8.60129}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.DXIN",
        GND1: "net.GND",
        pin3: "net.DXOUT",
        GND2: "net.GND",
      }}
    />
    <Q13FC13500004
        name="Y2"
        schX={-9}
        schY={0}
        schSheetName="cpu-core"
      pcbX={9.199993}
      pcbY={12}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-clocks"
      connections={{
        pin1: "net.LXIN",
        pin2: "net.LXOUT",
      }}
    />
    <TSA010A2026B
        name="SW1"
        schX={11}
        schY={-4}
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
        schX={-7}
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
      pcbX={6.099993}
      pcbY={14.9}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V5",
        pin2: "net.GND",
      }}
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
      pcbX={-16.700007}
      pcbY={14.4}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={-0.6000070000000002}
      pcbY={17.5}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
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
      pcbX={-3.900007}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
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
      pcbX={-16.700007}
      pcbY={13.2}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={-12.600007}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={6.099993}
      pcbY={11.6}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={-4.000007}
      pcbY={17.400000000000002}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V5",
        pin2: "net.GND",
      }}
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
      pcbX={-5.200007}
      pcbY={18.8}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V5",
        pin2: "net.GND",
      }}
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
      pcbX={-16.400007}
      pcbY={7.6}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
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
      pcbX={-16.400007}
      pcbY={6.4}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={-9.000007}
      pcbY={18.8}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
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
      pcbX={-16.700007}
      pcbY={8.8}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={-6.9000070000000004}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={-16.800007}
      pcbY={2.9}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.Net_U3F_VRA2",
        pin2: "net.GND",
      }}
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
      pcbX={-16.800007}
      pcbY={4}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={-16.800007}
      pcbY={1.7}
      pcbRotation={180}
      schRotation={0}
      schSectionName="cpu-analog"
      connections={{
        pin1: "net.Net_U3F_VRA1",
        pin2: "net.GND",
      }}
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
      pcbX={6.099993}
      pcbY={13.8}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={0.899993}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={6.099993}
      pcbY={12.7}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={5.699993}
      pcbY={8.45}
      pcbRotation={0}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
    />
    <capacitor
        name="C32"
        schX={-11}
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
      pcbX={-7.100007}
      pcbY={18.8}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P1V8",
        pin2: "net.GND",
      }}
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
      pcbX={-2.000007}
      pcbY={-4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P0V9",
        pin2: "net.GND",
      }}
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
      pcbX={0.499993}
      pcbY={18.8}
      pcbRotation={270}
      schRotation={0}
      schSectionName="cpu-processor"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
        pin1: "net.Net_U3B_DZQ",
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
        pin1: "net.Net_U3F_GPADC0",
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
        pin2: "net.Net_U3F_GPADC0",
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
    <ZDSD04GLGEAG
        name="U5"
        schX={6}
        schY={0}
        schSheetName="storage"
      pcbX={17.299993}
      pcbY={7.4}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-emmc"
      connections={{
        pin1: "net.SDC0_D2",
        pin2: "net.SDC0_D3",
        pin3: "net.Net_U5_CLK",
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
      pcbX={14.699993}
      pcbY={14.587500000000002}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-clock-gate"
      connections={{
        pin1: "net.SDC0_CLK",
        pin2: "net.Net_C44_Pad1",
        pin3: "net.GND",
        pin4: "net.Net_R23_Pad1",
        pin5: "net.P3V3",
      }}
    />
    <TSA010A2026B
        name="SW2"
        schX={-1.5}
        schY={-4.5}
        schSheetName="storage"
      pcbX={14.699993}
      pcbY={20.8}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-reset"
      connections={{
        pin1: "net.GND",
        pin2: "net.Net_C44_Pad1",
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
      pcbX={22.099993}
      pcbY={4.5875}
      pcbRotation={270}
      schRotation={0}
      schSectionName="storage-emmc"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
        pin1: "net.Net_C44_Pad1",
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
      pcbX={20.399993}
      pcbY={0.8875}
      pcbRotation={90}
      schRotation={0}
      schSectionName="storage-emmc"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
      pcbX={14.399993}
      pcbY={17}
      pcbRotation={0}
      schRotation={0}
      schSectionName="storage-emmc"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.GND",
      }}
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
        pin1: "net.Net_R23_Pad1",
        pin2: "net.Net_U5_CLK",
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
      schSectionName="storage-emmc"
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
      schSectionName="storage-emmc"
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
      schSectionName="storage-emmc"
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
        pin1: "net.Net_C44_Pad1",
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
      schSectionName="storage-emmc"
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
      schSectionName="storage-emmc"
      connections={{
        pin1: "net.P3V3",
        pin2: "net.SDC0_D2",
      }}
    />
    <HX_TYPE_C_16P_L8_35
        name="J1"
        schX={-9}
        schY={0}
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
        pin6: "net.Net_U4_VBUS",
        pin7: "net.GND",
        pin8: "net.Net_U4_VBUS",
        pin9: "net.USB0_CC2",
        pin11: "net.Net_J1_DP_PadA6",
        pin12: "net.Net_J1_D_PadA7",
        pin13: "net.Net_J1_DP_PadA6",
        pin14: "net.Net_J1_D_PadA7",
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
        pin1: "net.Net_J1_D_PadA7",
        pin2: "net.GND",
        pin3: "net.Net_J1_DP_PadA6",
        pin4: "net.USB0_DP",
        pin5: "net.Net_U4_VBUS",
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
        pin1: "net.Net_U4_VBUS",
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
