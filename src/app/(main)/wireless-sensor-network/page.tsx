import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Wireless Sensor Network",
  description: "Mind Matrix Wireless Sensor Network — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/wireless-sensor-network",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/wireless-sensor-network.html"),
    "utf8"
  );
}

export default function WirelessSensorNetworkPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
