import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT Gateway",
  description: "Mind Matrix Industrial IoT Gateway — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-iot-gateway",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/industrial-iot-gateway.html"),
    "utf8"
  );
}

export default function IndustrialIotGatewayPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
