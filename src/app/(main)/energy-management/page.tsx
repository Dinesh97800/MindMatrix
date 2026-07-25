import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Energy Management",
  description: "Mind Matrix Energy Management — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/energy-management",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/energy-management.html"),
    "utf8"
  );
}

export default function EnergyManagementPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
