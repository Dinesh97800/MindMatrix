import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Energy Storage",
  description: "Mind Matrix Battery Energy Storage — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/battery-energy-storage",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/battery-energy-storage.html"),
    "utf8"
  );
}

export default function BatteryEnergyStoragePage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
