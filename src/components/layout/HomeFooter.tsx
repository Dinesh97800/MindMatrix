import Link from "next/link";
import { footerColumns } from "@/config/navigation";

export function HomeFooter() {
  const primaryColumns = footerColumns.slice(0, 6);

  return (
    <footer className="bg-primary-container dark:bg-primary-container border-t border-outline/20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter mb-stack-lg">
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
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="text-headline-md font-display-lg text-on-primary-container">
              Mind Matrix
            </div>
            <p className="text-on-primary-container/70 max-w-xs font-body-md">
              Engineering precision for the digital frontier. Dedicated to robust
              embedded systems and hardware innovation since 2006.
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-5">
            <h4 className="text-on-primary-container font-bold mb-4 text-label-sm uppercase tracking-wider">
              Stay Updated
            </h4>
            <div className="flex gap-2 mb-4">
              <input
                className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg flex-grow focus:ring-2 focus:ring-outline-variant focus:border-transparent outline-none font-body-md min-h-[44px]"
                placeholder="Engineering insights to your inbox"
                type="email"
                aria-label="Email address"
              />
              <Link
                href="/contact-us"
                className="bg-white text-primary px-4 py-3 rounded-lg font-bold text-label-sm hover:bg-white/90 transition-all min-h-[44px] inline-flex items-center justify-center"
              >
                Join
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 grid grid-cols-2 gap-4">
            {footerColumns.slice(6).map((column) => (
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

        <div className="col-span-12 pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-primary-container/70 text-label-sm">
            © 2024 Mind Matrix Workspace. Engineering precision for the digital
            frontier.
          </p>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-on-primary-container/70 hover:text-on-primary-container transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="About Mind Matrix"
            >
              <span className="material-symbols-outlined">public</span>
            </Link>
            <Link
              href="/connectivity"
              className="text-on-primary-container/70 hover:text-on-primary-container transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Connectivity solutions"
            >
              <span className="material-symbols-outlined">lan</span>
            </Link>
            <Link
              href="/technologies"
              className="text-on-primary-container/70 hover:text-on-primary-container transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Technologies"
            >
              <span className="material-symbols-outlined">memory</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
