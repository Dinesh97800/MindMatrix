import Link from "next/link";
import { CompanyContactBlock } from "@/components/layout/CompanyContactBlock";
import { footerColumns } from "@/config/navigation";

export function DefaultFooter() {
  return (
    <footer className="bg-primary-container dark:bg-primary-container border-t border-outline/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-12 gap-gutter mb-stack-lg">
          <div className="col-span-12 lg:col-span-3 mb-8 lg:mb-0">
            <div className="mb-4 text-headline-md font-display-lg text-on-primary-container">
              Mind Matrix
            </div>
            <p className="mb-6 max-w-sm font-body-md text-body-md text-on-primary-container/70">
              Engineering precision for the digital frontier. We provide elite
              technical solutions for global industrial leaders.
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
          <div className="text-on-primary-container/50 font-label-sm text-label-sm">
            © 2024 Mind Matrix Workspace. Engineering precision for the digital
            frontier.
          </div>
          <div className="flex gap-8">
            <Link
              href="/technical-knowledge-base"
              className="material-symbols-outlined text-on-primary-container/50 hover:text-on-primary-container transition-colors min-h-[44px] flex items-center"
              aria-label="Technical knowledge base"
            >
              terminal
            </Link>
            <Link
              href="/connectivity"
              className="material-symbols-outlined text-on-primary-container/50 hover:text-on-primary-container transition-colors min-h-[44px] flex items-center"
              aria-label="Connectivity"
            >
              lan
            </Link>
            <Link
              href="/engineering-process"
              className="material-symbols-outlined text-on-primary-container/50 hover:text-on-primary-container transition-colors min-h-[44px] flex items-center"
              aria-label="Engineering process"
            >
              token
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
