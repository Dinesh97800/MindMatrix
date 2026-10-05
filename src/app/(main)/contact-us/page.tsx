import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactUsPageContent } from "@/components/pages/contact-us/ContactUsPageContent";

export const metadata: Metadata = pageMetadata("/contact-us");

export default function ContactUsPage() {
  return <ContactUsPageContent />;
}
