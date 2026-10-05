import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesPageContent } from "@/components/pages/services/ServicesPageContent";

export const metadata: Metadata = pageMetadata("/services");

export default function ServicesPage() {
  return <ServicesPageContent />;
}
