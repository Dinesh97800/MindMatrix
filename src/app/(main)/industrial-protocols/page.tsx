import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Protocols",
  description: "Mind Matrix Industrial Protocols — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-protocols",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-protocols.html"),
    "utf8"
  );
}

export default function IndustrialProtocolsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
