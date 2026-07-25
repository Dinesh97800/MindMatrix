import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactUsAndEngineeringConsultationPageContent } from "@/components/pages/contact-us-and-engineering-consultation/ContactUsAndEngineeringConsultationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us & Engineering Consultation",
  description: "Mind Matrix Contact Us & Engineering Consultation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/contact-us-and-engineering-consultation",
  keywords: ["mind matrix","embedded systems","contact","us","and","engineering","consultation"],
});

export default function ContactUsAndEngineeringConsultationPage() {
  return <ContactUsAndEngineeringConsultationPageContent />;
}
