import Link from "next/link";
import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { footerColumns } from "@/config/navigation";
import { copyrightNotice, siteContent } from "@/config/site-content";

export function DefaultFooter() {
  return (
    <footer className="bg-primary-container dark:bg-primary-container border-t border-outline/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <div className="col-span-12 lg:col-span-3 mb-8 lg:mb-0">
            <div className="mb-4 text-headline-md font-display-lg text-on-primary-container">
              {siteContent.legalName}
            </div>
            <p className="mb-6 max-w-sm font-body-md text-body-md text-on-primary-container/70">
              {siteContent.footerTagline}
            </p>
            <CompanyContactBlock variant="compact" />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-gutter">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h5 className="text-on-primary font-label-sm text-label-sm mb-4 tracking-widest uppercase">
                    {column.title}
                  </h5>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="text-on-primary-container/70 font-body-md text-body-md hover:text-on-primary-container transition-all text-sm leading-snug block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-on-primary-container/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-on-primary-container/50 font-label-sm text-label-sm text-center md:text-left">
            {copyrightNotice()}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-on-primary-container/70 hover:text-on-primary-container text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-on-primary-container/70 hover:text-on-primary-container text-sm"
            >
              Terms of Website Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
