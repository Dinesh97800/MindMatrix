import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { companyContact } from "@/config/company";

export function InteractiveMapPlaceholderSection() {
  return (
    <section className="bg-white px-margin-desktop py-stack-lg">
      <div className="mx-auto max-w-container-max">
        <div className="mb-stack-lg">
          <h2 className="mb-2 font-headline-lg text-headline-lg">Our Office</h2>
          <p className="max-w-xl font-body-md text-on-surface-variant">
            {companyContact.legalName} is based in Gurugram, Haryana — serving
            engineering and industrial clients across India and internationally.
          </p>
        </div>

        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-stack-lg md:p-stack-md">
          <CompanyContactBlock variant="full" />
        </div>
      </div>
    </section>
  );
}
