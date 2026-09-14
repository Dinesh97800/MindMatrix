import { getHeroPageConfig, type HeroPageConfig } from "@/config/hero-pages";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { PAGE_SEO } from "@/config/page-seo";
import { HERO_ASSETS } from "@/config/hero-images";
import { siteContent } from "@/config/site-content";
import {
  getExistingPageTitle,
  isApprovedLayoutPage,
} from "@/lib/cms/existing-pages";
import {
  getFallbackHero,
  getPageContentAlias,
  getRouteMetadataFallback,
} from "@/lib/cms/migration/fallback-page-heroes";
import { withMigrationMeta, stripMigrationFields, normalizeSectionData } from "@/lib/cms/migration/metadata";
import { discoverPublicRouteSlugs } from "@/lib/cms/migration/routes";
import { getUnmappedLegacySections } from "@/lib/cms/migration/unmapped-sections";
import {
  appendStandardCtaIfMissing,
  getSupplementarySections,
} from "@/lib/cms/migration/supplementary-sections";
import type { HeroSectionData, SectionType } from "@/cms/sections/types";

export type ImportSectionSpec = {
  type: SectionType;
  sourceKey: string;
  source: string;
  data: Record<string, unknown>;
  sortOrder?: number;
};

export type PageImportBundle = {
  slug: string;
  title: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    robots: "index" | "noindex";
    ogTitle?: string;
    ogDescription?: string;
  };
  sections: ImportSectionSpec[];
  unmappedLegacySections: string[];
};

function heroConfigToSectionData(
  slug: string,
  config: HeroPageConfig
): HeroSectionData {
  const primaryCta = config.ctas?.[0];
  return withMigrationMeta(
    {
      variant: config.variant,
      eyebrow: config.eyebrow ?? "",
      title: config.titleLines?.join("\n") ?? config.title ?? "",
      description: config.description ?? "",
      imageUrl: config.image,
      imageAlt: config.imageAlt ?? "",
      backgroundImageUrl: config.variant === "background" ? config.image : undefined,
      ctaText: primaryCta?.label ?? "",
      ctaUrl: primaryCta?.href ?? "",
      alignment: config.imagePosition === "left" ? "right" : "left",
      overlay: Boolean(config.overlay),
      lockedVariant: true,
    },
    { source: "hero-pages.ts", sourceKey: `${slug}:hero` }
  );
}

function wrapSection(
  slug: string,
  type: ImportSectionSpec["type"],
  source: string,
  data: Record<string, unknown>
): ImportSectionSpec {
  return {
    type,
    source,
    sourceKey: `${slug}:${type}`,
    data: withMigrationMeta(data, { source, sourceKey: `${slug}:${type}` }),
  };
}

function remapSectionsForSlug(slug: string, sections: ImportSectionSpec[]): ImportSectionSpec[] {
  return sections.map((section) => ({
    ...section,
    sourceKey: `${slug}:${section.type}`,
    data: withMigrationMeta(stripMigrationFields(normalizeSectionData(section.data)), {
      source: `${section.source} (alias page: ${slug})`,
      sourceKey: `${slug}:${section.type}`,
    }),
  }));
}

function buildApprovedLayoutSections(slug: PageContentKey): ImportSectionSpec[] {
  const content = getPageContent(slug)!;
  const heroConfig = getHeroPageConfig(slug);

  const sections: ImportSectionSpec[] = [];

  if (heroConfig) {
    sections.push({
      type: "hero",
      source: "hero-pages.ts",
      sourceKey: `${slug}:hero`,
      data: heroConfigToSectionData(slug, heroConfig),
    });
  } else {
    sections.push(
      wrapSection(slug, "hero", "page-content.ts", {
        variant: "split",
        eyebrow: content.eyebrow,
        title: content.title,
        description: content.description,
        imageAlt: content.title,
        lockedVariant: true,
      })
    );
  }

  sections.push(
    wrapSection(slug, "capabilities", "page-content.ts", {
      heading: slug === "faq" ? "Questions" : "Typical Scope",
      items: [...content.capabilities],
    })
  );

  if (slug !== "faq") {
    sections.push(
      wrapSection(slug, "cta", "site-content.ts", {
        title: "Discuss Your Requirement",
        description: siteContent.contactCta,
        buttonText: "Engineering Consultation",
        buttonUrl: "/contact-us-and-engineering-consultation",
        secondaryButtonText: "Contact Us",
        secondaryButtonUrl: "/contact-us",
        variant: "primary",
      })
    );
  }

  return sections;
}

function buildFallbackHeroSections(slug: string): ImportSectionSpec[] {
  const fallback = getFallbackHero(slug);
  if (!fallback) return [];

  return [
    wrapSection(slug, "hero", fallback.source, {
      variant: fallback.variant,
      eyebrow: fallback.eyebrow ?? "",
      title: fallback.title,
      description: fallback.description,
      imageUrl: fallback.imageUrl ?? "",
      imageAlt: fallback.imageAlt ?? fallback.title,
      backgroundImageUrl: fallback.variant === "background" ? fallback.imageUrl : undefined,
      ctaText: fallback.ctaText ?? "",
      ctaUrl: fallback.ctaUrl ?? "",
      lockedVariant: true,
    }),
  ];
}

function buildHeroOnlySections(slug: string): ImportSectionSpec[] {
  const heroConfig = getHeroPageConfig(slug);
  if (heroConfig) {
    return [
      {
        type: "hero",
        source: "hero-pages.ts",
        sourceKey: `${slug}:hero`,
        data: heroConfigToSectionData(slug, heroConfig),
      },
    ];
  }
  return buildFallbackHeroSections(slug);
}

function buildHomeSections(): ImportSectionSpec[] {
  const hero = siteContent.hero;
  return [
    wrapSection("home", "hero", "site-content.ts", {
      variant: "split",
      eyebrow: hero.eyebrow,
      title: hero.headlineLines.join("\n"),
      description: hero.subheading,
      imageUrl: HERO_ASSETS.engineering,
      imageAlt:
        "Embedded systems engineer validating a custom controller at a laboratory bench.",
      ctaText: hero.primaryCta.label,
      ctaUrl: hero.primaryCta.href,
      lockedVariant: true,
    }),
    wrapSection("home", "rich_text", "site-content.ts", {
      content: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: siteContent.intro }] }],
      },
    }),
    wrapSection("home", "cta", "site-content.ts", {
      title: "Discuss Your Requirement",
      description: siteContent.contactCta,
      buttonText: hero.primaryCta.label,
      buttonUrl: hero.primaryCta.href,
      secondaryButtonText: hero.secondaryCta.label,
      secondaryButtonUrl: hero.secondaryCta.href,
      variant: "primary",
    }),
  ];
}

function resolveSeo(slug: string) {
  const seoPath = slug === "home" ? "/" : `/${slug}`;
  const seoEntry = PAGE_SEO[seoPath];
  const routeFallback = getRouteMetadataFallback(slug);
  const metaTitle = seoEntry?.title ?? routeFallback?.title ?? getExistingPageTitle(slug);
  const metaDescription = seoEntry?.description ?? routeFallback?.description ?? "";

  return {
    metaTitle,
    metaDescription,
    robots: "index" as const,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
  };
}

function resolvePageTitle(slug: string): string {
  const seo = resolveSeo(slug);
  return seo.metaTitle.replace(/\s*\|\s*MMIS.*$/i, "").trim() || getExistingPageTitle(slug);
}

export function getAllImportSlugs(): string[] {
  return [...new Set([...discoverPublicRouteSlugs()])].sort((a, b) => a.localeCompare(b));
}

export function buildPageImportBundle(slug: string): PageImportBundle | null {
  if (!getAllImportSlugs().includes(slug)) return null;

  const unmappedLegacySections = getUnmappedLegacySections(slug);
  const contentAlias = getPageContentAlias(slug);

  let sections: ImportSectionSpec[] = [];
  if (slug === "home") {
    sections = buildHomeSections();
  } else if (contentAlias && isApprovedLayoutPage(contentAlias)) {
    sections = remapSectionsForSlug(slug, buildApprovedLayoutSections(contentAlias));
  } else if (isApprovedLayoutPage(slug)) {
    sections = buildApprovedLayoutSections(slug);
  } else {
    sections = buildHeroOnlySections(slug);
  }

  sections = appendStandardCtaIfMissing(slug, sections);
  sections = [...sections, ...getSupplementarySections(slug)];

  if (sections.length === 0) {
    return null;
  }

  const seo = resolveSeo(slug);

  return {
    slug,
    title: resolvePageTitle(slug),
    seo,
    sections,
    unmappedLegacySections,
  };
}

export function getAllPageImportBundles(): PageImportBundle[] {
  return getAllImportSlugs()
    .map((slug) => buildPageImportBundle(slug))
    .filter((bundle): bundle is PageImportBundle => Boolean(bundle));
}
