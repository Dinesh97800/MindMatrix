import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CareersPageContent } from "@/components/pages/careers/CareersPageContent";

export const metadata: Metadata = pageMetadata("/careers");

export default function CareersPage() {
  return <CareersPageContent />;
}
