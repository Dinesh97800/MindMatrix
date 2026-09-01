import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WirelessSensorNetworkPageContent } from "@/components/pages/wireless-sensor-network/WirelessSensorNetworkPageContent";

export const metadata: Metadata = pageMetadata("/wireless-sensor-network");

export default function WirelessSensorNetworkPage() {
  return <WirelessSensorNetworkPageContent />;
}
