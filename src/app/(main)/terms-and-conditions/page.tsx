import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description: "Mind Matrix Terms & Conditions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/terms-and-conditions",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/terms-and-conditions.html"),
    "utf8"
  );
}

export default function TermsAndConditionsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
