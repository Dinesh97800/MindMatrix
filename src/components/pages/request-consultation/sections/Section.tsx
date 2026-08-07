import { siteContent } from "@/config/site-content";

export function Section() {
  return (
    <section className="bg-surface-container py-16 md:py-24 mt-16 md:mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            Confidentiality
          </p>
          <h2 className="font-headline-lg text-headline-lg">
            Project Information Handled Responsibly
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            {siteContent.confidentialityStatement}
          </p>
        </div>
      </div>
    </section>
  );
}
