import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BatteryManagementSystemPageContent } from "@/components/pages/battery-management-system/BatteryManagementSystemPageContent";

export const metadata: Metadata = pageMetadata("/battery-management-system");

export default function BatteryManagementSystemPage() {
  return <BatteryManagementSystemPageContent />;
}
