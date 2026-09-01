import type { Metadata } from "next";
import { PAGE_SEO } from "@/config/page-seo";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmisindia.com";
const SITE_NAME = "Mind Matrix Intelligent Solutions";

/** Set NEXT_PUBLIC_PRELAUNCH=false when the site goes live for indexing. */
export const IS_PRELAUNCH =
  process.env.NEXT_PUBLIC_PRELAUNCH !== "false";

export function getMetadataBase(): URL {
  return new URL(SITE_URL);
}

export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function canonicalUrl(path: string): string {
  const normalizedPath = canonicalPath(path);
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}

/** Site-wide defaults for the root layout (no page-specific canonical). */
export function buildRootMetadata(): Metadata {
  const home = PAGE_SEO["/"];
  return {
    metadataBase: getMetadataBase(),
    title: {
      default: home?.title ?? `${SITE_NAME} | Embedded Product Engineering`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      home?.description ??
      "India-based engineering consultancy for custom embedded hardware, firmware, and communication-system development — from requirements and architecture through prototype validation and production support.",
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: [{ url: "/favicon.png", type: "image/png" }],
    },
    robots: IS_PRELAUNCH
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
}): Metadata {
  const pagePath = canonicalPath(path);
  const fullTitle = absoluteTitle
    ? title
    : path === "/"
      ? `${title} | Embedded Product Engineering`
      : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pagePath,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Metadata for a public page from {@link PAGE_SEO}, with legacy fallback. */
export function pageMetadata(path: string, keywords?: string[]): Metadata {
  const pagePath = canonicalPath(path);
  const entry = PAGE_SEO[pagePath];

  if (entry) {
    return buildPageMetadata({
      title: entry.title,
      description: entry.description,
      path: pagePath,
      keywords,
      absoluteTitle: true,
    });
  }

  return buildPageMetadata({
    title: "Mind Matrix Intelligent Solutions",
    description:
      "India-based engineering consultancy for embedded hardware, firmware, Industrial IoT and communication solutions.",
    path: pagePath,
    keywords,
  });
}

export { SITE_URL, SITE_NAME };
