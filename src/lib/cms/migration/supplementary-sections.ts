import { siteContent } from "@/config/site-content";import { caseStudies } from "@/data/case-studies";
import type { ImportSectionSpec } from "@/lib/cms/legacy-content-map";
import { PRIVACY_POLICY_SECTIONS, TERMS_SECTIONS } from "./data/legal-content";
import { withMigrationMeta } from "./metadata";

const HOME_SERVICE_CARDS = [
  {
    title: "Embedded Firmware",
    description:
      "Bare-metal and RTOS firmware, peripheral drivers, secure bootloaders, diagnostics, and configuration storage.",
  },
  {
    title: "Hardware & Integration",
    description:
      "Hardware-firmware integration, prototype bring-up, measurement interfaces, and bench validation.",
  },
  {
    title: "Industrial IoT",
    description:
      "Gateway firmware, edge data collection, protocol integration, and remote monitoring for connected industrial products.",
  },
  {
    title: "Edge AI",
    description:
      "Edge AI and intelligent embedded-system development where appropriate to the application.",
  },
  {
    title: "Industrial Communication",
    description:
      "Ethernet, TCP/IP stack, L2 switch, SNMP V2 and V3, plus CAN, Modbus, RS-485, UART, SPI, I²C, and MQTT integration.",
  },
  {
    title: "Engineering Consultation",
    description:
      "Requirement analysis, architecture review, debugging, redesign, and long-term engineering support.",
  },
] as const;

function wrap(
  slug: string,
  type: ImportSectionSpec["type"],
  keySuffix: string,
  source: string,
  data: Record<string, unknown>
): ImportSectionSpec {
  const sourceKey = `${slug}:${type}:${keySuffix}`;
  return {
    type,
    source,
    sourceKey,
    data: withMigrationMeta(data, { source, sourceKey }),
  };
}

function paragraphsToDoc(paragraphs: readonly string[]) {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    })),
  };
}

function legalSectionsToDoc(
  sections: ReadonlyArray<{
    heading: string;
    paragraphs?: readonly string[];
    bullets?: readonly string[];
  }>
) {
  const content: Array<Record<string, unknown>> = [];

  for (const section of sections) {
    content.push({
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: section.heading }],
    });

    for (const paragraph of section.paragraphs ?? []) {
      content.push({
        type: "paragraph",
        content: [{ type: "text", text: paragraph }],
      });
    }

    for (const bullet of section.bullets ?? []) {
      content.push({
        type: "paragraph",
        content: [{ type: "text", text: `• ${bullet}` }],
      });
    }
  }

  return { type: "doc", content };
}

function buildStandardCta(slug: string): ImportSectionSpec {
  return wrap(slug, "cta", "standard", "site-content.ts", {
    title: "Discuss Your Requirement",
    description: siteContent.contactCta,
    buttonText: "Engineering Consultation",
    buttonUrl: "/contact-us-and-engineering-consultation",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact-us",
    variant: "primary",
  });
}

function buildHomeSupplementary(): ImportSectionSpec[] {
  return [
    wrap("home", "capabilities", "core-services", "site-content.ts", {
      heading: "Core Engineering Services",
      items: [...siteContent.coreServices],
    }),
    wrap("home", "capabilities", "service-cards", "Service1Section.tsx", {
      heading: "Engineering Capabilities",
      items: HOME_SERVICE_CARDS.map((card) => `${card.title} — ${card.description}`),
    }),
    wrap("home", "capabilities", "why-choose-us", "site-content.ts", {
      heading: "Why Choose Mind Matrix",
      items: siteContent.whyChooseUs.map((item) => `${item.title}: ${item.description}`),
    }),
    wrap("home", "capabilities", "industries", "site-content.ts", {
      heading: "Industries We Serve",
      items: siteContent.industries.map((item) => item.label),
    }),
    wrap("home", "capabilities", "technologies", "site-content.ts", {
      heading: "Technologies",
      items: siteContent.technologies.map((item) => item.label),
    }),
    wrap("home", "rich_text", "tagline", "site-content.ts", {
      content: paragraphsToDoc([
        siteContent.tagline,
        siteContent.experienceStatement,
        siteContent.projectsStatement,
        siteContent.manufacturingSupport,
        siteContent.deliverablesStatement,
      ]),
    }),
  ];
}

/** Additional CMS sections beyond base hero/capabilities/CTA mapping. */
export function getSupplementarySections(slug: string): ImportSectionSpec[] {
  const sections: ImportSectionSpec[] = [];

  if (slug === "home") {
    sections.push(...buildHomeSupplementary());
    return sections;
  }

  if (slug === "about-us") {
    sections.push(
      wrap("about-us", "rich_text", "about", "site-content.ts", {
        content: paragraphsToDoc(siteContent.aboutUs.paragraphs),
      })
    );
  }

  if (slug === "privacy-policy") {
    sections.push(
      wrap("privacy-policy", "rich_text", "body", "SideNavigationSection.tsx", {
        content: legalSectionsToDoc(PRIVACY_POLICY_SECTIONS),
      })
    );
  }

  if (slug === "terms-and-conditions") {
    sections.push(
      wrap("terms-and-conditions", "rich_text", "body", "TermsContentSection.tsx", {
        content: legalSectionsToDoc(TERMS_SECTIONS),
      })
    );
  }

  if (slug === "case-studies") {
    sections.push(
      wrap("case-studies", "capabilities", "projects", "case-studies.ts", {
        heading: "Selected Project Experience",
        items: caseStudies.map(
          (study) => `${study.title} — ${study.requirement}`
        ),
      })
    );
  }

  if (slug === "contact-us-and-engineering-consultation") {
    sections.push(
      wrap("contact-us-and-engineering-consultation", "capabilities", "faq", "site-content.ts", {
        heading: "Consultation FAQ",
        items: siteContent.consultationFaq.map(
          (item) => `${item.question} — ${item.answer}`
        ),
      })
    );
  }

  if (slug === "contact-us" || slug === "request-consultation") {
    sections.push(
      wrap(slug, "rich_text", "supporting", "site-content.ts", {
        content: paragraphsToDoc([
          siteContent.locationStatement,
          siteContent.confidentialityShort,
        ]),
      })
    );
  }

  return sections;
}

export function appendStandardCtaIfMissing(
  slug: string,
  sections: ImportSectionSpec[]
): ImportSectionSpec[] {
  if (
    slug === "faq" ||
    slug === "home" ||
    slug === "privacy-policy" ||
    slug === "terms-and-conditions"
  ) {
    return sections;
  }
  if (sections.some((section) => section.type === "cta")) {
    return sections;
  }
  return [...sections, buildStandardCta(slug)];
}
