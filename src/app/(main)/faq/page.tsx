import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Mind Matrix FAQ — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/faq",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/faq.html"),
    "utf8"
  );
}

export default function FaqPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
