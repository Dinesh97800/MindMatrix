import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CognitiveCoreOsPageContent } from "@/components/pages/cognitive-core-os/CognitiveCoreOsPageContent";

export const metadata: Metadata = pageMetadata("/cognitive-core-os");

export default function CognitiveCoreOsPage() {
  return <CognitiveCoreOsPageContent />;
}
