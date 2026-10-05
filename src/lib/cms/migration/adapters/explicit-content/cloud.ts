import { entry, type ExplicitContentMap } from "./types";

const adapter = "src/lib/cms/migration/adapters/explicit-content/cloud.ts";
const link = (label: string, href: string) => ({ label, href });

export const cloudExplicitContent: ExplicitContentMap = {
  "application-notes.quick-start": entry(adapter, "MajorQuickStartCardSection JSX literals", {
    heading: "Quick Start",
    cards: [
      { badge: "MANDATORY", title: "Workspace Core Deployment", body: "The fundamental architecture for multi-tenant engineering workspaces. Configure secure nodes and local-first data synchronization.", icon: "account_tree", actions: [link("VIEW SCHEMATIC", "/application-notes-and-design-guides"), link("COPY CLI CMD", "/application-notes-and-design-guides")] },
      { badge: "Optimization", title: "Memory Matrix v2", body: "Optimizing cache invalidation for massive technical datasets.", link: link("READ DOCS", "/application-notes-and-design-guides") },
    ],
  }),
  "application-notes.related-technologies": entry(adapter, "Application notes Section JSX literals", {
    heading: "Related Technologies",
    items: [
      { label: "Telemetry API", description: "Real-time data streams", link: "/application-notes-and-design-guides" },
      { label: "Logic Engine v4", description: "Embedded automation", link: "/application-notes-and-design-guides" },
      { label: "Secure Tunnel", description: "Encrypted node access", link: "/application-notes-and-design-guides" },
      { label: "Resource Manager", description: "Compute orchestration", link: "/application-notes-and-design-guides" },
    ],
  }),
  "aws-iot.architecture": entry(adapter, "Feature1Section JSX literals", {
    heading: "The Architecture of Connectivity",
    introduction: "Core AWS components engineered for precision, security, and global scalability.",
    label: "01 // CORE_STACK",
    cards: [
      { title: "IoT Core", body: "The message broker supporting billions of devices and trillions of messages with low latency and high security.", icon: "hub", label: "Technical Specs" },
      { title: "Greengrass", body: "Bring local compute, messaging, and data caching to edge devices. Execute Lambda functions even without connectivity.", icon: "memory", label: "Edge Architecture" },
      { title: "Device Shadows", body: "Persistent digital twins for every device, allowing cloud applications to read data and set states even when devices are offline.", icon: "settings_phone", label: "State Management" },
    ],
  }),
  "aws-iot.frontiers": entry(adapter, "AWS IoT Section JSX literals", {
    heading: "Operational Frontiers",
    body: "From autonomous urban grids to heavy industrial assets, our solutions drive efficiency at scale.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWXJTiNfatuLl3uINzSaAZZd2-JQCBfSzW6oNypsKHC5UxdHifJ1M81ayf-JSVKAOSI5XYfaglF_0rp5mOLzXSL77airwq0iuiLdxhAYdT8ikmrmTo4x0zgS29QxKvTG4q0ZlPciVdTxp96EnPGT05XAlIUAMde6k279qk-l7NYCfs__L5_omxvHDjVArWUhY7AMak2mUG2oMharX_OQ7Z0xMzyIxnHb23IL2JwW56aKwt3-BThQo6BQ9pfooTxvu3_9Jnz46RG3Q" },
    mediaAlt: "A sophisticated birds-eye view of a futuristic smart city at dusk with glowing data lines.",
    callouts: [
      { title: "Smart City Infrastructure", body: "Real-time monitoring of energy grids, traffic flow, and environmental sensors for optimized urban living.", badges: ["Grid Management", "Public Safety"] },
      { title: "Predictive Maintenance", body: "Detect anomalies in industrial machinery before failures occur using advanced ML models at the edge.", badges: ["Industrial IoT", "ML Inference"], media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlcYXIttihMY3DC4lZcFM4gA08Ren4WMgGnVPCLueMQCARIgtqHKg3pukye3KygiWTfadMZUoMHiKv_9cqVHBHkpjfSRXXG2bKt_svLNpU03dCBBi_NwWlq9rKRJhLmcPu2x1og55F0ue7mhDgUWVERMGpKWfM1hkVwpfxropsaq_3FI3qcZSH45TJ9fstl1GHeuJN3z9zcEoU7S5sR7FW4HRcOcrljXT7eb3RBQC1pNKn8l651I2RqcFN9q50rhe2XLizkCFENzo" }, mediaAlt: "A detailed macro view of an industrial turbine with predictive maintenance overlays." },
    ],
  }),
  "aws-iot.technical-primacy": entry(adapter, "AWS IoT Block2Section JSX literals", {
    title: "Designed for Technical Primacy",
    body: "We don't just connect devices; we build secure, scalable systems that serve as the backbone of your digital transformation.",
    items: [
      { title: "Low Latency", body: "Edge processing ensures sub-millisecond response times for critical controls.", icon: "speed" },
      { title: "Infinite Scale", body: "Elastic cloud infrastructure that expands seamlessly from 1 to 1M+ devices.", icon: "layers" },
      { title: "End-to-End Security", body: "Automated certificate management and continuous threat monitoring.", icon: "security_update_good" },
      { title: "Data Integrity", body: "Guaranteed message delivery with QoS levels tailored to your requirements.", icon: "query_stats" },
    ],
  }),
  "aws-iot.consultation": entry(adapter, "AWS IoT Block3Section JSX literals", {
    title: "Ready to Architect Your IoT Frontier?",
    body: "Speak with our principal engineers about integrating AWS IoT into your existing manufacturing or urban operations.",
    actions: [link("Request Technical Audit", "/connectivity"), link("Contact Engineering Team", "/contact-us")],
  }),
  "aws-iot.engineering-experience": entry(adapter, "BackgroundVisualizationSection JSX literals", {
    eyebrow: "System Flow",
    heading: "The Engineering Experience",
    introduction: "Our integration patterns prioritize secure-by-design principles and streamlined data pipelines that convert raw telemetry into actionable insights.",
    nodes: [
      { id: "mutual-tls", label: "Mutual TLS Auth", description: "Every connection is encrypted and authenticated using X.509 certificates.", icon: "shield" },
      { id: "edge-cicd", label: "CI/CD for Edge", description: "Automated deployment of Greengrass components via standard DevOps workflows.", icon: "terminal" },
      { id: "analytics", label: "Real-time Analytics", description: "Native integration with Kinesis and Timestream for time-series processing.", icon: "analytics" },
      { id: "ingestion", label: "AWS IoT Core", group: "Ingestion Path" },
      { id: "target", label: "Lambda / SQS", group: "Action Target" },
    ],
    annotations: [{ label: "AWS IoT Rules Engine SQL Interface", value: "SELECT temperature, humidity FROM 'sensors/#' WHERE temperature > 25" }],
  }),
  "azure-iot.features": entry(adapter, "LargeFeatureIotCentralSection JSX literals", {
    heading: "Technical Features",
    introduction: "Deploy enterprise-grade intelligence from the silicon to the cloud with our integrated IoT stack.",
    cards: [
      { title: "Azure IoT Central", body: "The industry's most flexible application platform for connecting and managing devices at scale without infrastructure overhead.", icon: "settings_input_component" },
      { title: "Edge Analytics", body: "Offload cloud workloads to your IoT devices. Deploy AI models directly onto hardware for sub-millisecond response times in critical manufacturing environments.", icon: "analytics", items: ["REAL-TIME TELEMETRY", "OFFLINE SURVIVABILITY"] },
    ],
  }),
  "azure-iot.embedded-engineering": entry(adapter, "Azure IoT Section JSX literals", {
    heading: "Cloud-Native Embedded Engineering",
    introduction: "Bridge the gap between silicon-level performance and cloud-scale management with our engineering toolchain.",
    cards: [
      { title: "Azure RTOS", body: "Ultra-small-footprint, real-time operating system for deeply embedded devices with connectivity built into the kernel.", icon: "memory" },
      { title: "C-SDK & Plug-and-Play", body: "Standardized model-based discovery for devices. Reduce development time by abstracting hardware complexities.", icon: "terminal" },
      { title: "Sphere Security", body: "Comprehensive defense-in-depth hardware and software security tailored for high-risk industrial environments.", icon: "security" },
    ],
  }),
  "azure-iot.verticals": entry(adapter, "Azure IoT Block2Section JSX literals", {
    heading: "Vertical Specialization",
    body: "We apply our IoT framework to sectors where precision and uptime are non-negotiable.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKTUNRg1Xgfj6l_nnVUFxvLvYzTNcyBwXAEkPJ0VrsuRfBe-SiEr4kBYOk98bOugEqcUqq2IXFrSQJ1rCpR3OXnZxkPNDFabQYT0gFLNiv_rWgeT_y7SLEDG4KoaizOh-Pf-PiZIYB_j8VHxOAIIdD_mJbJu8ALVUQpxF9CYqsVNLCiWKSFE05sypd2yQXYjCyYGhxUJ8wElFHpTeDpQehd8gqzcJO8vZWh4nSKHGeilfJGK92U9EhqPZXgP9HwZuWxRG1Q9P1WCA" },
    mediaAlt: "Close-up of a high-tech robotic assembly arm in a futuristic factory.",
    bullets: [
      { title: "Manufacturing 4.0", body: "Predictive maintenance and automated line balancing." },
      { title: "Intelligent Logistics", body: "Global asset tracking and fleet optimization." },
    ],
    callouts: [
      { title: "Smart Factories", body: "Achieve OEE of 85%+ through sensor-driven AI." },
      { title: "Supply Chain", body: "End-to-end visibility for global distribution networks.", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZtf4IE7-X5vThCJ-XW_2zRuu8pE6tXFZx2MRyOjw7gnA_aSbvlFQyULeFlsz6HoDUc0wg-69eHuYT_T0miogsAJVNxIxD_GAqDXl-1tGuYTOUS5x0D3Y1lA-tFg2-r8oaxeZDhcsJstejiQL9Yctxo2TNaIoXN5ZgMVq8NUmjRk-hM31tNfcN_EgQTyORRAlxvlHPkNJNFgXlt-JDqCLMMRAA10HrzJh_5B-9QqnqQnMi3lOxbztkj4kKu1OimM56JjJgdqL64tU" }, mediaAlt: "A wide angle aerial shot of an automated shipping port at dusk." },
    ],
  }),
  "azure-iot.integration": entry(adapter, "Azure IoT Block3Section JSX literals", {
    title: "Seamless Ecosystem Integration",
    body: "Leverage the power of Microsoft Azure. Connect your IoT data to Power BI for visualization, Azure Synapse for analytics, and Microsoft 365 for operational collaboration.",
    actions: [link("Launch Your Matrix", "/azure-iot")],
  }),
  "azure-iot.digital-twins": entry(adapter, "TechnicalCalloutOverlaySection JSX literals", {
    eyebrow: "The System Logic",
    heading: "Azure Digital Twins: The Mapping of Reality.",
    body: "Create digital replicas of entire environments—not just devices. Model the relationships and interactions between people, places, and things to gain deeper insights into operational efficiency.",
    media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJAHEsGZW1Gz_FsMaY8pKhsqQMK3ablI820KI7gz9NwVi-CAGaTMLJGygbufX28_kMgpSDcpQzZqYA92iY0kG96zAvirvcTdjzbc9MtSuAUQ_N9vCFPVpomY9YYUAHk37RYByPUDuutwHiEGUTiHKZ9w1WwGoxSaBzC3Wmdmpnef4JGs3hy12CHU5Iav5Xd7lJuzDpqYdnKHT8jgHKwRsJOm9BaykuhKIyIq-Y2ynS5My2i6x0B7b9qVmdKgWQgwawWuft5Sx_hsA" },
    mediaAlt: "A technical 3D architectural diagram of a digital twin environment showing a robotic factory floor.",
    bullets: [
      { title: "Spatial Intelligence", body: "Dynamic topology mapping of industrial assets across global sites.", icon: "schema" },
      { title: "Live Data Feed", body: "Zero-latency state updates via IoT Hub and event-driven architectures.", icon: "rebase_edit" },
    ],
    callouts: [{ title: "Asset Synchronization", body: "Continuous state monitoring between physical assets and digital replicas with 99.9% consistency." }],
  }),
};

