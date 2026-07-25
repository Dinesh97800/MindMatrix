import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Knowledge Base",
  description: "Mind Matrix Technical Knowledge Base — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/technical-knowledge-base",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/technical-knowledge-base.html"),
    "utf8"
  );
}

export default function TechnicalKnowledgeBasePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
