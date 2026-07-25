import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { WirelessSensorNetworkPageContent } from "@/components/pages/wireless-sensor-network/WirelessSensorNetworkPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Wireless Sensor Network",
  description: "Mind Matrix Wireless Sensor Network — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/wireless-sensor-network",
  keywords: ["mind matrix","embedded systems","wireless","sensor","network"],
});

export default function WirelessSensorNetworkPage() {
  return <WirelessSensorNetworkPageContent />;
}
