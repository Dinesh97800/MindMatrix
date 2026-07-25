import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Quantum-Ready Data Architecture",
  description: "Mind Matrix Quantum-Ready Data Architecture — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/quantum-ready-data-architecture",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/quantum-ready-data-architecture.html"),
    "utf8"
  );
}

export default function QuantumReadyDataArchitecturePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
