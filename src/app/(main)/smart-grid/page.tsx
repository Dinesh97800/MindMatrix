import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Smart Grid",
  description: "Mind Matrix Smart Grid — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/smart-grid",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/smart-grid.html"),
    "utf8"
  );
}

export default function SmartGridPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
