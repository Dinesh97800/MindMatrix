import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Infrastructure",
  description: "Mind Matrix EV Infrastructure — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ev-infrastructure",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/ev-infrastructure.html"),
    "utf8"
  );
}

export default function EvInfrastructurePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
