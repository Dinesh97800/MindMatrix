import type { BackgroundImageHeroOverlay } from "@/components/sections/hero";
import type { HeroTone } from "@/components/sections/hero/hero-foundation";

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
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Lc9ek2leanWwsnuRipJWXMkKpeEomytTsKi2PmjiHjwcqZxRZZBc3hpFzZbkxg6nZoxtarHI-Oxh7sxD4jjdbyG65FO4sLfKo5HukLyU_56vyQWcBTVVXbPrz8Lp1mU0ukUC2OhIrZRlcvlQvDR-dIe5jp15vZYR2CgeujidebRP4FboY0JwmNOmJEIaHEiKDDRiTl9KMcJmKAyszHz8G3KSh6mNGGKneBYG1v4E2PAFcb90mDHjEgSoa49RN1-pI81RN7LjaMc";

export const DEFAULT_HERO_IMAGE_ALT =
  "Embedded controller prototype PCB with microcontroller, connectors, and test points on a bench setup.";

export const HERO_IMAGES = {
  aiEngineering:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCU6toPdDiRj4bpPQWDel9oYIFDfPQEhfxI56-c0oXuqhdtyeyG6GMScPkpb-n8hF4jb_LKzE32SV3jHMur7FD9xloxAiSocb8za8DTPm2qj6KpNYH_UYcZRoHFl04hvpnbf7kice5MJKHfTMgGO5c6vzFu5OONCXzBbDFSMMsvsTxx1FHYYcxASko0Mt8rU8Ziy-9A3rPPvYSGybpFRQhXEKpHTKwZi4fFscX_lxK0v0jiPKkoezTDzipHyUgYr9CENSQim_8Qpzw",
  aboutBench:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYmbMYrtbaUv9ure55r9yaOGB5FXHvEu74Sawbv3_UmbkKSpNgUu16TwZzLUJSYZ-BSZdlsP4noc5bVN_FtSDZqD1LIgTelZFdWLlzN3PiZmOzBjfETNR5an8rTp2pJkQnIW3IRp3ffPh0tW78zD1dFJhFAxTNESDto_1FOx-fT_Jno38FecoHsisPGrFuS8sUCjFL9JJSuJK2CNVq8PIuo92a7mGZxeY6ZLQ1IN4Rt_SRawAuoO5UqJAUfgMggMOgdD8OK4AqyYk",
  firmwarePcb:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCyOe3i5ZFvxdB7WlJb3GT0AdZIAbeYpyijLRo15n_mBwFSJgZxOROGvuCmzCLZ7xAHMILFM9pzG3je5CgjlAQ_mrHazu9aGxTm1Ses3HUnMDc36uYb5uWu9bGw8PiD8fe748gzmK5lGX9tSwE7KB9lWEgr82RiOLAgovekpmNTAn9WZQ09UEUUe3F6D4UdHnmzNT_eJCR9bGFszSpn_QmsOSUwFLMDr758ixxt2SulEmL8FBO6DrJaKvwgFfj-c5vnlx6JrFWbdOE",
  telecomTower:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Pe2bSmh3jAdNwPH9q-8SE0vmLQd571o8fYK9tl2V6gfDY1CshdNZwxnPpHCtcQtzNM9ZcV63h47wvJfmBBeiYvZZZWAEcXp0D8doWoUK6WQqtXvQNAjpxAcyZT_WyAHY7kd-ZSsTzq0mHcSUeicHpIRis5bfklDSCpk8BW3lc-OC8Jg2JbQct3IvBqnR9G_zZDQCkS7I5Yo_eY9R4FF7Xq3_pf33URfpKp6EGLCdzkdSqKW4JZlEs_o_YnHSgl-KE4fsvjn01jM",
  dataCenter:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3UbsXUr8A_HbdfY5WLtPwJWvIo4U5M8LtJ7KCUeAUqLbeqXtZtmFc-ARE-JjEYQSpuZbqe71V5-9kWoXP21_G10yJy00ZQYrK6hJGm4C49S1M93-liHUK-ogeIE44j2vnsdcw2XoAIX4HFaRTHoQXWRCNrIqMd61NeszDHLB2ADEWHstI_y4xRfTD4-sTuLAsi7MFVHIuUheolPVngrPl0yydShgwNWYpPqQST72LdBEHlGP9TYO62hkeo8P3K3borOSwqjgNFzk",
  solarFarm:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9aqjKWhMRG2fMOM-0dvPpFJMHD4NFqgNh61hccyDISpjQR5VwFZzIHjYtl3ifJrqBAaPNggsyibnYnErSQ6oZLe230ivZWFgH0su2MNcj19B4M2SZf7hPmGbAoZXOUjbLMFFxmZN4UTEHC4YUIvpHGXFaPzo7pgEJdanYpI2Ok4Q1DdXOtlG_-WGECAU",
  offshoreOil:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCMnWGL3qzCNcS_T_zS8JH8xVc_Y80D8crAbNLt8SuXyLynDgd8Q9Nm0s5VqLWYuIntklqms0j8hltV381fxFLIiL773GLptImTFQmYmY3uUZTOshMo4Y16Oc6Ct5cFbNoI3s-qlOjwPfaW9Q7H9dWe0MgAW4zqkUtntAjP9XfLekoC6DcRRwFHgnSPpBh-fyuEnIS-cC9V8MKWaUNxyfr-PH6Nv",
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
  "engineering-consulting": split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT),
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
  return (
    heroVisualBySlug[slug] ??
    split(DEFAULT_HERO_IMAGE, DEFAULT_HERO_IMAGE_ALT)
  );
}
