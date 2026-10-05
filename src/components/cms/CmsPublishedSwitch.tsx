import { headers } from "next/headers";
import type { ReactNode } from "react";
import { CanonicalPagePreview } from "@/cms/preview/CanonicalPreview";
import { publicSlugFromPathname } from "@/lib/cms/public-slug";
import { getPublishedPublicPage } from "@/lib/cms/published-public-page";

export async function CmsPublishedSwitch({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get("x-pathname");
  const slug = publicSlugFromPathname(pathname);
  const published = await getPublishedPublicPage(slug);

  if (!published) return children;

  return (
    <div data-cms-live={published.page.slug} data-cms-status="published">
      <CanonicalPagePreview sections={published.sections} showOrigin={false} />
    </div>
  );
}
