import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RequestConsultationPageContent } from "@/components/pages/request-consultation/RequestConsultationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Request Consultation",
  description: "Mind Matrix Request Consultation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/request-consultation",
  keywords: ["mind matrix","embedded systems","request","consultation"],
});

export default function RequestConsultationPage() {
  return <RequestConsultationPageContent />;
}
