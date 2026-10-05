import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomePageContent } from "@/components/pages/home/HomePageContent";

export const metadata: Metadata = pageMetadata("/");

export default function HomePage() {
  return <HomePageContent />;
}
