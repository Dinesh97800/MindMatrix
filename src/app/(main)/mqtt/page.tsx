import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "MQTT",
  description: "Mind Matrix MQTT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/mqtt",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/mqtt.html"),
    "utf8"
  );
}

export default function MqttPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
