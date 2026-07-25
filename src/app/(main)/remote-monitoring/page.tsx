import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Remote Monitoring",
  description: "Mind Matrix Remote Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/remote-monitoring",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/remote-monitoring.html"),
    "utf8"
  );
}

export default function RemoteMonitoringPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
