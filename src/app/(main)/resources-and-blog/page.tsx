import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ResourcesAndBlogPageContent } from "@/components/pages/resources-and-blog/ResourcesAndBlogPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources & Blog",
  description: "Mind Matrix Resources & Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/resources-and-blog",
  keywords: ["mind matrix","embedded systems","resources","and","blog"],
});

export default function ResourcesAndBlogPage() {
  return <ResourcesAndBlogPageContent />;
}
