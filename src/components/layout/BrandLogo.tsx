import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

/**
 * Navbar logo — PNG has a black matte; mix-blend-lighten hides it on light headers.
 * Image is zoomed inside a clip so the mark is legible at bar height.
 */
export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`relative block h-14 w-[118px] sm:h-10 sm:w-[136px] shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${className}`}
      aria-label="Mind Matrix Intelligent Solutions — Home"
    >
      <Image
        src="/mind-matrix-logo.png"
        alt="Mind Matrix Intelligent Solutions"
        width={100}
        height={100}
        priority
        className="absolute left-1/2 top-1/2 h-[138px] w-[138px] max-w-none -translate-x-1/2 -translate-y-[46%] mix-blend-lighten dark:mix-blend-normal pointer-events-none select-none"
      />
    </Link>
  );
}
