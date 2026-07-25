import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Communication",
  description: "Mind Matrix Industrial Communication — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-communication",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-communication.html"),
    "utf8"
  );
}

export default function IndustrialCommunicationPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
