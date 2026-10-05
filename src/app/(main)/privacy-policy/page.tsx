import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy/PrivacyPolicyPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Mind Matrix Privacy Policy — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/privacy-policy",
  keywords: ["mind matrix","embedded systems","privacy","policy"],
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageContent />;
}
