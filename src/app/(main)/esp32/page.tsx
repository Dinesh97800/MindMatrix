import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ESP32",
  description: "Mind Matrix ESP32 — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/esp32",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/esp32.html"),
    "utf8"
  );
}

export default function Esp32Page() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
