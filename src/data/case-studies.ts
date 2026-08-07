export interface CaseStudy {
  slug: string;
  title: string;
  requirement: string;
  responsibility: string;
  technology: string;
  challenge: string;
  solution: string;
  result: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "industrial-battery-charger-controller",
    title: "Industrial Battery Charger Controller",
    requirement:
      "Develop a reliable charger controller for industrial battery systems with configurable charging profiles and fault handling.",
    responsibility:
      "System architecture, embedded firmware, peripheral drivers, protection logic, and bench validation support.",
    technology: "STM32, bare-metal firmware, ADC/PWM peripherals, RS-485 configuration interface",
    challenge:
      "Balancing charging accuracy, thermal behaviour, and fault recovery within constrained hardware resources.",
    solution:
      "Implemented staged charging control, monitored temperature and voltage limits, and added diagnostic event logging for field analysis.",
    result: "Prototype validated on bench; control behaviour verified against agreed test cases.",
  },
  {
    slug: "can-multi-module-charger",
    title: "CAN-Based Multi-Module Charger Controller",
    requirement:
      "Coordinate multiple charger modules over CAN with central monitoring and module-level diagnostics.",
    responsibility:
      "Communication architecture, CAN stack integration, module firmware, and system-level test support.",
    technology: "STM32, CAN, Modbus monitoring interface, event logging",
    challenge:
      "Ensuring deterministic module coordination and fault isolation across a multi-node charger system.",
    solution:
      "Defined CAN message structure, implemented heartbeat and fault reporting, and validated multi-module behaviour on prototype hardware.",
    result: "Multi-module prototype validated; communication and fault handling verified in bench tests.",
  },
  {
    slug: "telecom-power-controller",
    title: "Telecom Power Controller",
    requirement:
      "Provide monitoring and control for telecom power equipment with industrial communication and alarm reporting.",
    responsibility:
      "Firmware development, measurement interfaces, alarm logic, and communication integration.",
    technology: "Microcontroller platform, RS-485, Modbus RTU, digital I/O and measurement inputs",
    challenge:
      "Integrating measurement, control, and communication requirements within a field-deployable controller design.",
    solution:
      "Implemented structured measurement processing, alarm/event handling, and Modbus-based remote access for monitoring.",
    result: "Functional prototype completed; monitoring and alarm behaviour verified during integration testing.",
  },
  {
    slug: "modbus-monitoring-device",
    title: "Modbus Monitoring Device",
    requirement:
      "Create a compact monitoring device for industrial parameters with Modbus RTU/TCP access and local indication.",
    responsibility:
      "Firmware architecture, Modbus slave implementation, measurement processing, and configuration storage.",
    technology: "STM32, Modbus RTU/TCP, RS-485, UART, flash configuration storage",
    challenge:
      "Supporting reliable Modbus communication alongside periodic measurement and local status indication.",
    solution:
      "Separated communication and measurement tasks, added robust register mapping, and validated against standard Modbus test tools.",
    result: "Prototype validated with customer test setup; register map and communication confirmed.",
  },
  {
    slug: "remote-monitoring-snmp-gateway",
    title: "Remote Monitoring / SNMP Gateway",
    requirement:
      "Bridge field device data to remote monitoring systems using SNMP and serial/industrial interfaces.",
    responsibility:
      "Gateway firmware, protocol conversion logic, alarm mapping, and configuration utilities.",
    technology: "Embedded Linux/microcontroller platform, SNMP, RS-485, Ethernet, MQTT where applicable",
    challenge:
      "Mapping diverse device data into a stable monitoring model for remote operations teams.",
    solution:
      "Implemented structured data mapping, alarm thresholds, and remote configuration with validation on prototype hardware.",
    result: "Field issue resolved for agreed monitoring use case; gateway behaviour verified in deployment testing.",
  },
  {
    slug: "industrial-data-logger",
    title: "Industrial Data Logger",
    requirement:
      "Log measurement and event data locally with timestamping and export capability for analysis.",
    responsibility:
      "Firmware design, flash filesystem/logging, communication interface, and diagnostic utilities.",
    technology: "STM32, flash storage, RS-485/UART, data logging, configuration tools",
    challenge:
      "Ensuring reliable storage, power-loss handling, and readable export formats for field analysis.",
    solution:
      "Implemented circular logging, event markers, and PC-side export/configuration utilities for test and calibration.",
    result: "Prototype validated; logging continuity and export verified under agreed test conditions.",
  },
  {
    slug: "energy-monitoring-controller",
    title: "Energy-Monitoring Controller",
    requirement:
      "Monitor electrical parameters and provide local control/indication for an energy-management application.",
    responsibility:
      "Measurement firmware, calibration support, communication integration, and test documentation.",
    technology: "Microcontroller, measurement front-end interfaces, Modbus, display/indication outputs",
    challenge:
      "Achieving usable measurement accuracy and stable communication in an industrial monitoring environment.",
    solution:
      "Implemented calibrated measurement processing, alarm thresholds, and Modbus access for supervisory systems.",
    result: "Performance verified against documented test cases; prototype ready for customer review.",
  },
  {
    slug: "custom-measurement-control-system",
    title: "Custom Measurement and Control System",
    requirement:
      "Deliver a tailored measurement and control solution for a specific industrial application with diagnostics and configuration tools.",
    responsibility:
      "Architecture review, firmware development, hardware-firmware integration, and validation support.",
    technology: "Application-specific MCU platform, industrial I/O, communication protocol as required",
    challenge:
      "Integrating custom measurement logic, control outputs, and service/debug features within project constraints.",
    solution:
      "Structured the design into measurable subsystems, implemented diagnostics and configuration utilities, and supported prototype bring-up.",
    result: "Prototype validated; customer accepted agreed functional scope under confidentiality.",
  },
];

export const caseStudyConfidentialityNote =
  "Customer identity and selected implementation details are withheld under confidentiality obligations.";
