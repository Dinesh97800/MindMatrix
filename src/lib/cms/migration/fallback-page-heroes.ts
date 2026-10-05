import { HERO_ASSETS } from "@/config/hero-images";
import { siteContent } from "@/config/site-content";
import { getHeroAsset } from "@/config/hero-images";

export type FallbackHeroSpec = {
  source: string;
  variant: "split" | "background";
  eyebrow?: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaUrl?: string;
};

/** Hero content for pages without hero-pages.ts entries (extracted from legacy components). */
export const FALLBACK_PAGE_HEROES: Record<string, FallbackHeroSpec> = {
  "ai-enabled-engineering": {
    source: "AnimatedShaderBackgroundSection.tsx",
    variant: "split",
    eyebrow: "AI-Driven Product Engineering",
    title: "Edge AI and Intelligent\nEngineering Solutions",
    description:
      "We combine AI with embedded systems, sensors, IoT, industrial data, and customer knowledge to build practical intelligent products and automation solutions.",
    imageUrl: HERO_ASSETS.edgeComputing,
    imageAlt:
      "Industrial engineering workspace with embedded systems and sensor hardware used for edge AI development.",
    ctaText: "Discuss Your Application",
    ctaUrl: "/request-consultation",
  },
  "contact-us": {
    source: "ContactUsPageContent.tsx",
    variant: "split",
    eyebrow: "Contact",
    title: "Contact Us",
    description: siteContent.contactCta,
    imageUrl: getHeroAsset("contact-us").image,
    imageAlt: getHeroAsset("contact-us").imageAlt,
    ctaText: "Engineering Consultation",
    ctaUrl: "/contact-us-and-engineering-consultation",
  },
  "request-consultation": {
    source: "LeftColumnHighTrustContentSection.tsx",
    variant: "split",
    eyebrow: "Engineering Consultation",
    title: "Discuss Your Embedded Product Requirement",
    description: siteContent.contactCta,
    imageUrl: getHeroAsset("request-consultation").image,
    imageAlt: getHeroAsset("request-consultation").imageAlt,
  },
  renesas: {
    source: "DecorativeTechnicalLinesSection.tsx",
    variant: "split",
    eyebrow: "Industrial Precision",
    title: "Reliability Engineered.\nFuture Secured.",
    description:
      "Harnessing the technical authority of Renesas RX, RA, and RL78 architectures to deliver high-stakes industrial control systems with absolute functional safety.",
    imageUrl: getHeroAsset("renesas").image,
    imageAlt: getHeroAsset("renesas").imageAlt,
    ctaText: "Technical Specs",
    ctaUrl: "/industrial-automation",
  },
  "resources-and-blog": {
    source: "FeaturedArticleCardAsymmetricLayoutSection.tsx",
    variant: "split",
    eyebrow: "Featured Perspective",
    title: "Engineering Intelligence for the Modern Industrial Frontier.",
    description:
      "Discover how the latest advancements in LLMs are reshaping predictive maintenance and factory throughput efficiency.",
    imageUrl: getHeroAsset("resources-and-blog").image,
    imageAlt: getHeroAsset("resources-and-blog").imageAlt,
  },
  "privacy-policy": {
    source: "SideNavigationSection.tsx",
    variant: "split",
    title: "Privacy Policy",
    description: `This policy describes how ${siteContent.legalName} handles information collected through this website and related enquiry channels.`,
    imageUrl: getHeroAsset("privacy-policy").image,
    imageAlt: getHeroAsset("privacy-policy").imageAlt,
  },
  solutions: {
    source: "solutions/page.tsx metadata",
    variant: "background",
    title: "Industrial Solutions",
    description:
      "Mind Matrix Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
    imageUrl: getHeroAsset("solutions").image,
    imageAlt: getHeroAsset("solutions").imageAlt,
    ctaText: "Discuss Your Requirement",
    ctaUrl: "/contact-us-and-engineering-consultation",
  },
  "insights-and-engineering-blog": {
    source: "insights-and-engineering-blog/page.tsx metadata",
    variant: "background",
    title: "Insights & Engineering Blog",
    description:
      "Mind Matrix Insights & Engineering Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
    imageUrl: getHeroAsset("insights-and-engineering-blog").image,
    imageAlt: getHeroAsset("insights-and-engineering-blog").imageAlt,
  },
  "nanolithography-cluster-control": {
    source: "nanolithography-cluster-control/page.tsx metadata",
    variant: "background",
    title: "Nanolithography Cluster Control",
    description:
      "Mind Matrix Nanolithography Cluster Control — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
    imageUrl: getHeroAsset("nanolithography-cluster-control").image,
    imageAlt: getHeroAsset("nanolithography-cluster-control").imageAlt,
  },
};

/** Route metadata from page.tsx where PAGE_SEO has no entry. */
export const ROUTE_METADATA_FALLBACK: Record<string, { title: string; description: string }> = {
  solutions: {
    title: "Solutions",
    description:
      "Mind Matrix Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  },
  stm32: {
    title: "32-bit Controller & Processor",
    description:
      "Mind Matrix 32-bit controller and processor development — firmware, peripheral drivers, RTOS integration, communication stacks, and prototype bring-up.",
  },
  "industrial-iot-gateway": {
    title: "Industrial IoT Gateway",
    description:
      "Mind Matrix Industrial IoT Gateway — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  },
  "insights-and-engineering-blog": {
    title: "Insights & Engineering Blog",
    description:
      "Mind Matrix Insights & Engineering Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  },
  "resources-and-blog": {
    title: "Resources & Blog",
    description:
      "Mind Matrix Resources & Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "Mind Matrix Privacy Policy — how we handle information collected through this website and related enquiry channels.",
  },
  "nanolithography-cluster-control": {
    title: "Nanolithography Cluster Control",
    description:
      "Mind Matrix Nanolithography Cluster Control — industrial-grade embedded engineering for mission-critical systems.",
  },
};

/** Pages that reuse ApprovedPageLayout content from another slug. */
export const PAGE_CONTENT_ALIASES: Record<string, string> = {
  stm32: "32-bit-controller",
  "industrial-iot-gateway": "iot",
};

export function getFallbackHero(slug: string): FallbackHeroSpec | null {
  return FALLBACK_PAGE_HEROES[slug] ?? null;
}

export function getRouteMetadataFallback(slug: string): { title: string; description: string } | null {
  return ROUTE_METADATA_FALLBACK[slug] ?? null;
}

export function getPageContentAlias(slug: string): string | null {
  return PAGE_CONTENT_ALIASES[slug] ?? null;
}
