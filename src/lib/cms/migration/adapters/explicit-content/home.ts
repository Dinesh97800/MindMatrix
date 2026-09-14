import { HERO_ASSETS } from "@/config/hero-images";
import { siteContent } from "@/config/site-content";
import { entry, type ExplicitContentMap } from "./types";

const adapter = "src/lib/cms/migration/adapters/explicit-content/home.ts";

export const homeExplicitContent: ExplicitContentMap = {
  "home.hero-with-metrics": entry(adapter, "StatsGridSection JSX plus siteContent.hero and HERO_ASSETS.engineering", {
    eyebrow: siteContent.hero.eyebrow,
    title: siteContent.hero.headlineLines.join("\n"),
    summary: siteContent.hero.subheading,
    supportingText: siteContent.hero.technologyLine,
    media: { source: HERO_ASSETS.engineering },
    mediaAlt: "Embedded controller prototype PCB with microcontroller, connectors, and test points on a bench setup.",
    actions: [siteContent.hero.primaryCta, siteContent.hero.secondaryCta],
    metrics: [
      { value: "18+ Years", label: "Industry Experience" },
      { value: "IoT", label: "Firmware, Hardware + Communication" },
      { value: "India-Based", label: "Engineering Consultancy" },
    ],
  }),
  "home.services": entry(adapter, "Service1Section serviceCards and siteContent.intro", {
    heading: "Core Engineering Services",
    introduction: siteContent.intro,
    actions: [{ label: "View All Services", href: "/services" }],
    cards: [
      { title: "Embedded Firmware", body: "Bare-metal and RTOS firmware, peripheral drivers, secure bootloaders, diagnostics, and configuration storage.", icon: "terminal", link: { label: "Learn more", href: "/embedded-firmware-development" } },
      { title: "Hardware & Integration", body: "Hardware-firmware integration, prototype bring-up, measurement interfaces, and bench validation.", icon: "developer_board", link: { label: "Learn more", href: "/hardware-development" } },
      { title: "Industrial IoT", body: "Gateway firmware, edge data collection, protocol integration, and remote monitoring for connected industrial products.", icon: "hub", link: { label: "Learn more", href: "/iot" } },
      { title: "Edge AI", body: "Edge AI and intelligent embedded-system development where appropriate to the application.", icon: "psychology", link: { label: "Learn more", href: "/ai-enabled-engineering" } },
      { title: "Industrial Communication", body: "Ethernet, TCP/IP stack, L2 switch, SNMP V2 and V3, plus CAN, Modbus, RS-485, UART, SPI, I²C, and MQTT integration.", icon: "router", link: { label: "Learn more", href: "/industrial-communication" } },
      { title: "Engineering Consultation", body: "Requirement analysis, architecture review, debugging, redesign, and long-term engineering support.", icon: "engineering", link: { label: "Learn more", href: "/engineering-consulting" } },
    ],
  }),
  "home.lifecycle": entry(adapter, "ProgressLineSection JSX literals", {
    heading: "The Engineering Lifecycle",
    introduction: "A rigorous, phase-gate development process designed for industrial reliability.",
    steps: [
      { title: "Discover", body: "Requirement analysis & feasibility." },
      { title: "Architecture", body: "System design & component selection." },
      { title: "Hardware", body: "Schematic & PCB layout." },
      { title: "Firmware", body: "Software development & RTOS." },
      { title: "Prototype", body: "Alpha/Beta units fabrication." },
      { title: "Testing", body: "EMI/EMC & validation." },
      { title: "Manufacturing", body: "Volume production & QC." },
      { title: "Support", body: "Maintenance & lifecycle mgmt." },
    ],
  }),
  "home.industries": entry(adapter, "Home Section JSX literals", {
    heading: "Industries & Applications",
    introduction: "We focus on industrial control, power electronics, telecom power, energy monitoring, remote monitoring, instrumentation, and embedded communication products.",
    actions: [{ label: "Explore Industries", href: "/industries" }],
    cards: [
      { title: "Industrial Control", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBZq4GN3WQREFqU2ATVDe-qUec7qxUkeFA5DqK9YgK7QsJUI-FxR6nrFhHP3kkH2HH04HvQhzD_n3Lc1XU-j6rmi21kLY7-swMfyO007nXjfNtJ1i7ZYSA5KleHJF6Fx9dEk8IbJiR-tSz1AQTxcMZ5scAHCyBpjcjTw2ESoLoeiX54E9bH8QACihKngPtzUzQ-ki0Jt_HRFKFHzOWJ50v4L_C3wPhWK72HTtiKuZj6lAHe4BiodztwrF8NbjPb9-4jjmYJ33YAsw" }, mediaAlt: "A futuristic renewable energy farm with solar panels and wind turbines under a clear blue sky." },
      { title: "Energy Monitoring", media: { source: "/Midnight-Network-Operations-Center.webp" }, mediaAlt: "Close up of a smart grid digital interface showing electricity flow through a city at night." },
      { title: "Telecom Power", media: { source: "/telecom-power.png" }, mediaAlt: "Electric vehicle charging station infrastructure at a high-tech corporate campus." },
      { title: "Remote Monitoring", media: { source: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwpF5yxuwVdTrJHAX8kvF2MYRppl6vaT15EM7NxLB_3668VBmA0gRMeI8g6XaQwROaPjcoAI_Mb2QgPT_hYetTuk7NoGylwr91_YPxqDvO2b6tLK7dlhII0I9EyOGtYEXcgfhDUQT-ZbvTL9J6kY1SZxnxZIbop9LZKX2G6YCO3iNFz4LET6hyqsgMZga-xNZ2djcCwcitBpOy-5e60YKkDmHvnFA7PuUiNnb3m7pQLQBRl1DNKJ1BSNZ4Ugw9FdpFyj1lbqwAz_E" }, mediaAlt: "An automated industrial production line with robotic arms assembling electronics." },
    ],
  }),
  "home.technology-marquee": entry(adapter, "RepeatedLogosForContinuousLoopSection logos constant", {
    items: ["32-BIT MCU", "NORDIC", "AWS IoT", "ESPRESSIF", "RTOS", "ZEPHYR", "ARM", "NXP"].map((label) => ({ label })),
  }),
};

