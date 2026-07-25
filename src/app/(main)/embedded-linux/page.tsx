import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Linux",
  description: "Mind Matrix Embedded Linux — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-linux",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/embedded-linux.html"),
    "utf8"
  );
}

export default function EmbeddedLinuxPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
