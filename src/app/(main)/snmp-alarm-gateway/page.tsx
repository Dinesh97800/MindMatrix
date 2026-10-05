import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SnmpAlarmGatewayPageContent } from "@/components/pages/snmp-alarm-gateway/SnmpAlarmGatewayPageContent";

export const metadata: Metadata = pageMetadata("/snmp-alarm-gateway");

export default function SnmpAlarmGatewayPage() {
  return <SnmpAlarmGatewayPageContent />;
}
