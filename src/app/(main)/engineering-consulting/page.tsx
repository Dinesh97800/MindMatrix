import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EngineeringConsultingPageContent } from "@/components/pages/engineering-consulting/EngineeringConsultingPageContent";

export const metadata: Metadata = pageMetadata("/engineering-consulting");

export default function EngineeringConsultingPage() {
  return <EngineeringConsultingPageContent />;
}
