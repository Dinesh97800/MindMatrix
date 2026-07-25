import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Controller",
  description: "Mind Matrix Industrial Controller — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-controller",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-controller.html"),
    "utf8"
  );
}

export default function IndustrialControllerPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
