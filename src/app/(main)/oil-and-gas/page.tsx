import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Oil & Gas",
  description: "Mind Matrix Oil & Gas — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/oil-and-gas",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/oil-and-gas.html"),
    "utf8"
  );
}

export default function OilAndGasPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
