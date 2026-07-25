import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Measurement System",
  description: "Mind Matrix Embedded Measurement System — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-measurement-system",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/embedded-measurement-system.html"),
    "utf8"
  );
}

export default function EmbeddedMeasurementSystemPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
