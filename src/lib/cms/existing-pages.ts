import { PAGE_SEO } from "@/config/page-seo";
import { collectAllSiteHrefs } from "@/config/navigation";
import { heroPageConfigs } from "@/config/hero-pages";
import { pageContent, type PageContentKey } from "@/config/page-content";

function slugFromHref(href: string): string | null {
  if (!href || href === "/" || href.startsWith("http") || href.startsWith("#")) {
    return null;
  }
  return href.replace(/^\//, "").split(/[?#]/)[0] || null;
}

/** Public website slugs that may appear in the CMS page list. */
export function getExistingWebsiteSlugs(): string[] {
  const slugs = new Set<string>();

  for (const path of Object.keys(PAGE_SEO)) {
    const slug = slugFromHref(path);
    if (slug) slugs.add(slug);
  }

  for (const href of collectAllSiteHrefs()) {
    const slug = slugFromHref(href);
    if (slug) slugs.add(slug);
  }

  for (const slug of Object.keys(heroPageConfigs)) {
    slugs.add(slug);
  }

  for (const slug of Object.keys(pageContent)) {
    slugs.add(slug);
  }

  return [...slugs].sort((a, b) => a.localeCompare(b));
}

export function isExistingWebsiteSlug(slug: string): boolean {
  return getExistingWebsiteSlugs().includes(slug);
}

export function getExistingPageTitle(slug: string): string {
  const seo = PAGE_SEO[`/${slug}`];
  if (seo?.title) {
    return seo.title.replace(/\s*\|\s*MMIS.*$/i, "").trim();
  }

  const content = pageContent[slug as PageContentKey];
  if (content?.title) return content.title;

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Pages with ApprovedPageLayout-style editable blocks in CMS. */
export function isApprovedLayoutPage(slug: string): slug is PageContentKey {
  return slug in pageContent;
}

/**
 * Custom frontend pages with additional legacy sections not yet mapped to CMS.
 * CMS MIGRATION PENDING for listed section components.
 */
export const CUSTOM_LEGACY_PAGE_SECTIONS: Record<string, string[]> = {
  "oil-and-gas": [
    "ExplosiveEnvironmentsSection",
    "SmallAccentSection",
    "Section",
    "Block2Section",
    "AtmosphericBgElementSection",
  ],
};

export function getUnmappedLegacySections(slug: string): string[] {
  return CUSTOM_LEGACY_PAGE_SECTIONS[slug] ?? [];
}
