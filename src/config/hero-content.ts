import type { BackgroundImageHeroOverlay } from "@/components/sections/hero";
import type { HeroTone } from "@/components/sections/hero/hero-foundation";
import { getHeroAsset, HERO_ASSETS } from "@/config/hero-images";

export type HeroVariant = "split" | "background";

export interface HeroVisualConfig {
  variant: HeroVariant;
  image: string;
  imageAlt: string;
  overlay?: BackgroundImageHeroOverlay;
  tone?: HeroTone;
}

/** Default embedded-engineering imagery used when a page has no dedicated hero asset. */
export const DEFAULT_HERO_IMAGE =
  HERO_ASSETS.engineering;

export const DEFAULT_HERO_IMAGE_ALT =
  "Embedded controller prototype PCB with microcontroller, connectors, and test points on a bench setup.";

export const HERO_IMAGES = {
  aiEngineering: HERO_ASSETS.edgeComputing,
  aboutBench: HERO_ASSETS.engineering,
  firmwarePcb: HERO_ASSETS.controller,
  telecomTower: HERO_ASSETS.telecom,
  dataCenter: HERO_ASSETS.edgeComputing,
  solarFarm: HERO_ASSETS.energy,
  offshoreOil: HERO_ASSETS.fieldMonitoring,
} as const;

const split = (image: string, imageAlt: string, tone: HeroTone = "dark"): HeroVisualConfig => ({
  variant: "split",
  image,
  imageAlt,
  tone,
});

const background = (
  image: string,
  imageAlt: string,
  overlay: BackgroundImageHeroOverlay = "gradient-left-light",
  tone: HeroTone = "light"
): HeroVisualConfig => ({
  variant: "background",
  image,
  imageAlt,
  overlay,
  tone,
});

/** Per-route hero visual defaults. Content (eyebrow/title/description) comes from page-content or page HeroSection. */
export const heroVisualBySlug: Record<string, HeroVisualConfig> = {
  // Index / approved layout pages
  industries: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  technologies: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  // "engineering-consulting": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "engineering-consulting": background(HERO_IMAGES.aboutBench, "Engineering the Digital Frontier", "gradient-left-light"),
  "engineering-process": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "embedded-firmware-development": background(HERO_IMAGES.firmwarePcb, "High-performance PCB with embedded firmware traces.", "gradient-left-light"),
  "hardware-development": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "product-development": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "industrial-communication": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "embedded-measurement-system": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  manufacturing: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "industrial-automation": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "ev-charger-electronics": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  telecom: background(HERO_IMAGES.telecomTower, "Telecom infrastructure tower at dusk.", "gradient-left-light"),
  "energy-monitoring": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "remote-monitoring": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  iot: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "snmp-alarm-gateway": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "32-bit-controller": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  rtos: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "industrial-protocols": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  mqtt: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "embedded-linux": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  faq: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),

  // Custom hero pages
  "about-us": background(HERO_IMAGES.aboutBench, "Engineering bench with embedded prototype hardware under test."),
  services: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  connectivity: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  careers: background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "case-studies": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "contact-us-and-engineering-consultation": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "cognitive-core-os": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "quantum-ready-data-architecture": background(HERO_IMAGES.offshoreOil, "Industrial infrastructure with secure data network overlay.", "gradient-left-dark", "dark"),
  "environmental-monitoring": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "earth-resistance-monitoring": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "energy-management": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  esp32: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  microchip: split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  nordic: background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "building-automation": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "battery-energy-storage": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "atacama-solar-reserve": background(HERO_IMAGES.solarFarm, "Large-scale solar array in the Atacama Desert.", "dark", "dark"),
  "hyperloop-beta": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "gradient-left-dark", "dark"),
  "metropolis-ev-transit": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "texas-instruments": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "technical-downloads-and-sdks": background(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
  "technical-knowledge-base": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "engineering-whitepapers": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "application-notes-and-design-guides": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "insights-and-engineering-blog": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "terms-and-conditions": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT, "light"),
  "the-future-of-deterministic-edge-computing": background(HERO_IMAGES.dataCenter, "Industrial data center with technical lighting.", "gradient-left-dark", "dark"),
};

export function getHeroVisual(slug: string): HeroVisualConfig {
  const visual = (
    heroVisualBySlug[slug] ??
    split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT)
  );
  return { ...visual, ...getHeroAsset(slug) };
}
