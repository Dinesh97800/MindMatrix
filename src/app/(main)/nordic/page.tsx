import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Nordic",
  description: "Mind Matrix Nordic — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nordic",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/nordic.html"),
    "utf8"
  );
}

export default function NordicPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
