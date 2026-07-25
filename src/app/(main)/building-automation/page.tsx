import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Building Automation",
  description: "Mind Matrix Building Automation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/building-automation",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/building-automation.html"),
    "utf8"
  );
}

export default function BuildingAutomationPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
