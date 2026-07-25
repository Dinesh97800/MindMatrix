import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights & Engineering Blog",
  description: "Mind Matrix Insights & Engineering Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/insights-and-engineering-blog",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/insights-and-engineering-blog.html"),
    "utf8"
  );
}

export default function InsightsAndEngineeringBlogPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
