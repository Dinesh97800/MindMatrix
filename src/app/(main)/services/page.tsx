import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description: "Mind Matrix Services — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/services",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/services.html"),
    "utf8"
  );
}

export default function ServicesPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
