import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RequestConsultationPageContent } from "@/components/pages/request-consultation/RequestConsultationPageContent";

export const metadata: Metadata = pageMetadata("/request-consultation");

export default function RequestConsultationPage() {
  return <RequestConsultationPageContent />;
}
