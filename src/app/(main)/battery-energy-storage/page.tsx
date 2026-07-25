import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BatteryEnergyStoragePageContent } from "@/components/pages/battery-energy-storage/BatteryEnergyStoragePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Energy Storage",
  description: "Mind Matrix Battery Energy Storage — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/battery-energy-storage",
  keywords: ["mind matrix","embedded systems","battery","energy","storage"],
});

export default function BatteryEnergyStoragePage() {
  return <BatteryEnergyStoragePageContent />;
}
