import Link from "next/link";
import {
  companyContact,
  formatCompanyAddress,
  formatGstinLabel,
} from "@/config/company";

interface CompanyContactBlockProps {
  variant?: "compact" | "full";
  className?: string;
}

export function CompanyContactBlock({
  variant = "compact",
  className = "",
}: CompanyContactBlockProps) {
  const address = formatCompanyAddress(variant === "full");

  if (variant === "full") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-1">
            {companyContact.legalName}
          </h3>
          <p className="font-label-sm text-on-secondary-container uppercase tracking-wider">
            Registered Office
          </p>
        </div>

        <address className="not-italic flex flex-col gap-1 border-l-2 border-primary/20 pl-4 font-body-md text-on-surface">
          <span>{companyContact.address.line1}</span>
          <span>
            {companyContact.address.city}, {companyContact.address.state}
          </span>
        </address>

        <div className="space-y-3">
          <Link
            href={`mailto:${companyContact.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 font-label-sm text-primary transition-colors hover:text-secondary"
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            {companyContact.email}
          </Link>
          <p className="font-label-sm text-on-surface-variant">{formatGstinLabel()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="font-label-sm font-semibold text-on-primary-container">
        {companyContact.legalName}
      </p>
      <address className="not-italic font-body-md text-sm leading-relaxed text-on-primary-container/70">
        {address}
      </address>
      <Link
        href={`mailto:${companyContact.email}`}
        className="inline-flex min-h-[44px] items-center gap-2 text-sm text-on-primary-container/80 transition-colors hover:text-on-primary-container"
      >
        <span className="material-symbols-outlined text-base">mail</span>
        {companyContact.email}
      </Link>
      <p className="text-xs leading-relaxed text-on-primary-container/60">
        {formatGstinLabel()}
      </p>
    </div>
  );
}
