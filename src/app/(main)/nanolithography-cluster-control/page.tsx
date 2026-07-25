import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Nanolithography Cluster Control",
  description: "Mind Matrix Nanolithography Cluster Control — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nanolithography-cluster-control",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/nanolithography-cluster-control.html"),
    "utf8"
  );
}

export default function NanolithographyClusterControlPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
