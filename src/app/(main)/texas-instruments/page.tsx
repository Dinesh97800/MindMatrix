import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Texas Instruments",
  description: "Mind Matrix Texas Instruments — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/texas-instruments",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/texas-instruments.html"),
    "utf8"
  );
}

export default function TexasInstrumentsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
