import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutUsPageContent } from "@/components/pages/about-us/AboutUsPageContent";

export const metadata: Metadata = pageMetadata("/about-us");

export default function AboutUsPage() {
  return <AboutUsPageContent />;
}
