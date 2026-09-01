import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FaqPageContent } from "@/components/pages/faq/FaqPageContent";

export const metadata: Metadata = pageMetadata("/faq");

export default function FaqPage() {
  return <FaqPageContent />;
}
