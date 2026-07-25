import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialIotGatewayPageContent } from "@/components/pages/industrial-iot-gateway/IndustrialIotGatewayPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT Gateway",
  description: "Mind Matrix Industrial IoT Gateway — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-iot-gateway",
  keywords: ["mind matrix","embedded systems","industrial","iot","gateway"],
});

export default function IndustrialIotGatewayPage() {
  return <IndustrialIotGatewayPageContent />;
}
