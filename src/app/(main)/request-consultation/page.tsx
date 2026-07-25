import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Request Consultation",
  description: "Mind Matrix Request Consultation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/request-consultation",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/request-consultation.html"),
    "utf8"
  );
}

export default function RequestConsultationPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
