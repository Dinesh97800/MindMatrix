import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hyperloop Beta (Telemetry)",
  description: "Mind Matrix Hyperloop Beta (Telemetry) — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/hyperloop-beta",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/hyperloop-beta.html"),
    "utf8"
  );
}

export default function HyperloopBetaPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
