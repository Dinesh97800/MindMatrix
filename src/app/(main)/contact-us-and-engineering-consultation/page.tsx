import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactUsAndEngineeringConsultationPageContent } from "@/components/pages/contact-us-and-engineering-consultation/ContactUsAndEngineeringConsultationPageContent";

export const metadata: Metadata = pageMetadata("/contact-us-and-engineering-consultation");

export default function ContactUsAndEngineeringConsultationPage() {
  return <ContactUsAndEngineeringConsultationPageContent />;
}
