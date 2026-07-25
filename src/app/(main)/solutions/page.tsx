import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions",
  description: "Mind Matrix Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/solutions",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/solutions.html"),
    "utf8"
  );
}

export default function SolutionsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
