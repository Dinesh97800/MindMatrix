import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EngineeringConsultingPageContent } from "@/components/pages/engineering-consulting/EngineeringConsultingPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Consulting",
  description: "Mind Matrix Engineering Consulting — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/engineering-consulting",
  keywords: ["mind matrix","embedded systems","engineering","consulting"],
});

export default function EngineeringConsultingPage() {
  return <EngineeringConsultingPageContent />;
}
