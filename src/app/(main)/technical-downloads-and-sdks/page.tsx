import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TechnicalDownloadsAndSdksPageContent } from "@/components/pages/technical-downloads-and-sdks/TechnicalDownloadsAndSdksPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Downloads & SDKs",
  description: "Mind Matrix Technical Downloads & SDKs — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/technical-downloads-and-sdks",
  keywords: ["mind matrix","embedded systems","technical","downloads","and","sdks"],
});

export default function TechnicalDownloadsAndSdksPage() {
  return <TechnicalDownloadsAndSdksPageContent />;
}
