# First-board power and firmware test

Status: **not yet tested on physical hardware**. This procedure makes the open
checks reproducible; it is not a record of a successful boot.

## Power-input contract

J1 accepts **5 V**. Its CC1 and CC2 each have a 5.1 kohm pull-down. The board has
no USB-PD controller or CC current-advertisement detector. It therefore does not
negotiate a higher voltage or determine whether a Type-C source advertises
1.5 A/3 A. Do not assume either current is available from every USB port.

For bench evaluation, use a known regulated 5 V source with at least 1 A capacity
and adjustable current limiting, through a suitable USB power fixture. Source
capacity is test headroom, not measured board demand or permission to exceed a
USB port's advertised allowance. F1 is a resettable fuse, not a USB current
negotiator or precise current limiter. Record startup peaks as well as steady
current, including any load on J2/J3.

For FEL/data tests, choose a host/hub or powered test fixture that supports both
USB data and the measured demand. If using separate bench power while connected
to a host, use a fixture that isolates the host's VBUS; do not directly parallel
two 5 V sources. When J1 powers the board, leave the UART adapter's power pin
disconnected and connect only GND/TX/RX at 3.3 V logic levels.

If measured demand exceeds the applicable default USB allowance, resolve the
power architecture before qualifying general USB operation: reduce demand or
add appropriate source-current detection/current control. Add PD negotiation if
the intended product requires a PD contract. An arbitrary larger supply does not
close this compatibility check.

## Test order

1. **Unpowered inspection:** compare D1/U5/U7 marks against [assembly.md](assembly.md),
   inspect solder joints and check for sustained low-resistance shorts between
   VBUS/power rails and GND. Allow capacitors to charge during resistance checks.
2. **Initial power:** with RESET held, apply 5.0 V with a conservative initial
   current limit (for example 100 mA for a short-check stage). Record whether the
   supply limits. This low-limit stage is not a boot test; investigate a sustained
   limit before increasing it. Stop and inspect if a component heats unexpectedly.
3. **Rail checks:** measure protected VBUS and nominal 3.3 V, 0.9 V, 1.8 V and
   1.5 V at accessible capacitor pads. Record results; compare measured limits to
   the regulator/processor datasheets. Use a scope to confirm that 3.3 V precedes
   the 0.9 V rail and to inspect startup/reset behavior. Check the drop across F1.
4. **Startup current:** establish a justified current limit within the source,
   connector and board limits, release RESET and record peak and steady current.
   A current-limited brownout is not evidence by itself of a bad PCB.
5. **FEL:** follow the README's SW2/SW1 sequence using a USB data connection.
   Record `xfel version` output. Release SW2 after FEL detection before accessing
   the SD NAND clocked through U6.
6. **DDR and storage:** record `xfel ddr t113-s3` output. Use a compatible RAM
   recovery image with this board's SDC0 pinout and managed SD NAND support.
   Record the exact image revision/checksum and its partition/write procedure.
   Do not substitute XFEL's SPI-NAND write commands for this SD/MMC device.
7. **Boot verification:** verify the storage write/readback, reset, collect UART
   logs, and repeat a cold boot. Then check the RGB LED and any expansion load,
   repeating the current measurement under that load.

No tested recovery image or partition layout is shipped here. Storage write
offsets are image-specific; physical testing and a compatible image are needed
to close the firmware item.

## Results record

Copy this table for each board. Replace `NOT TESTED` only with measured evidence.

| Check | Result / evidence |
| --- | --- |
| Board ID, PCB revision and source commit | NOT TESTED |
| Assembly orientation and unpowered short check | NOT TESTED |
| Supply/fixture, current limit, cable and source current allowance | NOT TESTED |
| Protected VBUS; F1 voltage drop | NOT TESTED |
| 3.3 V / 0.9 V / 1.8 V / 1.5 V measurements | NOT TESTED |
| 3.3 V to 0.9 V sequencing waveform | NOT TESTED |
| Startup peak / steady current; attached expansion load | NOT TESTED |
| FEL identification output | NOT TESTED |
| DDR initialization output | NOT TESTED |
| Recovery image checksum and partition/write procedure | NOT TESTED |
| Storage readback verification | NOT TESTED |
| UART boot log / repeated cold boots | NOT TESTED |
| RGB and expansion functionality; loaded current | NOT TESTED |

References: [USB Type-C specification, Release 2.4](https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/196/USB-Type_2D00_C-Spec-R2.4-_2D00_-October-2024.pdf),
[T113-S3 datasheet](https://dl.linux-sunxi.org/T113-S3/T113-S3_Datasheet_v1.6_20220303.pdf),
and the README's linked component and XFEL documentation.
