import Link from "next/link";
import { getBreadcrumbs } from "@/config/navigation";

interface BreadcrumbsProps {
  pathname: string;
}

export function Breadcrumbs({ pathname }: BreadcrumbsProps) {
  const crumbs = getBreadcrumbs(pathname);
  if (crumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3 border-b border-outline-variant/10 bg-surface-container-low/50"
    >
      <ol className="flex flex-wrap items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.href}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-outline-variant" aria-hidden>
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-primary font-bold" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
