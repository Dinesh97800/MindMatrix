import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IotPageContent } from "@/components/pages/iot/IotPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial IoT",
  description:
    "Mind Matrix Industrial IoT — embedded gateway development, data acquisition, protocol integration, and remote connectivity for industrial products.",
  path: "/iot",
  keywords: ["mind matrix", "embedded systems", "industrial", "iot", "gateway"],
});

export default function IotPage() {
  return <IotPageContent />;
}
