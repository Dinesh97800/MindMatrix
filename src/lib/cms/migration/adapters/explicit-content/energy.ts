import { entry, type ExplicitContentMap } from "./types";

const adapter = "src/lib/cms/migration/adapters/explicit-content/energy.ts";
const action = (label: string, href: string) => ({ label, href });

export const energyExplicitContent: ExplicitContentMap = {
  "energy-management.challenges": entry(adapter, "Challenge1Section JSX literals", { eyebrow: "The Critical Friction", heading: "Solving the deepest challenges in modern industrial power architecture.", cards: [{ title: "Peak Shaving & Load Balancing", body: "Mitigate exorbitant demand charges through automated, sub-millisecond load shedding and battery storage orchestration.", badges: ["Precision Control", "Cost Mitigation"] }, { title: "Carbon Reporting", body: "Automated greenhouse gas protocol alignment for enterprise ESG auditing. Real-time Scope 2 emission tracking with revenue-grade accuracy." }, { title: "Complex Load Balancing", body: "Distributed energy resources (DERs) create chaotic bi-directional power flows. We stabilize the edge with deterministic control logic.", metrics: [{ value: "80%", label: "Charge Reduction" }, { value: "<2ms", label: "Response Time" }] }] }),
  "energy-management.hardware-software": entry(adapter, "Energy management Section JSX literals", { eyebrow: "The Framework", heading: "Hardware-Software Synergy.", body: "Integrated metering, control, and forecasting architecture.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiMHCNa1MuetI-smul4BuwlWTXuvhx6vyBUWR_Z43l-heIdffmKntsCUZjkmnJvf9fFTUd94aBbG9pI-ZEqB3183TiFpDh46f2UAibr44XcwG-pjA6QRpV6pj57baQ5ClgyjWegiWA9ZxdfueZSOGdyakcPZ95XP2WODBPVMUDJizkt1jKFWsatch6kTyc4tQreq4IMRjsa5hBffNLpQWVudBEgfXLxBSdbDSIjaGc-XsPVZSB9-QjznjvVlUwpfLI6RJVAey1Qs" }, mediaAlt: "Custom industrial circuit board featuring an ARM Cortex-M processor.", bullets: [{ title: "Revenue-Grade Power Meters", body: "ANSI C12.20 Class 0.1 accuracy for billing-critical data collection and harmonic analysis." }, { title: "Demand-Response Controllers", body: "Edge-computing units capable of autonomous load shedding based on grid-frequency triggers." }, { title: "AI-Driven Load Forecasting", body: "Neural networks trained on 10+ years of industrial consumption patterns to predict surges." }], callouts: [{ label: "ARM Cortex-M Hardware Stack" }] }),
  "energy-management.system": entry(adapter, "Energy management Block2Section protocol literals represented as audited ARCH nodes", { heading: "System Technologies", introduction: "Protocol and processing elements used by the system.", nodes: [{ id: "snmp", label: "SNMP" }, { id: "mqtt", label: "MQTT" }, { id: "arm", label: "ARM Cortex-M" }, { id: "sampling", label: "High-speed Sampling" }] }),
  "energy-management.transit-case": entry(adapter, "Energy management Block3Section JSX literals", { eyebrow: "Case Study: Hyperloop Beta", heading: "Power Systems Orchestration for Next-Gen Transit.", body: "Implementing sub-millisecond power distribution for high-velocity magnetic levitation environments. A masterclass in high-speed sampling and demand response.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnyClkpRCriLjD0RyC4upyKjqZFpP6NulmMn9OF0vM_jJP_yaTOUlMnd7eD9co4spYhCJMeu0H68VDUi7aNjCTIOiDnH4bgxGg-QmVhj2asRomEGilWWEp9LrxAIaMROVOZOTd1mv7BI5erpaBehLCqX0b4ZP9Vrw6ER9W_SfceXph0aHUgriNI4aG4_06ldcHfJ9f0LfZbozgfV41328jiFojDMD_371CAObInmGC42vtTJKg5UmtrKJG0cQCw4DxQXTEDLSo6lQ" }, mediaAlt: "High-speed transportation tunnel with glowing lines and metallic structures.", actions: [action("Read Full Report", "/embedded-firmware-development")] }),
  "energy-management.capabilities": entry(adapter, "Energy management Block4Section JSX literals", { heading: "Engineering Capabilities", cards: [{ title: "Embedded Firmware", body: "Low-latency RTOS integration and bare-metal firmware development for mission-critical power metering devices. We ensure zero data loss at 10kHz sampling rates." }, { title: "Industrial IoT Integration", body: "Seamless bridging of legacy Modbus/BACnet protocols with modern cloud-native MQTT brokers and secure WebSocket streams." }] }),
  "energy-management.audit": entry(adapter, "Energy management Block5Section JSX literals", { title: "Ready to Audit Your Efficiency?", body: "Connect with our systems engineers for a comprehensive evaluation of your energy infrastructure.", actions: [action("Analyze Your Energy", "/embedded-firmware-development"), action("Download Technical Spec", "/embedded-firmware-development")] }),
  "bms.architecture": entry(adapter, "BentoGridForArchitectureSection JSX literals", {
    heading: "Unified Control Architecture",
    introduction: "A modular, scalable architecture designed for high-density lithium-ion and solid-state chemistry management, ensuring thermal stability and extended cycle life.",
    cards: [
      { title: "Cell Monitoring", body: "Real-time voltage, current, and temperature acquisition with 16-bit resolution across up to 1000 cells in series.", icon: "analytics", label: "VIEW MODULES" },
      { title: "Active Balancing Logic", body: "Our proprietary algorithms redistribute energy between cells during charge and discharge cycles, minimizing heat generation and maximizing usable capacity by up to 15%.", metrics: [{ value: "0.1mV", label: "Accuracy" }, { value: "<50ms", label: "Response" }, { value: "800V", label: "Isolation" }, { value: "CAN-FD", label: "Comms" }] },
      { title: "SoX Estimation Engine", body: "Advanced EKF (Extended Kalman Filter) models for State of Charge (SoC) and State of Health (SoH) prediction, accounting for cell aging and impedance growth." },
      { title: "Thermal Management", body: "Multi-zone cooling control with predictive derating to prevent thermal runaway. Integrated contactor control and insulation monitoring.", badges: ["CRITICAL FAULT PROTECTION", "ACTIVE COOLING"] },
    ],
  }),
  "bms.silicon-platforms": entry(adapter, "Battery management Section JSX literals", {
    heading: "Powered by industry-standard silicon",
    items: ["TEXAS INSTRUMENTS", "NXP", "ST MICRO", "FreeRTOS"].map((label) => ({ label })),
  }),
  "bms.industrial-applications": entry(adapter, "Battery management Block2Section JSX literals", {
    heading: "Industrial Versatility",
    body: "From stationary grid storage to high-performance mobility, our BMS platform scales to meet the most demanding functional safety requirements.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9c6leigglpCV5qXU3al5fxZlhRgRF9VCat_Sgg3cnHubhYwpj4JPTi0vpldxjMOME9v_WxwUrusuiba7DizxJlykDHXq6ifP1zb8fXqXkicYFeGuvZ7fHsmvDdtutPBQ8rYSjjcpQ8noohVs9h-Unk6yntRHIV0EhUW7P0f7hXPYg1-MkpW-o77DJNdFC4eJ5RO-7PeMjEP1po_s0r5Dq8l2s6lh7OTr3k5v9_RHl-1Eu3E8_YKUPuYzz5yqNFGcBV1Pa-zFUm7I" },
    mediaAlt: "Large-scale Battery Energy Storage System installation in a modern industrial setting.",
    callouts: [
      { title: "BESS Integration", body: "Multi-tier master-slave configurations for MWh-scale grid storage containers. Featuring cloud-linked analytics for fleet-wide health monitoring." },
      { title: "Automotive Traction", body: "ASIL-D compliant hardware for EV and HEV applications. Optimized for high-discharge rates and rapid thermal cycling in performance environments.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtw7-eCIlP0RSRDwBzyUZxfYqktyHpq-jTxnUfzIKaZhHE--xgPBS3U1_Mc-gfPg7COnxRNhWKeDcXV0Kqo0CZIEh2HomEfepBbUjdZKTU66B4vIsMfPcFhutU_NxiCtIcNBgde1U3YY0nr1ZHFU-9EhQp27BTE6_SGXRZvqit-sQp6EA5pJK8YZQFm6oehgmIgZW85RK09LcEaifRLFD8J8MS9_czsQzECWHC_lP51wquqmfq5e6HlsODmP2TX5hJttNQFk9vNaE" }, mediaAlt: "High-performance electric vehicle prototype chassis showing the battery pack and drivetrain." },
    ],
  }),
  "bms.power-solution": entry(adapter, "Battery management Block3Section JSX literals", {
    title: "Ready to engineer your next power solution?",
    body: "Download our engineering whitepaper on High-Voltage BMS Architecture or schedule a technical deep-dive with our lead architects.",
    actions: [action("DOWNLOAD WHITEPAPER", "/battery-management-system"), action("TALK TO AN ENGINEER", "/battery-management-system")],
  }),
  "earth-resistance.benefits": entry(adapter, "Earth resistance Section JSX literals", {
    cards: [
      { title: "Precision Monitoring", body: "Continuous oversight of grounding systems to prevent catastrophic failure in substations and data centers." },
      { title: "Lightning Defense", body: "Automated detection of grounding degradation to ensure lightning protection systems operate at peak efficiency." },
      { title: "Predictive Alerts", body: "Advanced Renesas-powered analytics predict maintenance needs before safety margins are breached." },
    ],
  }),
  "earth-resistance.system": entry(adapter, "Feature1Section JSX literals", {
    heading: "System Architecture",
    introduction: "A multi-layered hardware approach engineered for extreme electrical noise immunity.",
    nodes: [
      { id: "afe", label: "Precision Analog Front-End", description: "Utilizing 24-bit Sigma-Delta ADCs, our sensing layer captures minute variations in soil resistivity, compensating for temperature and moisture variables in real-time.", badges: ["High-Resolution ADC", "Isolation 5kV"] },
      { id: "processing", label: "Renesas Processing Core", description: "Edge computing capabilities powered by Renesas industrial MCUs for instant fault isolation and cloud sync.", annotation: "ARM Cortex-M4" },
      { id: "connectivity", label: "Seamless Connectivity", description: "Supports Modbus/TCP, MQTT, and cellular backhaul for remote substation visibility." },
      { id: "verification", label: "Continuous Grounding Verification", description: "Unlike periodic manual checks, our system performs 1,000 measurements per second to detect transient degradation in the grounding mesh." },
    ],
  }),
  "earth-resistance.applications": entry(adapter, "Earth resistance Block2Section JSX literals", {
    heading: "Industrial Applications", introduction: "Engineered for the most demanding technical environments.",
    cards: [
      { title: "Renewable Energy", body: "Monitoring PV field grounding networks across thousands of acres.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdS9VlZWBhK7LSYo-plIKqgLDlJ4qDjdYJCwzce_uGWBjMhwShKKd8SBaHq9cs5-eE2OrAeMGpWP2ryy8m_RrouKDQuHX0DiDRLmzt6a1cBrny_CmRmtviQxh5odWhWbreO97nfZ25Bcdj8UNvcsRyqe5TOdMetttbi56Y--8ZyWtNFYGtqvCrfm0R6tbnoXuy0Y-EW1oJAZ4rhKdVPnVrtQyM1RAwWhx-sB_WrH0VNd3b1LGgaGvynHWNu5QP7iqM0v6bC4BEXRg" }, mediaAlt: "Solar renewable energy farm at dusk with grounding-grid monitoring overlays." },
      { title: "Power Substations", body: "Ensuring safety and continuity in critical utility infrastructure.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfg6XVFm6gF8nb5YHy8Bo0MMfF65kQGYGdQI9TfA8Gptw-pxKe-TGW-ubu85E1j4Vp7xJqX2qqLVI-FR_OoCPD17nn155g1q2Ok6d9rvwHv64ZkiG1rRKIb7-U2wkErxGpfztC6GisQR-Vd9ErOe832by--Q_MiwV-W3E119-uNF1s2tjLD2n4ozhLRz84u-MrP9PiNCahqYehvq1ZcAwLtyAanRtffyBMGKvlVi4T8YzyNQuhMt9G2hH6gV8qN0XhqjkoyrSzfq0" }, mediaAlt: "High-voltage power substation with grounding monitoring overlays." },
    ],
  }),
  "earth-resistance.operational-benefits": entry(adapter, "Earth resistance Block3Section JSX literals", {
    heading: "Operational Benefits",
    cards: [
      { title: "Reduced Operational Risk", body: "Minimize the probability of equipment damage and personnel injury through verified grounding." },
      { title: "Regulatory Compliance", body: "Automatic reporting for IEEE 80, 81, and 1100 standards compliance." },
      { title: "Asset Longevity", body: "Detect stray currents and soil corrosion patterns before they impact asset lifecycle." },
      { title: "Technical Specifications", rows: [{ label: "Measurement Range", value: "0.01Ω to 2000Ω" }, { label: "Accuracy", value: "±1.0% of Reading" }, { label: "Sampling Frequency", value: "1 kHz" }, { label: "Isolation Level", value: "5kV RMS for 1 Minute" }, { label: "MTBF", value: ">100,000 Hours" }] },
    ],
  }),
  "earth-resistance.security": entry(adapter, "Earth resistance Block4Section JSX literals", {
    title: "Ready to Secure Your Infrastructure?",
    body: "Speak with our lead engineers about integrating Earth Resistance Monitoring into your existing SCADA system.",
    actions: [action("Schedule a Tech Deep-Dive", "/renewable-energy"), action("Request a Demo Unit", "/renewable-energy")],
  }),
  "atacama.challenges": entry(adapter, "Challenge1Section JSX literals", {
    heading: "The Challenge",
    introduction: "Operating in the Atacama Desert presents a triad of engineering extremes: high-altitude UV radiation, radical diurnal temperature shifts, and the absolute necessity for millisecond-level grid response times.",
    cards: [
      { title: "Thermal Cycling", body: "Ambient temperatures oscillate between -10°C at night to 45°C during peak production hours, stressing battery chemistry and cooling loops.", icon: "thermostat" },
      { title: "Remote Access", body: "Geographically isolated infrastructure requires high-availability redundant networking for remote monitoring and fail-safe operation.", icon: "router" },
      { title: "Sub-ms Response", body: "Grid synchronization requires sub-millisecond control loops to prevent instability during rapid solar irradiance fluctuations.", icon: "bolt" },
    ],
  }),
  "atacama.architectural-solution": entry(adapter, "HardwareSection JSX literals", {
    heading: "Architectural Solution",
    body: "A multi-layered ecosystem integrating high-density power electronics with deterministic edge intelligence and cloud-based predictive diagnostics.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFgM14BJOH5y8uRtDXsxaBnjxPoDXfv5I6rCd1IxzSIFnC44Yqg6kFtbOZXJNuqclNRQP6JRF7OWcyJx3eq5Y0IRVSAzsmj4uFISNaUBC1khv_d7lMOWXqC9aQphlsIv3_yis--9E4nLSsC0Mm9CAulcAmU_LIIlHhLthUoVHH6rPGboE3y2cufSvsMJbcoGBwtC3vyk8j5LDGffrrQJzT5Yi4gBNpTGXdg6qeed4USZdfS_tBpXslTJDxh634SVHd8TbZ26_pYDc" },
    mediaAlt: "High-precision SiC MOSFET power modules mounted on a copper heatsink with liquid cooling pipes.",
    callouts: [
      { eyebrow: "Level 1: Hardware", title: "SiC-Based Conversion", body: "We deployed Silicon Carbide (SiC) MOSFET modules providing 98.7% peak efficiency. High-precision Battery Monitoring Units (BMUs) capture voltage and temperature telemetry at 10kHz.", bullets: ["Liquid-cooled thermal management", "Modular 1.2MW power blocks"] },
      { eyebrow: "Level 2: Firmware", title: "RTOS Control", body: "Custom STM32-based RTOS firmware utilizing deterministic timing for active cell balancing and instantaneous grid-forming capabilities.", codeSnippet: "void GridSync_ISR(void) { Update_PWM_DutyCycle(Fast_PID()); Telemetery_Push_Buffer(); }" },
      { eyebrow: "Level 3: Cloud", title: "Azure IoT Intelligence", body: "Integration with Azure Digital Twins allows for a real-time replica of the solar reserve, facilitating predictive maintenance cycles that reduce OPEX by 22% annually." },
    ],
    bullets: ["STM32 MCU", "Azure IoT Hub", "SiC MOSFETs", "FreeRTOS", "LTE-M / Satellite"],
  }),
  "atacama.flow": entry(adapter, "Node1PvArraysSection JSX literals", {
    heading: "Flow Architecture",
    introduction: "Visualizing the pathway from high-irradiance capture to stabilized utility-grade grid distribution.",
    nodes: [
      { id: "solar", label: "Solar Arrays", icon: "wb_sunny" },
      { id: "inverters", label: "SiC BESS Inverters", icon: "electric_bolt" },
      { id: "balancing", label: "RTOS Balancing", icon: "memory" },
      { id: "grid", label: "Regional Grid", icon: "grid_view" },
    ],
    edges: [{ from: "solar", to: "inverters" }, { from: "inverters", to: "balancing" }, { from: "balancing", to: "grid" }],
  }),
  "atacama.results": entry(adapter, "Atacama Section JSX literals", {
    heading: "Strategic Results",
    items: [
      { value: "22%", label: "OPEX Reduction", description: "Enabled by AI-driven predictive thermals." },
      { value: "4.2GW", label: "Total Managed", description: "Stabilized peak capacity across 12 zones." },
    ],
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ71h_CoNfWXCqCEY1kWzKMWY7z_KEmqPAahGQ2IFsUysQpZBI6WR1JfYjWxECTrLfefGbMjAnFaQj2JzvwISecdpETmhasjhoPai1JykFv7eO0A2GC4IYzaa9paAsL8KdWweK_tkWth2RsNjcgqjFAR4MkR5T2KwTa0Z9Qtxuv4hD_WqrfWOj97SmaSAbnn-RnG_qaZaSic9dGUPSlTFpiDuYvWKj1FDRUsqApxxKyHCgkrXePaWDnJdHfYDKgpXLsNp3oJ3IV3s" },
    mediaAlt: "Industrial energy storage facility at twilight with aligned white battery enclosures.",
    testimonial: { quote: "The integration of Mind Matrix's deterministic control loops transformed the Atacama Solar Reserve from a volatile generation asset into a reliable baseline provider for the national grid.", author: "Enrique Diaz", role: "Chief Infrastructure Officer, Southern Energy" },
  }),
  "atacama.optimization": entry(adapter, "Atacama Block2Section JSX literals", {
    title: "Ready to optimize your grid assets?",
    body: "Download the full technical architecture for the Atacama Solar Reserve and see how our SiC-based BESS systems can scale your operations.",
    actions: [action("Download Technical Whitepaper", "/smart-grid"), action("Speak to an Engineer", "/smart-grid")],
    related: [
      { title: "Smart Grid Implementation", body: "Berlin Urban Infrastructure", href: "/smart-grid" },
      { title: "Energy Management AI", body: "Global Logistics Hub", href: "/smart-grid" },
    ],
  }),
  "bess.challenges": entry(adapter, "Battery energy storage Section JSX literals", {
    eyebrow: "01. Critical Challenges", heading: "Navigating High-Voltage Complexity",
    cards: [
      { title: "Cell Balancing", body: "Preventing capacity loss and safety risks through nanovolt-precision passive and active balancing algorithms at the module level.", icon: "balance" },
      { title: "Thermal Runaway", body: "Real-time predictive thermal modeling to detect exothermic anomalies before they escalate into uncontrollable safety events.", icon: "thermostat" },
      { title: "SoH Accuracy", body: "State-of-Health (SoH) and State-of-Charge (SoC) estimation utilizing Kalman filtering for ±0.5% precision across lifecycle variables.", icon: "health_and_safety" },
    ],
  }),
  "bess.hardware-software": entry(adapter, "Battery energy storage Block2Section JSX literals", {
    eyebrow: "02. Integrated Solutions", heading: "Hardware-Software Synergy",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtonBMFSzmwNoizr3mRpcQ8l48PDAdfYEPSA3816eD6Pi4YtIWZMD_YfH1CkBobvq7ae0RYL9OLQ3WBI-Edg46Ew6DZgiH_ENZ_YdX8S9YWLzy4UPXcb7mHgp67MAC8rpU63VIshE9CulWt2ovlDx6tOkawFql9FJVZIGOZ9whqvXTJ9XBJ3-gLAK3-jov6KingvBBLr-LAZahylJv4UWXBT_Bg9nMvM6bsjkGmrhgfkLWPnK-lChQcNTLpj8oiGdOwvqqyyvt7s8" },
    mediaAlt: "High-precision mixed-signal PCB designed for battery management.",
    callouts: [{ title: "Mixed-Signal PCB Architecture", eyebrow: "CONTROL LAYER" }, { title: "Multi-Tier BMS", icon: "hub" }, { title: "Grid Sync", body: "Phase-locked loop (PLL) synchronization at millisecond latency." }],
    bullets: [
      { title: "Fire Suppression Logic", body: "Embedded logic for automated venting and aerosol deployment based on multi-gas sensor fusion." },
      { title: "Grid-Synchronization Controllers", body: "Active power filtering and synthetic inertia support for microgrid and utility-scale integration." },
      { title: "Safety-Critical Firmware", body: "MISRA-C compliant software stacks designed for ASIL-D reliability standards in high-energy environments." },
    ],
  }),
  "bess.technology-arsenal": entry(adapter, "Battery energy storage Block3Section JSX literals", {
    heading: "Technological Arsenal",
    items: [
      { label: "LiFePO4", category: "CHEMISTRY", description: "Monitoring & Optimization" },
      { label: "24-bit ADC", category: "SIGNAL", description: "High-Precision Sensing" },
      { label: "CAN Bus", category: "NETWORK", description: "Redundant Communication" },
      { label: "Modbus/TCP", category: "PROTOCOLS", description: "SCADA Integration" },
    ],
  }),
  "bess.case-study": entry(adapter, "Battery energy storage Block4Section JSX literals", {
    eyebrow: "CASE STUDY: NORDIC EDGE HUB", heading: "Balancing the Arctic Grid",
    body: "Mind Matrix engineered the 50MWh BMS for the Nordic Edge Hub, implementing sub-zero electrolyte heating logic and ultra-low latency grid-support responses.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFgxkwq2jaqnU5ifDPd74YUOk6sx169BhI3Fwd_mUeaKFevr2p97hX7P9IrEmZFlalj9B3fMnUXApVIBw64HhLA2pHOnChOMsDjsSesLGc7S7U_o0DgOvdprMlsTeIlYCiwij-XtoaKM1G1xKBOnK_xODAY8QJWfzBWKvkSaEwUqcAFQrVY45LCxOfdqzU1Z9qPscnC6XIi9FHGMITjZxfsrTVVjMwQJDMoyBnHwQu7obr9WcPEhqMGszFwbnOi9GR03qRC9WqH8g" },
    mediaAlt: "Modern energy storage facility in a Nordic coastal landscape during twilight.",
    callouts: [{ value: "99.9%", label: "System Uptime" }, { value: "< 5ms", label: "Response Latency" }],
    actions: [action("Read Full Technical Paper", "/battery-management-system")],
  }),
  "bess.engineering-core": entry(adapter, "Battery energy storage Block5Section JSX literals", {
    eyebrow: "Engineering Core", title: "Where Bits Meet Electrons",
    items: [
      { title: "Mixed-Signal PCB Design", body: "Specialized in isolating high-voltage power paths from sensitive logic levels. Our designs feature multi-layer impedance control and advanced EMI/EMC mitigation strategies.", tags: ["Altium Designer", "Thermal Simulation", "IEC 61508"] },
      { title: "Safety-Critical Firmware", body: "Real-time operating systems (RTOS) tuned for deterministic execution. We implement triple-modular redundancy for critical control loops and secure boot authentication.", tags: ["FreeRTOS", "Rust for Embedded", "ISO 26262"] },
    ],
  }),
  "bess.energy-future": entry(adapter, "Battery energy storage Block6Section JSX literals", {
    title: "Ready to secure the future of energy?",
    body: "Our engineering team is ready to discuss your BESS requirements, from initial proof-of-concept to utility-scale deployment.",
    actions: [action("Engineer Your Storage Solution", "/battery-management-system"), action("View Technical Specs", "/battery-management-system")],
  }),
  "environmental.challenges": entry(adapter, "Environmental monitoring Challenge1Section JSX literals", { heading: "The Complexity of Remote Deployment", cards: [{ title: "Sensor Fouling", body: "Bio-accumulation and sedimentation degrade precision in aquatic environments. Our systems utilize automated wiping and ultra-sonic cleaning cycles.", icon: "opacity" }, { title: "Remote Transmission", body: "Monitoring in the \"Dead Zones.\" We implement multi-path communication protocols to ensure zero data loss in non-cellular regions.", icon: "sensors" }, { title: "Battery Longevity", body: "Years of autonomy on a single charge. Our nanosecond sleep-states and energy harvesting optimize operation in sub-optimal solar conditions.", icon: "battery_charging_full" }] }),
  "environmental.infrastructure": entry(adapter, "Environmental monitoring Section JSX literals", { heading: "Integrated Monitoring Infrastructure", introduction: "A modular ecosystem designed for rapid deployment and high-fidelity telemetry.", nodes: [{ id: "water", label: "Water Quality Probes", description: "Multi-parameter sensing including pH, DO, and turbidity with 0.1% accuracy." }, { id: "air", label: "Air Particulate Sensors", description: "Laser-scattering tech for PM2.5 and PM10 detection in industrial zones." }, { id: "weather", label: "Autonomous Weather Stations", description: "Full meteorology suites with LoRaWAN and Satellite redundancy." }, { id: "analog", label: "Analog Core", annotation: "24-bit Sigma-Delta" }, { id: "protocol", label: "Data Protocol", annotation: "SDI-12 v1.4" }, { id: "mesh", label: "Mesh Layer", annotation: "LoRaWAN AS923" }], annotations: [{ label: "Power Integrity", value: "75%" }] }),
  "environmental.case-study": entry(adapter, "Environmental monitoring Block2Section JSX literals", { eyebrow: "Key Case Study", heading: "Nanolithography Cluster Control", body: "Achieving sub-millikelvin thermal stability and vibration mitigation for global leaders in semiconductor manufacturing. Our systems monitor real-time environmental interference with zero-latency response protocols.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTnVjxWyWAK9IoppZLHPQvlANL1X6KP4-q6lgVTHNKDdoEvwuRLB3O3VZZCqLcETBAuB4e5SENuEw__kv1lHBqfMj-ILxS1ELQaCHG8gAyI5AayKK2HXygw5twp3KBPVs0MNVW-gp_5HC7R8kkbC1txy1EN-oKwpRLAF6VcSPcZg7iy7scu1YvDkFS3s95hggKfwmB0CA6CC4Uv81m6ubdmc-hj_xuCcD3Ydshlckk-qPmkx_K9DEIjsmY5sWhmiHiN8Rj5TbDfNk" }, mediaAlt: "A cleanroom environmental-control installation integrated into a nanolithography production line.", callouts: [{ value: "0.001K", label: "Thermal Precision" }, { value: "12ms", label: "Trigger Response" }, { value: "99.9%", label: "Uptime SLA" }, { title: "Precision Measurement", body: "Development of proprietary ADCs for high-impedance sensor interfaces, ensuring micro-level signal fidelity in harsh environments." }, { title: "Low-Power Design", body: "Sub-microamp leakage current engineering and aggressive power-gating techniques for decades of unattended operation." }, { title: "LoRaWAN Integration", body: "Optimized network stacks for long-range, deep-penetration communications across vast agricultural and industrial landscapes." }], actions: [action("Connect with an Engineer", "/nanolithography-cluster-control")] }),
  "environmental.ecological-data": entry(adapter, "Environmental monitoring DecorativeAtmosphericBackgroundSection content literals; decoration excluded", { title: "Ready to secure your ecological data?", body: "Join the forefront of technical conservation. Partner with us to deploy monitoring solutions that withstand the elements and deliver absolute truth.", actions: [action("Protect Your Environment", "/nanolithography-cluster-control")] }),
  "ev-infrastructure.challenges": entry(adapter, "EV infrastructure ThermalCardSection JSX literals", { heading: "Critical Infrastructure Challenges", introduction: "We solve the complex engineering bottlenecks that prevent mass-scale adoption of rapid charging technology.", cards: [{ title: "Thermal Management", body: "Solving excessive heat dissipation in ultra-fast charging modules through innovative liquid-cooling substrate designs and GaN/SiC optimization.", icon: "thermostat" }, { title: "High-Power Switching", body: "Engineering rugged power stages capable of handling 350kW+ loads with minimal switching loss and extreme transient protection.", icon: "dynamic_form" }, { title: "Billing Security", body: "Hardware-rooted encryption for POS terminals and cloud-sync modules ensuring tamper-proof transaction integrity across the network.", icon: "shield_lock" }] }),
  "ev-infrastructure.solutions": entry(adapter, "EV infrastructure Solution1Section JSX literals", { heading: "Industrial Solutions & Stack", introduction: "A unified approach to modular charging hardware and intelligent firmware architectures.", cards: [{ title: "Level 3 DC Fast Charger Controllers", body: "Our flagship control system architecture for high-capacity charging points, featuring multi-port load balancing and real-time state-of-health monitoring.", badges: ["ISO 15118", "CAN Bus Integration", "Modular Scaling"] }, { title: "Silicon Carbide (SiC)", body: "Reducing volume by 40% while boosting charging efficiency." }, { title: "V2G Communication", body: "Enabling Vehicle-to-Grid bidirectional power transfer with micro-grid stability synchronization.", label: "PROTOCOL SUPPORT: CHAdeMO / CCS" }, { title: "Cloud-Integrated Billing", body: "Full-stack OCPP 2.0.1 compliant management systems for global network operators.", link: action("EXPLORE DATA SUITE", "/solutions"), media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSKNEFLrX59nRBARxRX-aZn-mOs54VDBUdK1vGDrpqeqYHxmV71XFSZpadaqpbjdTK66VvZitYjLmXgrA0l9-JM3ZfJsrQcPPAm91scBnj4br3ioWWf0cEzWgW6jBPDCYZn73LieOtTjDJk49_UwicVBH73kv94PqF0Sd4LNeJZ10M6TEcelWH-mqvy08qwYAzJhjxV_GDAcvQqOOu7N9HOjwAnubooUXVowKEBT6mRflgHPhhK3vhZ2ctbDRHCwEUzaD96ObYMVI" }, mediaAlt: "Dark-mode dashboard showing real-time electric-vehicle charging and power-distribution metrics." }] }),
  "ev-infrastructure.case-study": entry(adapter, "EV infrastructure Section JSX literals", { eyebrow: "Case Study", heading: "Metropolis EV-Transit", body: "Deploying a city-wide rapid charging grid for a fleet of 500+ electric buses with smart load management to avoid grid strain during peak hours.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH3mEziV4M5I3-S87TYYJ8TEkPPK1E8T20OBKCPtp1dryUy8QU2RPyj4clj-tQdVcf55ccH9Vtw9EoEONipQWMFJ6eYWypoaRi0R3I8eZ7CiZqWZJIAUVy7UzEsfb0c4DMCK20mIr4co3V6lDtIlW31HqV_y2rqPTxiNsnLmlAzsbTlQmHH4eGZj1QfbudV6yeQCkPg1sgiiBrCCP2RxYeoiRJMREXAL7B4kv-yq-xpGhxTFDmMbyutxz8nFNq3LqF7jvM-NnZkzI" }, mediaAlt: "A fleet of electric buses charging at a modern city depot at twilight.", callouts: [{ value: "30%", label: "ENERGY SAVINGS" }, { value: "Zero", label: "GRID OVERLOADS" }, { quote: "The SiC-based modules provided the efficiency we needed to make high-density urban transit electrification financially viable.", author: "Director of Infrastructure, Metropolis Transit" }] }),
  "ev-infrastructure.sustainability": entry(adapter, "EV infrastructure Block2Section JSX literals", { title: "Engineering Excellence for Sustainable Frontiers", body: "From power electronics design to secure OTA updates, our expertise ensures your infrastructure remains ahead of the curve.", highlights: [{ title: "Power Electronics", body: "Custom PCB design for high-current applications and advanced thermal modeling." }, { title: "Secure OTA Updates", body: "Failsafe remote firmware deployment with multi-layer verification protocols." }], actions: [action("Scale Your EV Network", "/metropolis-ev-transit")], footnote: "Contact our infrastructure experts for a technical consultation." }),
  "renewable.challenges-and-expertise": entry(adapter, "Renewable energy ChallengesSection JSX literals", { heading: "Systemic Challenges", introduction: "Modernizing the grid requires solving fundamental physical and digital obstacles that legacy systems cannot address.", cards: [{ title: "Intermittency", body: "Managing variable power output with high-speed load balancing and energy storage buffers." }, { title: "Grid Stability", body: "Ensuring frequency control and reactive power compensation at the edge of the network." }, { title: "Remote Asset Management", body: "Operating critical infrastructure in offshore and desert locations with zero local support." }, { title: "Harsh Environment Expertise", body: "Our hardware design lifecycle includes thermal shock testing and salt-spray resistance for assets deployed in extreme latitudes and coastal zones.", badges: ["IP67 Enclosures", "High-Rel Firmware", "Redundant Comms"] }, { title: "Solar-PV Control", body: "Next-gen MPPT algorithms achieving 99.9% efficiency in dynamic shading scenarios." }, { title: "Telemetry Stack", body: "Real-time vibration and thermal analysis for wind turbine drivetrains over fiber-optic backhauls." }] }),
  "renewable.solutions": entry(adapter, "Renewable energy Solution1Section JSX literals", { heading: "Industrial Solutions", introduction: "Scalable engineering architectures for Tier-1 energy providers.", cards: [{ title: "Custom Power Electronics", body: "SiC-based inverters optimized for high-voltage DC distribution and reduced conversion losses in large-scale utility farms.", link: action("TECHNICAL WHITE PAPER", "/renewable-energy") }, { title: "Remote Monitoring", body: "Cloud-native dashboarding for global asset fleets with millisecond granularity and encrypted satellite data relay.", link: action("INTERFACE DEMO", "/renewable-energy") }, { title: "Predictive Maintenance", body: "ML models trained on terabytes of turbine telemetry to identify bearing fatigue weeks before critical failure occurs.", link: action("ALGORITHM SPECS", "/renewable-energy") }] }),
  "renewable.case-study": entry(adapter, "Renewable energy Section JSX literals", { eyebrow: "Featured Case Study", heading: "Atacama Grid Expansion: Resilience in Extreme Aridity", body: "Deploying an integrated solar-storage system in one of the earth's most hostile environments required a total rethink of passive cooling and firmware robustness. Mind Matrix delivered a unified control layer that reduced downtime by 34%.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWfXoROyyOgv-wHrw2OGI7mozwFA15jqQiC5wgNkJ8Jj_8R2zY9Gyd6MAGWZ1-w7y7h3cnotVKBGbl9pFcAUuPcYP1VmYimO0v0n0xV0f48i86_SScj7sDd_zx42BdCa5fQs_EEdGWH7rgFTALTn0CerzSZMR0HxFsvjksAq5f0HkY2jp-uhu7CAxgsYOMzLugCizCa2v8HVmOt6pjczelVriEdcMCcyopEqD-hPI-PKtLzgiqcL3En8NG81F_nW2Yu8cCdvnAXBo" }, mediaAlt: "Aerial view of a vast solar array across the Atacama Desert.", callouts: [{ value: "4.2GW", label: "TOTAL MANAGED CAPACITY IN THE REGION" }, { value: "100%", label: "Off-Grid Reliability" }, { value: "-22%", label: "OPEX Reduction" }], actions: [action("Read the Full Report", "/renewable-energy")] }),
  "renewable.optimization": entry(adapter, "Renewable energy Block2Section JSX literals", { title: "Ready to optimize your energy ecosystem?", body: "From initial hardware prototyping to global fleet deployment, our engineers bridge the gap between energy physics and digital intelligence.", actions: [action("Consult our Energy Experts", "/renewable-energy")] }),
  "smart-grid.challenges": entry(adapter, "Smart grid Section JSX literals", { heading: "Core Challenges", cards: [{ title: "Cybersecurity & Resiliency", body: "Hardening distributed energy assets against sophisticated attacks while maintaining deterministic availability." }, { title: "Demand Response", body: "Balancing volatile demand and distributed generation without sacrificing grid stability." }, { title: "Aging Infrastructure", body: "Interfacing modern intelligence with legacy equipment and long-lived utility protocols." }, { title: "Grid-Edge Intelligence", body: "Moving analysis and control closer to field assets for immediate, autonomous response." }] }),
  "smart-grid.solutions": entry(adapter, "Smart grid Solution1Section JSX literals", { heading: "Engineering Solutions", metrics: [{ value: "0.5ms", label: "LATENCY TARGET" }, { value: "128-Bit", label: "ENC ARCHITECTURE" }], cards: [{ title: "Smart Meters", body: "Revenue-grade metering with secure communications and remote lifecycle management." }, { title: "Automated Distribution Hubs", body: "Deterministic controllers for coordinated switching, protection, and load management." }, { title: "Grid-Edge Analytics", body: "On-device analytics that turn high-rate telemetry into actionable grid intelligence." }] }),
  "smart-grid.protocol-stack": entry(adapter, "Smart grid Block2Section JSX literals", { heading: "Protocol Stack & Interoperability", introduction: "Standards-based integration across protection, automation, telemetry, and control layers.", nodes: [{ id: "iec61850", label: "IEC 61850" }, { id: "modbus", label: "Modbus TCP" }, { id: "dnp3", label: "DNP3" }, { id: "relays", label: "Protection Relays" }] }),
  "smart-grid.case-study": entry(adapter, "Smart grid Block3Section JSX literals", { eyebrow: "Case Study", heading: "Zero-Latency Infrastructure Refactor", body: "A utility-network modernization centered on deterministic edge control, secure interoperability, and resilient field communications.", media: { source: null, status: "source image remains bound by the locked React template" }, mediaAlt: "Utility-network infrastructure modernization." }),
  "smart-grid.domain-expertise": entry(adapter, "Smart grid Block4Section JSX literals", { heading: "Deep Domain Expertise", items: [{ label: "COMMUNICATIONS" }, { label: "FIRMWARE" }, { label: "HARDWARE" }, { label: "COMPLIANCE" }] }),
  "smart-grid.modernization": entry(adapter, "Smart grid Block5Section JSX literals", { title: "Ready to Modernize, Optimize Your Grid", actions: [action("Explore Solutions", "/solutions"), action("Schedule Tech Demo", "/request-consultation")] }),
};
