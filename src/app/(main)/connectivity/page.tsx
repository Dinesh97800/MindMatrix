import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ConnectivityPageContent } from "@/components/pages/connectivity/ConnectivityPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Connectivity",
  description: "Mind Matrix Connectivity — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/connectivity",
  keywords: ["mind matrix","embedded systems","connectivity"],
});

export default function ConnectivityPage() {
  return <ConnectivityPageContent />;
}
