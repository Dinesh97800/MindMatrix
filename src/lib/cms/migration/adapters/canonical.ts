import { companyContact, formatCompanyAddress } from "@/config/company";
import { getHeroPageConfig } from "@/config/hero-pages";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { PAGE_SEO } from "@/config/page-seo";
import { siteContent } from "@/config/site-content";
import { caseStudies } from "@/data/case-studies";
import {
  PRIVACY_POLICY_SECTIONS,
  TERMS_SECTIONS,
} from "@/lib/cms/migration/data/legal-content";
import type {
  AuditedRoutePlan,
  AuditedSectionPlan,
} from "@/lib/cms/canonical/audit-map";
import { editorPolicyFor } from "@/lib/cms/canonical/editor-policies";
import type {
  CanonicalPageManifest,
  CanonicalSection,
  MappingStatus,
} from "@/lib/cms/canonical/types";
import { getExplicitContent } from "./explicit-content";

type ResolvedContent = {
  content: Record<string, unknown>;
  status: MappingStatus;
  missingData?: string[];
  sourceKind?: CanonicalSection["source"]["kind"];
  adapter?: string;
  sourceNote?: string;
};

function actions(
  items: readonly { label: string; href: string; variant?: string; icon?: string }[]
) {
  return items.map(({ label, href, variant, icon }) => ({
    label,
    href,
    ...(variant ? { variant } : {}),
    ...(icon ? { icon } : {}),
  }));
}

function heroContent(route: AuditedRoutePlan): ResolvedContent | null {
  const lookup = route.pageKey ?? route.slug;
  const hero = getHeroPageConfig(lookup);
  const fallback = getPageContent(lookup as PageContentKey);
  if (!hero && !fallback) return null;
  return {
    status: "MAPPED",
    sourceKind: "structured-config",
    content: {
      eyebrow: hero?.eyebrow ?? fallback?.eyebrow ?? "",
      title: hero?.titleLines?.join("\n") ?? hero?.title ?? fallback?.title ?? "",
      summary: hero?.description ?? fallback?.description ?? "",
      media: hero?.image ? { source: hero.image } : undefined,
      mediaAlt: hero?.imageAlt ?? fallback?.title ?? "",
      actions: actions(hero?.ctas ?? []),
    },
  };
}

function sharedContent(
  route: AuditedRoutePlan,
  section: AuditedSectionPlan
): ResolvedContent | null {
  const pageKey = route.pageKey as PageContentKey | undefined;
  const page = pageKey ? getPageContent(pageKey) : undefined;

  if (section.source.component === "PageContentHero") return heroContent(route);
  if (section.source.component === "ApprovedTypicalScope" && page) {
    return {
      status: "MAPPED",
      sourceKind: "structured-config",
      content: {
        heading: "Typical Scope",
        cards: page.capabilities.map((body) => ({ body, icon: "check_circle" })),
      },
    };
  }
  if (section.source.component === "ApprovedInfoCards") {
    return {
      status: "MAPPED",
      sourceKind: "structured-config",
      content: {
        heading: "Project Information",
        cards: [
          { title: "Deliverables", body: siteContent.deliverablesStatement },
          { title: "Confidentiality", body: siteContent.confidentialityShort },
        ],
      },
    };
  }
  if (section.source.component === "ApprovedFaqList") {
    return {
      status: "MAPPED",
      sourceKind: "structured-config",
      content: { heading: "FAQ", items: [...siteContent.consultationFaq] },
    };
  }
  if (
    section.source.component === "ApprovedCta" ||
    section.source.component === "IndexCta"
  ) {
    return {
      status: "MAPPED",
      sourceKind: "structured-config",
      content: {
        title: "Discuss Your Requirement",
        body: siteContent.contactCta,
        actions: [
          {
            label: "Engineering Consultation",
            href: "/contact-us-and-engineering-consultation",
          },
          ...(section.source.component === "ApprovedCta"
            ? [{ label: "Contact Us", href: "/contact-us" }]
            : []),
        ],
      },
    };
  }
  if (section.source.component === "IndexLinkGrid" && pageKey) {
    const items =
      pageKey === "industries" ? siteContent.industries : siteContent.technologies;
    return {
      status: "MAPPED",
      sourceKind: "structured-config",
      content: {
        heading: page?.title ?? pageKey,
        introduction: page?.description ?? "",
        cards: items.map((item) => ({
          title: item.label,
          link: { label: "Learn more", href: item.href },
        })),
      },
    };
  }
  return null;
}

function knownContent(
  route: AuditedRoutePlan,
  section: AuditedSectionPlan
): ResolvedContent | null {
  if (section.model === "HERO") {
    const hero = heroContent(route);
    if (hero) return hero;
  }

  switch (section.stableKey) {
    case "home.hero-with-metrics":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          eyebrow: siteContent.hero.eyebrow,
          title: siteContent.hero.headlineLines.join("\n"),
          summary: siteContent.hero.subheading,
          actions: [siteContent.hero.primaryCta, siteContent.hero.secondaryCta],
          metrics: [
            { value: "18+ Years", label: "Industry Experience" },
            { value: "IoT", label: "Firmware, Hardware + Communication" },
            { value: "India-Based", label: "Engineering Consultancy" },
          ],
        },
      };
    case "home.ai-highlight":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          heading: "AI-Assisted Engineering Where Appropriate",
          body: siteContent.aiSecondaryStatement,
          items: [siteContent.hero.technologyLine],
          media: { source: "/images/heroes/edge-computing-data-center-hero.webp" },
          actions: [{ label: "Explore Technologies", href: "/technologies" }],
        },
      };
    case "home.why-choose-us":
    case "shared.why-choose-us":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          heading: "Senior-Led Embedded Product Engineering",
          introduction: siteContent.locationStatement,
          cards: [...siteContent.whyChooseUs],
        },
      };
    case "home.engineering-discussion":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          title: "Start an Engineering Discussion",
          body: siteContent.contactCta,
          actions: [siteContent.hero.primaryCta, { label: "View Case Studies", href: "/case-studies" }],
        },
      };
    case "about.working-model":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          title: "How We Work",
          paragraphs: [...siteContent.aboutUs.paragraphs],
          cards: [
            {
              title: "Engagement Scope",
              icon: "handyman",
              body: "Complete product development or focused support such as firmware, communication integration, prototype bring-up, debugging, calibration tools, or long-term engineering assistance.",
            },
            {
              title: "Confidentiality",
              icon: "verified_user",
              body: siteContent.confidentialityStatement,
            },
            {
              title: "Deliverables & IP",
              icon: "description",
              body: siteContent.deliverablesStatement,
            },
          ],
        },
      };
    case "case-studies.projects":
      return {
        status: "FIRST_CLASS_ENTITY",
        sourceKind: "structured-data",
        content: {
          entityType: "case_study",
          references: caseStudies.map(({ slug }) => slug),
          heading: "Selected Project Experience",
        },
      };
    case "contact-us.locations":
      return {
        status: "MAPPED",
        sourceKind: "structured-config",
        content: {
          heading: "Contact Mind Matrix",
          addresses: [
            {
              label: companyContact.shortName,
              formatted: formatCompanyAddress(false),
              ...companyContact.address,
            },
          ],
          email: companyContact.email,
        },
      };
    case "contact-us.project-inquiry":
      return {
        status: "MAPPED",
        content: { formKey: "contact-us", heading: "Project Inquiry" },
      };
    case "consultation.enquiry":
      return {
        status: "MAPPED",
        content: {
          formKey: "engineering-consultation",
          heading: "Engineering Consultation Enquiry",
          privacyCopy: siteContent.confidentialityShort,
        },
      };
    case "request-consultation.form":
      return {
        status: "MAPPED",
        content: {
          formKey: "request-consultation",
          heading: "Discuss Your Embedded Product Requirement",
          privacyCopy: siteContent.confidentialityShort,
        },
      };
    case "privacy-policy.legal-document":
      return {
        status: "MAPPED",
        sourceKind: "structured-data",
        content: {
          title: "Privacy Policy",
          sections: PRIVACY_POLICY_SECTIONS,
        },
      };
    case "terms.legal-document":
      return {
        status: "MAPPED",
        sourceKind: "structured-data",
        content: {
          title: "Terms and Conditions",
          sections: TERMS_SECTIONS,
        },
      };
  }

  if (section.model === "FORM") {
    return {
      status: "MAPPED",
      content: {
        formKey: section.stableKey,
        heading: section.stableKey.split(".").at(-1) ?? "Form",
      },
    };
  }
  if (section.model === "LISTING") {
    return {
      status: "FIRST_CLASS_ENTITY",
      content: {
        entityType: section.entityType ?? "case_study",
        references: [],
        heading: section.stableKey.split(".").at(-1) ?? "Listing",
      },
    };
  }
  if (section.model === "NAV") {
    return {
      status: "FIRST_CLASS_ENTITY",
      content: {
        mode: section.stableKey,
        taxonomy: section.entityType ?? "navigation",
      },
    };
  }
  if (section.model === "UTILITY") {
    return { status: "UTILITY", content: {} };
  }
  return null;
}

function resolveSection(
  route: AuditedRoutePlan,
  plan: AuditedSectionPlan
): CanonicalSection {
  const explicit = getExplicitContent(plan.stableKey);
  const explicitResolved: ResolvedContent | null = explicit
    ? {
        status: "MAPPED",
        content: explicit.content,
        sourceKind: "structured-data",
        adapter: explicit.adapter,
        sourceNote: explicit.sourceNote,
      }
    : null;
  const resolved =
    sharedContent(route, plan) ??
    explicitResolved ??
    knownContent(route, plan) ?? {
      status: "MISSING_SOURCE" as const,
      content: {},
      missingData: [
        "content is embedded in JSX and has no reviewed explicit adapter",
      ],
    };
  const source = {
    ...plan.source,
    kind: resolved.sourceKind ?? plan.source.kind,
    ...(resolved.adapter ? { adapter: resolved.adapter } : {}),
    ...(resolved.sourceNote ? { sourceNote: resolved.sourceNote } : {}),
  };
  return {
    stableKey: plan.stableKey,
    model: plan.model,
    template: plan.template,
    content: resolved.content,
    visibility: true,
    source,
    editorPolicy: editorPolicyFor(plan.model),
    decorations: {},
    status: resolved.status,
    entityType: plan.entityType,
    missingData: resolved.missingData,
    _migration: {
      version: "2026-09-05-canonical-v4",
      source: source.file ?? source.kind,
      sourceKey: plan.stableKey,
      sourceComponent: source.component,
    },
  };
}

function pageTitle(route: AuditedRoutePlan): string {
  const key = (route.pageKey ?? route.slug) as PageContentKey;
  const content = getPageContent(key);
  const seo = PAGE_SEO[route.path];
  return (
    content?.title ??
    seo?.title?.replace(/\s*\|\s*MMIS.*$/i, "") ??
    route.slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function buildCanonicalPage(route: AuditedRoutePlan): CanonicalPageManifest {
  const seo = PAGE_SEO[route.path];
  return {
    slug: route.slug,
    path: route.path,
    title: pageTitle(route),
    category: null,
    status: "draft",
    template: route.pageTemplate,
    classification: route.classification,
    redirectTarget: route.redirectTarget,
    publishable: route.classification === "active",
    seo: seo
      ? {
          metaTitle: seo.title,
          metaDescription: seo.description,
          canonicalPath: route.path,
          robots: "index",
        }
      : null,
    sections: route.sections.map((section) => resolveSection(route, section)),
  };
}
