import { siteContent } from "@/config/site-content";

export type PageContentEntry = {
  eyebrow: string;
  title: string;
  description: string;
  capabilities: readonly string[];
};

const communicationCapabilities = [
  "CAN, Modbus, RS-485, UART, SPI, and I²C integration",
  "Ethernet, MQTT, and SNMP connectivity where required",
  "Protocol stacks, gateway logic, and field-device interfacing",
  "Diagnostics, event logging, and communication fault handling",
  "Integration with existing PLC, SCADA, or proprietary systems",
] as const;

const firmwareCapabilities = [
  "Bare-metal and RTOS-based firmware development",
  "Microcontroller peripheral drivers and board-support packages",
  "Bootloaders, configuration storage, and update mechanisms",
  "Hardware-firmware integration and prototype bring-up",
  "Debugging, validation, and production-transition support",
] as const;

const hardwareCapabilities = [
  "Embedded hardware design and schematic development",
  "Mixed-signal PCB layout support and review",
  "Component selection, BOM preparation, and design documentation",
  "Prototype assembly coordination and bench validation",
  "Design upgrade, redesign, and existing-product improvement",
] as const;

export const pageContent = {
  "engineering-consulting": {
    eyebrow: "Technical Consultation",
    title: "Engineering Consulting",
    description:
      "Senior-led technical consultation for embedded product requirements, architecture decisions, debugging support, and focused engineering assignments.",
    capabilities: [
      "Initial requirement review and engineering discussion",
      "Architecture guidance for new or existing products",
      "Existing-product debugging and fault diagnosis",
      "Design review, redesign, and feature enhancement support",
      "Long-term engineering support where required",
    ],
  },
  "engineering-process": {
    eyebrow: "How We Work",
    title: "Engineering Process",
    description:
      "A practical, senior-led process from requirement analysis through implementation, validation, documentation, and production transition.",
    capabilities: [
      "Requirement analysis and system architecture",
      "Implementation planning with clear scope and deliverables",
      "Prototype bring-up, testing, and structured validation",
      "Documentation, test procedures, and calibration utilities",
      "Production documentation and technical transition support",
    ],
  },
  "embedded-firmware-development": {
    eyebrow: "Firmware Engineering",
    title: "Embedded Firmware Development",
    description:
      "Robust embedded firmware for industrial, power-electronics, telecom, and custom control applications — from drivers and RTOS tasks through validation and field support.",
    capabilities: firmwareCapabilities,
  },
  "hardware-development": {
    eyebrow: "Hardware Engineering",
    title: "Hardware & Firmware Development",
    description:
      "Embedded hardware and firmware development for industrial products, combining practical electronics knowledge with reliable software integration.",
    capabilities: [...hardwareCapabilities, ...firmwareCapabilities.slice(0, 3)],
  },
  "product-development": {
    eyebrow: "Product Development",
    title: "Prototype Bring-up & Product Development",
    description:
      "Support for new product development or improvement of existing designs, from early architecture through prototype validation and production readiness.",
    capabilities: [
      "Requirement analysis and system architecture",
      "Hardware-firmware integration and prototype bring-up",
      "Measurement, diagnostics, and validation utilities",
      "Design upgrade, redesign, and feature enhancement",
      "Production documentation and technical transition",
    ],
  },
  "industrial-communication": {
    eyebrow: "Communication Integration",
    title: "Industrial Communication",
    description:
      "Industrial communication integration for embedded products, including field protocols, gateway logic, and reliable data exchange between devices and supervisory systems.",
    capabilities: communicationCapabilities,
  },
  "embedded-measurement-system": {
    eyebrow: "Measurement & Instrumentation",
    title: "Embedded Measurement Systems",
    description:
      "Custom measurement, monitoring, diagnostics, and calibration support for industrial and instrumentation applications.",
    capabilities: [
      "Sensor interfacing and signal-conditioning support",
      "Measurement firmware, logging, and diagnostics",
      "Test and calibration utilities for bench and field use",
      "Data acquisition and monitoring features",
      "Validation support for accuracy and repeatability requirements",
    ],
  },
  manufacturing: {
    eyebrow: "Production Support",
    title: "Production-transition Support",
    description: siteContent.manufacturingSupport,
    capabilities: [
      "Design-for-manufacture review and documentation support",
      "Production test strategy and test-procedure development",
      "BOM, manufacturing documentation, and technical handover",
      "Prototype coordination with selected manufacturers",
      "Support during early production bring-up",
    ],
  },
  industries: {
    eyebrow: "Industries Served",
    title: "Industries We Support",
    description:
      "Mind Matrix Intelligent Solutions supports embedded product development across industrial control, power electronics, telecom power, energy monitoring, and related applications.",
    capabilities: siteContent.industries.map((i) => i.label),
  },
  "industrial-automation": {
    eyebrow: "Industrial Control",
    title: "Industrial Control & Monitoring",
    description:
      "Embedded control, monitoring, diagnostics, and communication solutions for industrial automation and equipment applications.",
    capabilities: [
      "Control and monitoring firmware development",
      "Industrial communication and gateway integration",
      "Measurement, event logging, and diagnostics",
      "Prototype bring-up and field-issue support",
      "Existing-system integration where required",
    ],
  },
  "ev-charger-electronics": {
    eyebrow: "Power Electronics",
    title: "Power Electronics & Battery Chargers",
    description:
      "Embedded electronics and firmware support for power-electronics products, including control, monitoring, communication, and validation.",
    capabilities: [
      "Control and monitoring firmware for power-electronics products",
      "Measurement, protection, and diagnostics features",
      "Communication interfaces for monitoring and configuration",
      "Prototype validation and bench testing support",
      "Design review and product enhancement",
    ],
  },
  telecom: {
    eyebrow: "Telecom Power",
    title: "Telecom Power Systems",
    description:
      "Embedded development support for telecom power and related industrial power-system products, including monitoring, control, and communication features.",
    capabilities: [
      "Monitoring and control firmware for power-system products",
      "Alarm, event logging, and diagnostics support",
      "Communication integration for remote monitoring",
      "Prototype bring-up and production-transition support",
      "Existing-product debugging and enhancement",
    ],
  },
  "energy-monitoring": {
    eyebrow: "Energy Monitoring",
    title: "Energy Measurement & Monitoring",
    description:
      "Embedded measurement and monitoring solutions for energy-related applications, including acquisition, logging, communication, and calibration support.",
    capabilities: [
      "Measurement firmware and data logging",
      "Communication interfaces for monitoring systems",
      "Configuration, testing, and calibration utilities",
      "Diagnostics and event reporting",
      "Prototype validation and field-support readiness",
    ],
  },
  "remote-monitoring": {
    eyebrow: "Remote Monitoring",
    title: "Remote Monitoring & Gateways",
    description:
      "Gateway and remote-monitoring product development, including data acquisition, protocol handling, diagnostics, and integration with supervisory systems.",
    capabilities: [
      "Gateway firmware and communication handling",
      "MQTT, SNMP, Modbus, or other required interfaces",
      "Edge data collection, buffering, and event logging",
      "Configuration and remote-management support",
      "Prototype validation and deployment readiness",
    ],
  },
  "industrial-iot-gateway": {
    eyebrow: "Data Acquisition",
    title: "Data Acquisition & Logging",
    description:
      "Embedded gateway and data-acquisition development for industrial products requiring reliable collection, logging, and communication of field data.",
    capabilities: [
      "Field data acquisition and structured logging",
      "Industrial protocol and network integration",
      "Diagnostics, alarms, and device configuration",
      "Edge processing where required by the application",
      "Prototype bring-up and validation support",
    ],
  },
  "snmp-alarm-gateway": {
    eyebrow: "Communication Products",
    title: "Embedded Communication Products",
    description:
      "Development support for embedded communication products such as alarm gateways, protocol converters, and monitoring interfaces.",
    capabilities: [
      "SNMP, MQTT, Modbus, and related protocol support",
      "Alarm handling, event logging, and diagnostics",
      "Gateway logic and device interfacing",
      "Configuration tools and validation utilities",
      "Production documentation and technical transition",
    ],
  },
  technologies: {
    eyebrow: "Technology Stack",
    title: "Technologies We Work With",
    description:
      "Practical embedded technologies used across MMIS engagements, selected according to product requirements rather than generic platform marketing.",
    capabilities: siteContent.technologies.map((t) => t.label),
  },
  stm32: {
    eyebrow: "Microcontrollers",
    title: "STM32 Development",
    description:
      "STM32-based firmware and product development, including peripheral drivers, RTOS integration, communication stacks, and prototype bring-up.",
    capabilities: [
      "STM32 peripheral drivers and board-support packages",
      "Bare-metal and FreeRTOS-based application firmware",
      "Communication and measurement integration",
      "Bootloaders and field-update support",
      "Debugging, validation, and production transition",
    ],
  },
  freertos: {
    eyebrow: "RTOS",
    title: "FreeRTOS & RTOS Development",
    description:
      "RTOS-based embedded firmware for applications requiring structured task management, timing control, communication handling, and reliable device operation.",
    capabilities: [
      "Task architecture and scheduling design",
      "Driver integration and inter-task communication",
      "Communication stacks and device supervision",
      "Diagnostics, logging, and fault handling",
      "Validation and long-term maintainability support",
    ],
  },
  "industrial-protocols": {
    eyebrow: "Field Protocols",
    title: "Industrial Protocols",
    description:
      "Implementation and integration of industrial field protocols used in embedded products and monitoring systems.",
    capabilities: [
      "Modbus RTU/TCP and RS-485 communication",
      "CAN-based device communication",
      "UART, SPI, and I²C device interfacing",
      "Protocol conversion and gateway logic",
      "Validation, diagnostics, and field-issue support",
    ],
  },
  mqtt: {
    eyebrow: "Connectivity",
    title: "MQTT Integration",
    description:
      "MQTT integration for embedded and gateway products requiring structured telemetry, event reporting, and remote connectivity.",
    capabilities: [
      "MQTT client implementation and session handling",
      "Telemetry, alarms, and event publishing",
      "Secure connectivity considerations for deployment",
      "Integration with existing device firmware",
      "Testing utilities and validation support",
    ],
  },
  "embedded-linux": {
    eyebrow: "Embedded Platforms",
    title: "Embedded Linux",
    description:
      "Embedded Linux support where the product architecture requires it, including application bring-up, communication integration, and deployment-oriented validation.",
    capabilities: [
      "Application and service bring-up on embedded Linux targets",
      "Communication and device-interface integration",
      "Configuration, logging, and diagnostics support",
      "Build and deployment workflow support",
      "Integration with broader product-development scope",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    description:
      "Common questions about MMIS engineering services, engagement scope, communication integration, and how projects are typically structured.",
    capabilities: siteContent.consultationFaq.map((item) => item.question),
  },
} as const satisfies Record<string, PageContentEntry>;

export type PageContentKey = keyof typeof pageContent;

export function getPageContent(key: string): PageContentEntry | undefined {
  return pageContent[key as PageContentKey];
}

export function pageKeyFromPath(pathname: string): PageContentKey | undefined {
  const slug = pathname.replace(/^\//, "").split("/")[0];
  if (!slug) return undefined;
  return slug in pageContent ? (slug as PageContentKey) : undefined;
}
