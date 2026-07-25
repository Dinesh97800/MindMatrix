import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Application Notes & Design Guides",
  description: "Mind Matrix Application Notes & Design Guides — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/application-notes-and-design-guides",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/application-notes-and-design-guides.html"),
    "utf8"
  );
}

export default function ApplicationNotesAndDesignGuidesPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
