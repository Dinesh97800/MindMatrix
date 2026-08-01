import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { companyContact } from "@/config/company";

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

          <form className="space-y-stack-md">
            <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-label-sm uppercase text-on-surface-variant">
                  Full Name
                </label>
                <input
                  className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
                  placeholder="Your name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-sm uppercase text-on-surface-variant">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
                  placeholder="you@company.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-sm uppercase text-on-surface-variant">
                Subject
              </label>
              <input
                className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
                placeholder="How can we help?"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-sm uppercase text-on-surface-variant">
                Message
              </label>
              <textarea
                className="w-full rounded-lg border-transparent bg-surface-container-low p-4 font-body-md transition-all focus:border-primary focus:ring-0"
                placeholder="Describe your project or enquiry..."
                rows={5}
              />
            </div>

            <div className="pt-stack-md">
              <button
                className="flex w-full items-center justify-center gap-stack-sm rounded-lg bg-primary py-5 font-label-sm uppercase tracking-[0.2em] text-on-primary transition-all hover:bg-secondary active:scale-[0.98]"
                type="submit"
              >
                Send Enquiry
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
