import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT Solutions",
  description: "Mind Matrix Industrial IoT Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-iot-solutions",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-iot-solutions.html"),
    "utf8"
  );
}

export default function IndustrialIotSolutionsPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
