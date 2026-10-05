import { EngineeringConsultationForm } from "@/components/forms/EngineeringConsultationForm";
import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { siteContent } from "@/config/site-content";

export function ConsultationFormSection() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        <div className="lg:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm">
          <div className="mb-stack-md">
            <h2 className="font-headline-lg text-headline-lg mb-2">
              Engineering Consultation Enquiry
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Share your product requirement, interfaces, current design status, timeline,
              and any confidentiality needs so we can review the scope accurately.
            </p>
          </div>
          <EngineeringConsultationForm />
        </div>

        <div className="lg:col-span-4 space-y-stack-md">
          <div className="bg-primary-container p-stack-md rounded-xl text-on-primary-fixed border border-primary-container">
            <h3 className="font-headline-md text-headline-md mb-stack-sm text-surface-bright">
              Contact Details
            </h3>
            <CompanyContactBlock variant="full" tone="inverse" />
          </div>

          <div className="bg-surface-container-highest p-stack-md rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md mb-stack-sm">
              Confidentiality
            </h3>
            <p className="font-body-md text-on-surface-variant">
              {siteContent.confidentialityShort}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
