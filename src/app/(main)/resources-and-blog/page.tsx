import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources & Blog",
  description: "Mind Matrix Resources & Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/resources-and-blog",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/resources-and-blog.html"),
    "utf8"
  );
}

export default function ResourcesAndBlogPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
