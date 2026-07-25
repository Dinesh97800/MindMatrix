import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "The Future of Deterministic Edge Computing",
  description: "Mind Matrix The Future of Deterministic Edge Computing — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/the-future-of-deterministic-edge-computing",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/the-future-of-deterministic-edge-computing.html"),
    "utf8"
  );
}

export default function TheFutureOfDeterministicEdgeComputingPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
