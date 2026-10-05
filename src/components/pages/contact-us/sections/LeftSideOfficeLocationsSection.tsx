import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { companyContact } from "@/config/company";
import { ContactUsForm } from "@/components/forms/ContactUsForm";

export function LeftSideOfficeLocationsSection() {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-stack-md">
        <div className="glass-card rounded-lg border border-outline-variant/30 p-stack-md technical-glow transition-all">
          <div className="mb-stack-md flex items-start gap-stack-sm">
            <span className="material-symbols-outlined text-3xl text-primary">
              location_on
            </span>
            <CompanyContactBlock variant="full" />
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant/30 bg-primary-container p-stack-md">
          <h4 className="mb-stack-sm font-label-sm uppercase tracking-widest text-on-primary-container">
            Business Enquiries
          </h4>
          <p className="font-body-md text-on-primary-container/80">
            For project discussions, technical support, and general enquiries,
            reach us at{" "}
            <a
              href={`mailto:${companyContact.email}`}
              className="font-semibold text-secondary underline-offset-2 hover:underline"
            >
              {companyContact.email}
            </a>
            .
          </p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <div className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-stack-lg shadow-xl">
          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Project Inquiry
            </h2>
            <p className="mt-2 font-body-md text-on-surface-variant">
              Share your requirements and our engineering team will respond.
            </p>
          </div>

          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}
