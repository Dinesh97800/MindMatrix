import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindmatrix.com";
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
  return {
    metadataBase: getMetadataBase(),
    title: {
      default: `${SITE_NAME} | Embedded Product Engineering`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
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
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const pagePath = canonicalPath(path);
  const url = canonicalUrl(path);
  const fullTitle =
    path === "/"
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

export { SITE_URL, SITE_NAME };
