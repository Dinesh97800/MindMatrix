import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Microchip",
  description: "Mind Matrix Microchip — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/microchip",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/microchip.html"),
    "utf8"
  );
}

export default function MicrochipPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
