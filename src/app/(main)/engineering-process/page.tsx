import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Process",
  description: "Mind Matrix Engineering Process — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/engineering-process",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/engineering-process.html"),
    "utf8"
  );
}

export default function EngineeringProcessPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
