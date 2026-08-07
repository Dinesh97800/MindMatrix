import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindmatrix.com";
const SITE_NAME = "Mind Matrix Intelligent Solutions";

/** Set NEXT_PUBLIC_PRELAUNCH=false when the site goes live for indexing. */
export const IS_PRELAUNCH =
  process.env.NEXT_PUBLIC_PRELAUNCH !== "false";

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
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/"
      ? `${title} | Embedded Product Engineering`
      : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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

export { SITE_URL, SITE_NAME };
