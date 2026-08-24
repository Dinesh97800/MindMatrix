import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IotPageContent } from "@/components/pages/iot/IotPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT",
  description:
    "Mind Matrix Industrial IoT — gateway firmware, edge data collection, protocol integration, and remote monitoring for connected industrial products.",
  path: "/iot",
  keywords: ["mind matrix", "embedded systems", "industrial iot", "gateway", "edge"],
});

export default function IotPage() {
  return <IotPageContent />;
}
