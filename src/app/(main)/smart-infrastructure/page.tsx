import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Smart Infrastructure",
  description: "Mind Matrix Smart Infrastructure — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/smart-infrastructure",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/smart-infrastructure.html"),
    "utf8"
  );
}

export default function SmartInfrastructurePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
