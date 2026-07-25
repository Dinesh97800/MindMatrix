import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EnergyManagementPageContent } from "@/components/pages/energy-management/EnergyManagementPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Energy Management",
  description: "Mind Matrix Energy Management — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/energy-management",
  keywords: ["mind matrix","embedded systems","energy","management"],
});

export default function EnergyManagementPage() {
  return <EnergyManagementPageContent />;
}
