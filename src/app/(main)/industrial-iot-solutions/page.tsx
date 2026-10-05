import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialIotSolutionsPageContent } from "@/components/pages/industrial-iot-solutions/IndustrialIotSolutionsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT Solutions",
  description: "Mind Matrix Industrial IoT Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-iot-solutions",
  keywords: ["mind matrix","embedded systems","industrial","iot","solutions"],
});

export default function IndustrialIotSolutionsPage() {
  return <IndustrialIotSolutionsPageContent />;
}
