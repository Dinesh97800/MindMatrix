import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RenesasPageContent } from "@/components/pages/renesas/RenesasPageContent";

export const metadata: Metadata = pageMetadata("/renesas");

export default function RenesasPage() {
  return <RenesasPageContent />;
}
