import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SNMP Alarm Gateway",
  description: "Mind Matrix SNMP Alarm Gateway — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/snmp-alarm-gateway",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/snmp-alarm-gateway.html"),
    "utf8"
  );
}

export default function SnmpAlarmGatewayPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
