"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { publicSlugFromPathname } from "@/lib/cms/public-slug";
import { SITE_NAME } from "@/lib/seo";

type CmsPageSeo = {
  title: string;
  description: string;
  canonical: string;
};

const seoCache = new Map<string, CmsPageSeo>();

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function applySeo(seo: CmsPageSeo) {
  if (seo.title && document.title !== seo.title) {
    document.title = seo.title;
  }
  if (seo.description) {
    upsertMeta('meta[name="description"]', { name: "description" }, seo.description);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, seo.description);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, seo.description);
  }
  if (seo.canonical) {
    upsertCanonical(seo.canonical);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, seo.canonical);
  }
  if (seo.title) {
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, seo.title);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, seo.title);
  }
}

function headLooksEmpty(seo: CmsPageSeo) {
  const title = document.title.trim();
  const description = document.head
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();
  const canonical = document.head
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href")
    ?.trim();

  return Boolean(
    (seo.title && title !== seo.title) ||
      (seo.description && description !== seo.description) ||
      (seo.canonical && canonical !== seo.canonical)
  );
}

async function loadCmsSeo(slug: string): Promise<CmsPageSeo | null> {
  const cached = seoCache.get(slug);
  if (cached) return cached;

  const response = await fetch(`/api/cms/seo/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!response.ok) return null;

  const data = (await response.json()) as Partial<CmsPageSeo>;
  const seo: CmsPageSeo = {
    title: (data.title ?? "").trim(),
    description: (data.description ?? "").trim(),
    canonical: (data.canonical ?? "").trim(),
  };
  if (!seo.title && !seo.description && !seo.canonical) return null;
  seoCache.set(slug, seo);
  return seo;
}

export function RouteMetadataSync() {
  const pathname = usePathname();

  useEffect(() => {
    const slug = publicSlugFromPathname(pathname);
    if (!slug) return;

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let frame = 0;
    let soon = 0;
    let later = 0;

    void loadCmsSeo(slug).then((seo) => {
      if (cancelled || !seo) return;

      applySeo(seo);

      const restoreIfCleared = () => {
        if (headLooksEmpty(seo)) applySeo(seo);
      };

      frame = window.requestAnimationFrame(restoreIfCleared);
      soon = window.setTimeout(restoreIfCleared, 50);
      later = window.setTimeout(restoreIfCleared, 300);

      observer = new MutationObserver(restoreIfCleared);
      observer.observe(document.head, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(soon);
      window.clearTimeout(later);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
