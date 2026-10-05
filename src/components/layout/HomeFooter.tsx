import Link from "next/link";
import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { footerColumns } from "@/config/navigation";
import { copyrightNotice, siteContent } from "@/config/site-content";

export function HomeFooter() {
  const primaryColumns = footerColumns.slice(0, 5);

  return (
    <footer className="bg-primary-container dark:bg-primary-container border-t border-outline/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter mb-stack-lg">
          {primaryColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-on-primary-container font-bold mb-4 text-label-sm uppercase tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-on-primary-container/70 hover:text-on-primary-container transition-all text-label-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-gutter border-t border-white/10 pt-stack-md">
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="text-headline-md font-display-lg text-on-primary-container">
              {siteContent.legalName}
            </div>
            <p className="text-on-primary-container/70 max-w-xl font-body-md">
              {siteContent.footerTagline}
            </p>
            <CompanyContactBlock variant="compact" />
          </div>

          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {footerColumns.slice(5).map((column) => (
              <div key={column.title}>
                <h4 className="text-on-primary-container font-bold mb-3 text-label-sm uppercase tracking-wider">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-on-primary-container/70 hover:text-on-primary-container transition-all text-label-sm"
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

        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-primary-container/70 text-label-sm text-center md:text-left">
            {copyrightNotice()}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="text-on-primary-container/70 hover:text-on-primary-container text-label-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-on-primary-container/70 hover:text-on-primary-container text-label-sm">
              Terms of Website Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
