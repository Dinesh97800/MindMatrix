import { getHeroPageConfig } from "@/config/hero-pages";
import { HERO_ASSETS } from "@/config/hero-images";
import { companyContact } from "@/config/company";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { siteContent } from "@/config/site-content";
import { caseStudies, caseStudyConfidentialityNote } from "@/data/case-studies";
import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_TOC,
  TERMS_SECTIONS,
} from "@/lib/cms/migration/data/legal-content";
type BaseContent = {
  componentKey?: string;
  sourceFile?: string;
  title?: string;
  description?: string;
  strings?: string[];
  items?: unknown[];
  cards?: unknown[];
  images?: string[];
  links?: Array<{ label: string; href: string }>;
};

function hasMeaningfulContent(data: Record<string, unknown>): boolean {
  const textFields = ["title", "description", "eyebrow", "supportingText"] as const;
  if (textFields.some((key) => typeof data[key] === "string" && String(data[key]).trim().length > 0)) {
    return true;
  }
  for (const key of ["items", "cards", "stats", "strings", "links", "images", "faqs", "studies", "sections"] as const) {
    if (Array.isArray(data[key]) && data[key].length > 0) return true;
  }
  if (data.cta && typeof data.cta === "object") return true;
  if (data.content && typeof data.content === "object") return true;
  return false;
}

const HOME_SERVICE_CARDS = [
  {
    title: "Embedded Firmware",
    description:
      "Bare-metal and RTOS firmware, peripheral drivers, secure bootloaders, diagnostics, and configuration storage.",
    icon: "terminal",
    href: "/embedded-firmware-development",
  },
  {
    title: "Hardware & Integration",
    description:
      "Hardware-firmware integration, prototype bring-up, measurement interfaces, and bench validation.",
    icon: "developer_board",
    href: "/hardware-development",
  },
  {
    title: "Industrial IoT",
    description:
      "Gateway firmware, edge data collection, protocol integration, and remote monitoring for connected industrial products.",
    icon: "hub",
    href: "/iot",
  },
  {
    title: "Edge AI",
    description:
      "Edge AI and intelligent embedded-system development where appropriate to the application.",
    icon: "psychology",
    href: "/ai-enabled-engineering",
  },
  {
    title: "Industrial Communication",
    description:
      "Ethernet, TCP/IP stack, L2 switch, SNMP V2 and V3, plus CAN, Modbus, RS-485, UART, SPI, I²C, and MQTT integration.",
    icon: "router",
    href: "/industrial-communication",
  },
  {
    title: "Engineering Consultation",
    description:
      "Requirement analysis, architecture review, debugging, redesign, and long-term engineering support.",
    icon: "engineering",
    href: "/engineering-consulting",
  },
];

const HOME_INDUSTRY_TILES = [
  {
    title: "Industrial Control",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBZq4GN3WQREFqU2ATVDe-qUec7qxUkeFA5DqK9YgK7QsJUI-FxR6nrFhHP3kkH2HH04HvQhzD_n3Lc1XU-j6rmi21kLY7-swMfyO007nXjfNtJ1i7ZYSA5KleHJF6Fx9dEk8IbJiR-tSz1AQTxcMZ5scAHCyBpjcjTw2ESoLoeiX54E9bH8QACihKngPtzUzQ-ki0Jt_HRFKFHzOWJ50v4L_C3wPhWK72HTtiKuZj6lAHe4BiodztwrF8NbjPb9-4jjmYJ33YAsw",
    alt: "Renewable energy farm with solar panels and wind turbines.",
  },
  {
    title: "Energy Monitoring",
    image: "/Midnight-Network-Operations-Center.webp",
    alt: "Smart grid digital interface showing electricity flow through a city at night.",
  },
  {
    title: "Telecom Power",
    image: "/telecom-power.png",
    alt: "Electric vehicle charging station infrastructure at a high-tech corporate campus.",
  },
  {
    title: "Remote Monitoring",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwpF5yxuwVdTrJHAX8kvF2MYRppl6vaT15EM7NxLB_3668VBmA0gRMeI8g6XaQwROaPjcoAI_Mb2QgPT_hYetTuk7NoGylwr91_YPxqDvO2b6tLK7dlhII0I9EyOGtYEXcgfhDUQT-ZbvTL9J6kY1SZxnxZIbop9LZKX2G6YCO3iNFz4LET6hyqsgMZga-xNZ2djcCwcitBpOy-5e60YKkDmHvnFA7PuUiNnb3m7pQLQBRl1DNKJ1BSNZ4Ugw9FdpFyj1lbqwAz_E",
    alt: "Automated industrial production line with robotic arms assembling electronics.",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Requirement analysis & feasibility." },
  { step: "02", title: "Architecture", description: "System design & component selection." },
  { step: "03", title: "Hardware", description: "Schematic & PCB layout." },
  { step: "04", title: "Firmware", description: "Software development & RTOS." },
  { step: "05", title: "Prototype", description: "Alpha/Beta units fabrication." },
  { step: "06", title: "Testing", description: "EMI/EMC & validation." },
  { step: "07", title: "Manufacturing", description: "Volume production & QC." },
  { step: "08", title: "Support", description: "Maintenance & lifecycle mgmt." },
];

function heroFromSlug(slug: string) {
  const config = getHeroPageConfig(slug);
  if (!config) return null;
  return {
    eyebrow: config.eyebrow ?? "",
    title: config.titleLines?.join("\n") ?? config.title ?? "",
    description: config.description ?? "",
    imageUrl: config.image ?? "",
    imageAlt: config.imageAlt ?? "",
    ctaText: config.ctas?.[0]?.label ?? "",
    ctaUrl: config.ctas?.[0]?.href ?? "",
  };
}

function legalSectionsToBlocks(
  sections: ReadonlyArray<{
    heading: string;
    paragraphs?: readonly string[];
    bullets?: readonly string[];
    [key: string]: unknown;
  }>
) {
  return sections.map((section) => ({
    ...section,
    heading: section.heading,
    paragraphs: [...(section.paragraphs ?? [])],
    bullets: [...(section.bullets ?? [])],
  }));
}

/** Apply config-backed content for known legacy section components. */
export function enrichSectionContent(
  slug: string,
  componentKey: string,
  base: Partial<BaseContent> | undefined
): Record<string, unknown> {
  const merged: Record<string, unknown> = {
    componentKey,
    sourceFile: base?.sourceFile ?? "",
    sourceComponent: componentKey,
    title: base?.title ?? "",
    description: base?.description ?? "",
    strings: base?.strings ?? [],
    items: base?.items ?? [],
    cards: base?.cards ?? [],
    images: base?.images ?? [],
    links: base?.links ?? [],
    lockedLayout: true,
  };

  if (slug === "home" && componentKey === "StatsGridSection") {
    return {
      ...merged,
      eyebrow: siteContent.hero.eyebrow,
      title: siteContent.hero.headlineLines.join("\n"),
      description: siteContent.hero.subheading,
      supportingText: siteContent.hero.technologyLine,
      stats: [
        { value: "18+ Years", label: "Industry Experience" },
        { value: "IoT", label: "Firmware, Hardware + Communication" },
        { value: "India-Based", label: "Engineering Consultancy" },
      ],
      cta: {
        primary: siteContent.hero.primaryCta,
        secondary: siteContent.hero.secondaryCta,
      },
      images: [HERO_ASSETS.engineering],
    };
  }

  if (slug === "home" && componentKey === "Service1Section") {
    return {
      ...merged,
      title: "Core Engineering Services",
      description: siteContent.intro,
      cards: HOME_SERVICE_CARDS,
      links: [{ label: "View All Services", href: "/services" }],
    };
  }

  if (componentKey === "WhyChooseUsSection") {
    return {
      ...merged,
      eyebrow: "Why Work With Us",
      title: "Senior-Led Embedded Product Engineering",
      description: siteContent.locationStatement,
      cards: siteContent.whyChooseUs,
    };
  }

  if (slug === "home" && componentKey === "Section") {
    return {
      ...merged,
      title: "Industries & Applications",
      description:
        "We focus on industrial control, power electronics, telecom power, energy monitoring, remote monitoring, instrumentation, and embedded communication products.",
      cards: HOME_INDUSTRY_TILES,
      links: [{ label: "Explore Industries", href: "/industries" }],
    };
  }

  if (slug === "home" && componentKey === "ProgressLineSection") {
    return {
      ...merged,
      title: "The Engineering Lifecycle",
      description: "A rigorous, phase-gate development process designed for industrial reliability.",
      items: PROCESS_STEPS,
    };
  }

  if (slug === "home" && componentKey === "RepeatedLogosForContinuousLoopSection") {
    return {
      ...merged,
      items: ["32-BIT MCU", "NORDIC", "AWS IoT", "ESPRESSIF", "RTOS", "ZEPHYR", "ARM", "NXP"],
    };
  }

  if (slug === "home" && componentKey === "AiSolutionsHighlightSection") {
    return {
      ...merged,
      eyebrow: "Secondary Capability",
      title: "AI-Assisted Engineering Where Appropriate",
      description: siteContent.aiSecondaryStatement,
      supportingText:
        "Our primary focus remains embedded hardware, firmware, industrial communication, monitoring, control, and hands-on product engineering.",
      cards: [
        {
          title: "Primary Technology Focus",
          description: siteContent.hero.technologyLine,
          href: "/technologies",
          ctaLabel: "Explore Technologies",
        },
      ],
    };
  }

  if (componentKey === "Block2Section" && slug === "home") {
    return {
      ...merged,
      title: "Start an Engineering Discussion",
      description: siteContent.contactCta,
      cta: {
        primary: { label: "Discuss Your Requirement", href: "/contact-us-and-engineering-consultation" },
        secondary: { label: "View Project Experience", href: "/case-studies" },
      },
    };
  }

  if (componentKey === "InteractiveMapPlaceholderSection") {
    return {
      ...merged,
      title: "Our Office",
      description: `${companyContact.legalName} is based in Gurugram, Haryana — serving engineering and industrial clients across India and internationally.`,
    };
  }

  if (slug === "about-us" && componentKey === "Section") {
    return {
      ...merged,
      title: "How We Work",
      strings: [...siteContent.aboutUs.paragraphs],
      cards: [
        {
          title: "Engagement Scope",
          description:
            "Complete product development or focused support such as firmware, communication integration, prototype bring-up, debugging, calibration tools, or long-term engineering assistance.",
        },
        {
          title: "Confidentiality",
          description: siteContent.confidentialityStatement,
        },
        {
          title: "Deliverables & IP",
          description: siteContent.deliverablesStatement,
        },
      ],
    };
  }

  if (slug === "request-consultation" && componentKey === "Section") {
    return {
      ...merged,
      eyebrow: "Confidentiality",
      title: "Project Information Handled Responsibly",
      description: siteContent.confidentialityStatement,
    };
  }

  if (slug === "ai-enabled-engineering" && componentKey === "Block4Section") {
    return {
      ...merged,
      title: "Secondary AI Capability",
      description: siteContent.aiSecondaryStatement,
      supportingText:
        "Primary engineering support remains embedded hardware, firmware, industrial communication, monitoring, control, and product debugging.",
      cards: siteContent.whyChooseUs,
    };
  }

  if (slug === "ai-enabled-engineering" && componentKey === "Block5Section") {
    return {
      ...merged,
      title: "Practical AI for Engineering Teams",
      description:
        "Our AI solutions go beyond general-purpose chatbots by integrating customer data, engineering knowledge, software tools, embedded products, and controlled workflows.",
      supportingText:
        "We combine AI with embedded systems, industrial data, customer knowledge, and software integration to build practical solutions that are difficult to achieve with a general-purpose chatbot alone.",
    };
  }

  if (componentKey === "HeroSection" || componentKey === "ConfiguredHero") {
    const hero = heroFromSlug(slug);
    if (hero) {
      return { ...merged, ...hero };
    }
  }

  if (componentKey === "SelectedProjectExperienceSection") {
    return {
      ...merged,
      title: "Selected Project Experience",
      studies: caseStudies,
      supportingText: caseStudyConfidentialityNote,
    };
  }

  if (componentKey === "FaqItem1Section") {
    return {
      ...merged,
      title: "Consultation FAQ",
      faqs: siteContent.consultationFaq,
    };
  }

  if (componentKey === "TermsContentSection" && slug === "terms-and-conditions") {
    return {
      ...merged,
      title: "Terms and Conditions",
      sections: legalSectionsToBlocks(TERMS_SECTIONS),
    };
  }

  if (componentKey === "SideNavigationSection" && slug === "privacy-policy") {
    return {
      ...merged,
      title: "Privacy Policy",
      body: PRIVACY_POLICY_INTRO,
      tocHeading: "Contents",
      toc: [...PRIVACY_POLICY_TOC],
      sections: legalSectionsToBlocks(PRIVACY_POLICY_SECTIONS),
    };
  }

  if (componentKey === "LeftColumnHighTrustContentSection") {
    return {
      ...merged,
      title: "Engineering Consultation",
      description: siteContent.locationStatement,
      strings: [siteContent.confidentialityShort, siteContent.contactCta],
    };
  }

  if (componentKey === "ConsultationFormSection") {
    return {
      ...merged,
      title: "Engineering Consultation",
      description: siteContent.contactCta,
      strings: [siteContent.confidentialityShort],
    };
  }

  if (componentKey === "ContactUsPageContent.form" || componentKey === "ConsultationFormSection") {
    return {
      ...merged,
      title: "Contact Mind Matrix",
      description: siteContent.locationStatement,
      strings: [siteContent.confidentialityShort],
    };
  }

  const pageContent = getPageContent(slug as PageContentKey);
  if (pageContent && (componentKey === "Section" || componentKey.includes("Section"))) {
    if (!merged.title && pageContent.title) merged.title = pageContent.title;
    if (!merged.description && pageContent.description) merged.description = pageContent.description;
    if ((!merged.items || (merged.items as unknown[]).length === 0) && pageContent.capabilities.length) {
      merged.items = [...pageContent.capabilities];
    }
  }

  if (base?.strings?.length) merged.strings = base.strings;
  if (base?.items?.length) merged.items = base.items;
  if (base?.cards?.length) merged.cards = base.cards;
  if (base?.images?.length) merged.images = base.images;
  if (base?.links?.length) merged.links = base.links;
  if (base?.title) merged.title = base.title;
  if (base?.description) merged.description = base.description;

  return merged;
}

export function isSectionContentEmpty(data: Record<string, unknown>): boolean {
  return !hasMeaningfulContent(data);
}

export { hasMeaningfulContent };
