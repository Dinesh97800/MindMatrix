import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Management System",
  description: "Mind Matrix Battery Management System — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/battery-management-system",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/battery-management-system.html"),
    "utf8"
  );
}

export default function BatteryManagementSystemPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
