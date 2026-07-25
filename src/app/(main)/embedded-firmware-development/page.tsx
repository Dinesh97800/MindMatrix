import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Firmware Development",
  description: "Mind Matrix Embedded Firmware Development — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-firmware-development",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/embedded-firmware-development.html"),
    "utf8"
  );
}

export default function EmbeddedFirmwareDevelopmentPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
