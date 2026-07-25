import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ApplicationNotesAndDesignGuidesPageContent } from "@/components/pages/application-notes-and-design-guides/ApplicationNotesAndDesignGuidesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Application Notes & Design Guides",
  description: "Mind Matrix Application Notes & Design Guides — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/application-notes-and-design-guides",
  keywords: ["mind matrix","embedded systems","application","notes","and","design","guides"],
});

export default function ApplicationNotesAndDesignGuidesPage() {
  return <ApplicationNotesAndDesignGuidesPageContent />;
}
