export const HERO_ASSETS = {
  engineering: "/images/heroes/embedded-engineering-workbench-hero.webp",
  productDevelopment: "/images/heroes/product-development-prototype-hero.webp",
  firmwareDevelopment: "/images/heroes/embedded-firmware-debugging-hero.webp",
  connectivity: "/images/heroes/industrial-connectivity-network-hero.webp",
  controller: "/images/heroes/embedded-controller-hardware-hero.webp",
  automation: "/images/heroes/industrial-automation-engineer-hero.webp",
  energy: "/images/heroes/clean-energy-storage-grid-hero.webp",
  evTransit: "/images/heroes/ev-transit-charging-hero.webp",
  edgeComputing: "/images/heroes/edge-computing-data-center-hero.webp",
  fieldMonitoring: "/images/heroes/field-infrastructure-monitoring-hero.webp",
  telecom: "/images/heroes/telecom-connectivity-engineer-hero.webp",
  knowledge: "/images/heroes/engineering-knowledge-resources-hero.webp",
} as const;

const HERO_GROUPS = {
  connectivity: new Set([
    "connectivity",
    "industrial-communication",
    "industrial-iot-solutions",
    "iot",
    "remote-monitoring",
    "wireless-sensor-network",
    "industrial-protocols",
    "mqtt",
    "snmp-alarm-gateway",
    "azure-iot",
    "aws-iot",
  ]),
  controller: new Set([
    "technologies",
    "32-bit-controller",
    "rtos",
    "freertos",
    "embedded-linux",
    "esp32",
    "stm32",
    "microchip",
    "nordic",
    "nxp",
    "renesas",
    "texas-instruments",
    "battery-management-system",
  ]),
  automation: new Set([
    "industrial-automation",
    "industrial-controller",
    "manufacturing",
    "building-automation",
    "embedded-measurement-system",
    "nanolithography-cluster-control",
  ]),
  energy: new Set([
    "energy-management",
    "energy-monitoring",
    "battery-energy-storage",
    "renewable-energy",
    "atacama-solar-reserve",
    "smart-grid",
    "earth-resistance-monitoring",
  ]),
  evTransit: new Set([
    "ev-charger-electronics",
    "ev-infrastructure",
    "metropolis-ev-transit",
  ]),
  edgeComputing: new Set([
    "ai-enabled-engineering",
    "cognitive-core-os",
    "quantum-ready-data-architecture",
    "the-future-of-deterministic-edge-computing",
    "hyperloop-beta",
  ]),
  fieldMonitoring: new Set([
    "environmental-monitoring",
    "pipeline-monitoring",
    "oil-and-gas",
    "smart-infrastructure",
  ]),
  telecom: new Set(["telecom"]),
  knowledge: new Set([
    "application-notes-and-design-guides",
    "engineering-whitepapers",
    "technical-knowledge-base",
    "technical-downloads-and-sdks",
    "insights-and-engineering-blog",
    "resources-and-blog",
    "case-studies",
    "faq",
    "terms-and-conditions",
    "privacy-policy",
  ]),
} as const;

const HERO_ALTS: Record<keyof typeof HERO_ASSETS, string> = {
  engineering: "Embedded systems engineer validating a custom controller at a laboratory bench.",
  productDevelopment: "Engineering team integrating a custom circuit board into an industrial product prototype.",
  firmwareDevelopment: "Embedded firmware engineer debugging an industrial controller with laboratory instruments.",
  connectivity: "Rugged industrial gateway and sensor network installed in a process facility.",
  controller: "Industrial embedded controller board with microcontroller and test hardware.",
  automation: "Controls engineer inspecting an automated manufacturing cell.",
  energy: "Grid-scale battery storage, solar generation, and electrical substation infrastructure.",
  evTransit: "Electric transit bus connected to a high-power charging system.",
  edgeComputing: "Engineer maintaining rugged edge-computing infrastructure in a data center.",
  fieldMonitoring: "Field engineer installing monitoring equipment beside critical infrastructure.",
  telecom: "Telecommunications engineer servicing tower-side network equipment.",
  knowledge: "Engineer reviewing technical schematics beside embedded prototype hardware.",
};

const ROUTE_HERO_OVERRIDES: Record<string, keyof typeof HERO_ASSETS> = {
  "product-development": "productDevelopment",
  "embedded-firmware-development": "firmwareDevelopment",
};

export function getHeroAsset(slug: string): { image: string; imageAlt: string } {
  const routeOverride = ROUTE_HERO_OVERRIDES[slug];
  const group = (Object.keys(HERO_GROUPS) as Array<keyof typeof HERO_GROUPS>).find((key) =>
    HERO_GROUPS[key].has(slug)
  );
  const resolvedGroup: keyof typeof HERO_ASSETS = routeOverride ?? group ?? "engineering";

  return {
    image: HERO_ASSETS[resolvedGroup],
    imageAlt: HERO_ALTS[resolvedGroup],
  };
}
