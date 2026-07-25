import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TermsAndConditionsPageContent } from "@/components/pages/terms-and-conditions/TermsAndConditionsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description: "Mind Matrix Terms & Conditions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/terms-and-conditions",
  keywords: ["mind matrix","embedded systems","terms","and","conditions"],
});

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsPageContent />;
}
