import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Automation",
  description: "Mind Matrix Industrial Automation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-automation",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-automation.html"),
    "utf8"
  );
}

export default function IndustrialAutomationPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
