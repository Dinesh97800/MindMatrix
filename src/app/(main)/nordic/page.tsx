import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { NordicPageContent } from "@/components/pages/nordic/NordicPageContent";

export const metadata: Metadata = pageMetadata("/nordic");

export default function NordicPage() {
  return <NordicPageContent />;
}
