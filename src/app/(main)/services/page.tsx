import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ServicesPageContent } from "@/components/pages/services/ServicesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description: "Mind Matrix Services — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/services",
  keywords: ["mind matrix","embedded systems","services"],
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
