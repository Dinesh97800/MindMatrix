import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Azure IoT",
  description: "Mind Matrix Azure IoT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/azure-iot",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/azure-iot.html"),
    "utf8"
  );
}

export default function AzureIotPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
