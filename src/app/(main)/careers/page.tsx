import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CareersPageContent } from "@/components/pages/careers/CareersPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description: "Mind Matrix Careers — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/careers",
  keywords: ["mind matrix","embedded systems","careers"],
});

export default function CareersPage() {
  return <CareersPageContent />;
}
