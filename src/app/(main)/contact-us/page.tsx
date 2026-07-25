import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactUsPageContent } from "@/components/pages/contact-us/ContactUsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description: "Mind Matrix Contact Us — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/contact-us",
  keywords: ["mind matrix","embedded systems","contact","us"],
});

export default function ContactUsPage() {
  return <ContactUsPageContent />;
}
