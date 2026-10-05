import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AwsIotPageContent } from "@/components/pages/aws-iot/AwsIotPageContent";

export const metadata: Metadata = pageMetadata("/aws-iot");

export default function AwsIotPage() {
  return <AwsIotPageContent />;
}
