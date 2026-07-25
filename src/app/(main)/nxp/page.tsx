import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "NXP",
  description: "Mind Matrix NXP — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nxp",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/nxp.html"),
    "utf8"
  );
}

export default function NxpPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
