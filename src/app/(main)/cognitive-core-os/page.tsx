import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cognitive Core OS",
  description: "Mind Matrix Cognitive Core OS — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/cognitive-core-os",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/cognitive-core-os.html"),
    "utf8"
  );
}

export default function CognitiveCoreOsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
