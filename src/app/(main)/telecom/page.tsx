import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Telecom",
  description: "Mind Matrix Telecom — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/telecom",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/telecom.html"),
    "utf8"
  );
}

export default function TelecomPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
