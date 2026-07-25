import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description: "Mind Matrix Careers — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/careers",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/careers.html"),
    "utf8"
  );
}

export default function CareersPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
