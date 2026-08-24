import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-enabled Engineering",
  description: "Mind Matrix AI-enabled Engineering — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ai-enabled-engineering",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/ai-enabled-engineering.html"),
    "utf8"
  );
}

export default function AiEnabledEngineeringPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
