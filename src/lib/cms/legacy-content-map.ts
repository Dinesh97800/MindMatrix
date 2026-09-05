import { getHeroPageConfig, type HeroPageConfig } from "@/config/hero-pages";
import { getPageContent, type PageContentKey } from "@/config/page-content";
import { PAGE_SEO } from "@/config/page-seo";
import { siteContent } from "@/config/site-content";
import {
  getExistingPageTitle,
  getExistingWebsiteSlugs,
  isApprovedLayoutPage,
} from "@/lib/cms/existing-pages";
import type { HeroSectionData } from "@/cms/sections/types";

export type ImportSectionSpec = {
  type: "hero" | "capabilities" | "cta";
  data: Record<string, unknown>;
};

export type PageImportBundle = {
  slug: string;
  title: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    robots: "index" | "noindex";
  };
  sections: ImportSectionSpec[];
  unmappedLegacySections: string[];
};

function heroConfigToSectionData(config: HeroPageConfig): HeroSectionData {
  const primaryCta = config.ctas?.[0];
  return {
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
  };
}

function buildApprovedLayoutSections(slug: PageContentKey): ImportSectionSpec[] {
  const content = getPageContent(slug)!;
  const heroConfig = getHeroPageConfig(slug);

  const sections: ImportSectionSpec[] = [];

  if (heroConfig) {
    sections.push({ type: "hero", data: heroConfigToSectionData(heroConfig) });
  } else {
    sections.push({
      type: "hero",
      data: {
        variant: "split",
        eyebrow: content.eyebrow,
        title: content.title,
        description: content.description,
        imageAlt: content.title,
        lockedVariant: true,
      },
    });
  }

  sections.push({
    type: "capabilities",
    data: {
      heading: slug === "faq" ? "Questions" : "Typical Scope",
      items: [...content.capabilities],
    },
  });

  if (slug !== "faq") {
    sections.push({
      type: "cta",
      data: {
        title: "Discuss Your Requirement",
        description: siteContent.contactCta,
        buttonText: "Engineering Consultation",
        buttonUrl: "/contact-us-and-engineering-consultation",
        secondaryButtonText: "Contact Us",
        secondaryButtonUrl: "/contact-us",
        variant: "primary",
      },
    });
  }

  return sections;
}

function buildHeroOnlySections(slug: string): ImportSectionSpec[] {
  const heroConfig = getHeroPageConfig(slug);
  if (!heroConfig) return [];

  return [{ type: "hero", data: heroConfigToSectionData(heroConfig) }];
}

export function buildPageImportBundle(slug: string): PageImportBundle | null {
  if (!getExistingWebsiteSlugs().includes(slug)) return null;

  const seoEntry = PAGE_SEO[`/${slug}`];
  const unmappedLegacySections = slug === "oil-and-gas"
    ? [
        "ExplosiveEnvironmentsSection",
        "SmallAccentSection",
        "Section",
        "Block2Section",
        "AtmosphericBgElementSection",
      ]
    : [];

  let sections: ImportSectionSpec[] = [];
  if (isApprovedLayoutPage(slug)) {
    sections = buildApprovedLayoutSections(slug);
  } else {
    sections = buildHeroOnlySections(slug);
  }

  if (sections.length === 0) {
    return null;
  }

  return {
    slug,
    title: getExistingPageTitle(slug),
    seo: {
      metaTitle: seoEntry?.title ?? getExistingPageTitle(slug),
      metaDescription: seoEntry?.description ?? "",
      robots: "index",
    },
    sections,
    unmappedLegacySections,
  };
}

export function getAllPageImportBundles(): PageImportBundle[] {
  return getExistingWebsiteSlugs()
    .map((slug) => buildPageImportBundle(slug))
    .filter((bundle): bundle is PageImportBundle => Boolean(bundle));
}
