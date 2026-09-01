import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BatteryEnergyStoragePageContent } from "@/components/pages/battery-energy-storage/BatteryEnergyStoragePageContent";

export const metadata: Metadata = pageMetadata("/battery-energy-storage");

export default function BatteryEnergyStoragePage() {
  return <BatteryEnergyStoragePageContent />;
}
