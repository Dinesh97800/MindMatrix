import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SnmpAlarmGatewayPageContent } from "@/components/pages/snmp-alarm-gateway/SnmpAlarmGatewayPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "SNMP Alarm Gateway",
  description: "Mind Matrix SNMP Alarm Gateway — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/snmp-alarm-gateway",
  keywords: ["mind matrix","embedded systems","snmp","alarm","gateway"],
});

export default function SnmpAlarmGatewayPage() {
  return <SnmpAlarmGatewayPageContent />;
}
