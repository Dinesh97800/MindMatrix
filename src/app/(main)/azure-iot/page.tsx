import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AzureIotPageContent } from "@/components/pages/azure-iot/AzureIotPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Azure IoT",
  description: "Mind Matrix Azure IoT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/azure-iot",
  keywords: ["mind matrix","embedded systems","azure","iot"],
});

export default function AzureIotPage() {
  return <AzureIotPageContent />;
}
