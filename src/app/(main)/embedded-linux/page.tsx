import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EmbeddedLinuxPageContent } from "@/components/pages/embedded-linux/EmbeddedLinuxPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Linux",
  description: "Mind Matrix Embedded Linux — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-linux",
  keywords: ["mind matrix","embedded systems","embedded","linux"],
});

export default function EmbeddedLinuxPage() {
  return <EmbeddedLinuxPageContent />;
}
