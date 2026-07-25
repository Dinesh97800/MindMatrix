import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: "Mind Matrix Case Studies — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/case-studies",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/case-studies.html"),
    "utf8"
  );
}

export default function CaseStudiesPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
