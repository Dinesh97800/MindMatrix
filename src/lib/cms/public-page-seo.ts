import { canonicalUrl } from "@/lib/seo";
import { ensureCmsDatabaseReady } from "@/lib/cms/db";
import { publicSlugFromPathname } from "@/lib/cms/public-slug";
import { getDbModels } from "@/lib/db/models";
import type { PageSEO } from "@/lib/db/models/PageSEO";

const PAGE_SLUG_ALIASES: Record<string, string> = {
  freertos: "rtos",
  stm32: "32-bit-controller",
};

export type PublicPageSeo = {
  title: string;
  description: string;
  canonical: string;
};

export async function getPublicPageSeo(slug: string | null): Promise<PublicPageSeo | null> {
  if (!slug) return null;

  try {
    await ensureCmsDatabaseReady();
    const { Page, PageSEO } = getDbModels();
    const alias = PAGE_SLUG_ALIASES[slug];

    const page =
      (await Page.findOne({
        where: { slug, classification: "active" },
        include: [{ model: PageSEO, as: "seo" }],
      })) ??
      (alias
        ? await Page.findOne({
            where: { slug: alias, classification: "active" },
            include: [{ model: PageSEO, as: "seo" }],
          })
        : null);

    if (!page) return null;

    const seo = page.get("seo") as PageSEO | null | undefined;
    const title = (seo?.metaTitle || seo?.ogTitle || page.title || "").trim();
    const description = (seo?.metaDescription || seo?.ogDescription || "").trim();
    if (!title && !description) return null;

    const storedCanonical = seo?.canonicalUrl?.trim();
    const path = page.slug === "home" ? "/" : `/${page.slug}`;

    return {
      title,
      description,
      canonical: storedCanonical || canonicalUrl(path),
    };
  } catch {
    return null;
  }
}

export async function getPublicPageSeoForPath(pathname: string): Promise<PublicPageSeo | null> {
  return getPublicPageSeo(publicSlugFromPathname(pathname));
}
