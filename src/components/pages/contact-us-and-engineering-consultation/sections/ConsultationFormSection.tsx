import { EngineeringConsultationForm } from "@/components/forms/EngineeringConsultationForm";

export function ConsultationFormSection() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        <div className="lg:col-span-8 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm">
          <div className="mb-stack-md">
            <h2 className="font-headline-lg text-headline-lg mb-2">
              Request Technical Spec
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Please provide high-level project parameters to route your inquiry
              to the correct discipline lead.
            </p>
          </div>
          <EngineeringConsultationForm />
        </div>

        <div className="lg:col-span-4 space-y-stack-md">
          <div className="bg-primary-container p-stack-md rounded-xl text-on-primary-fixed border border-primary-container">
            <h3 className="font-headline-md text-headline-md mb-stack-sm text-surface-bright">
              Corporate Identity
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-label-sm text-on-primary-container">LEGAL ENTITY</p>
                <p className="font-body-md">Mind Matrix Workspace AG</p>
              </div>
              <div>
                <p className="font-label-sm text-on-primary-container">REGISTRATION</p>
                <p className="font-body-md">CHE-109.832.441 VAT</p>
              </div>
              <div>
                <p className="font-label-sm text-on-primary-container">
                  GLOBAL HEADQUARTERS
                </p>
                <p className="font-body-md">
                  Innovation Campus Nord, 8005 Zürich, Switzerland
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-highest p-stack-md rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md mb-stack-sm">
              Operational Windows
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="font-label-sm">EMEA (CET)</span>
                <span className="font-body-md">08:00 — 18:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="font-label-sm">AMER (PST)</span>
                <span className="font-body-md">07:00 — 17:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                <span className="font-label-sm">APAC (JST)</span>
                <span className="font-body-md">09:00 — 19:00</span>
              </div>
              <p className="text-[10px] text-on-surface-variant pt-2">
                L2 Support Engineers available 24/7 for Tier 1 Enterprise Partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
