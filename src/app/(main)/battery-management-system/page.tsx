import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BatteryManagementSystemPageContent } from "@/components/pages/battery-management-system/BatteryManagementSystemPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Battery Management System",
  description: "Mind Matrix Battery Management System — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/battery-management-system",
  keywords: ["mind matrix","embedded systems","battery","management","system"],
});

export default function BatteryManagementSystemPage() {
  return <BatteryManagementSystemPageContent />;
}
