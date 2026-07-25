import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Connectivity",
  description: "Mind Matrix Connectivity — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/connectivity",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/connectivity.html"),
    "utf8"
  );
}

export default function ConnectivityPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
