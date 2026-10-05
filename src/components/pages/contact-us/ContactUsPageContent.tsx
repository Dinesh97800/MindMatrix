import { LeftSideOfficeLocationsSection } from "./sections/LeftSideOfficeLocationsSection";
import { siteContent } from "@/config/site-content";

export function ContactUsPageContent() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <header className="mb-stack-lg max-w-3xl">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
          Contact
        </span>
        <h1 className="font-display-lg text-display-lg text-primary mt-2 mb-4">
          Contact Us
        </h1>
        <p className="font-body-lg text-on-surface-variant">{siteContent.contactCta}</p>
      </header>
      <LeftSideOfficeLocationsSection />
    </main>
  );
}
