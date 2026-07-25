import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Downloads & SDKs",
  description: "Mind Matrix Technical Downloads & SDKs — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/technical-downloads-and-sdks",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/technical-downloads-and-sdks.html"),
    "utf8"
  );
}

export default function TechnicalDownloadsAndSdksPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
