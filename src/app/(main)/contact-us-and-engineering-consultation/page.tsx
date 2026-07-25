import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us & Engineering Consultation",
  description: "Mind Matrix Contact Us & Engineering Consultation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/contact-us-and-engineering-consultation",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/contact-us-and-engineering-consultation.html"),
    "utf8"
  );
}

export default function ContactUsAndEngineeringConsultationPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
