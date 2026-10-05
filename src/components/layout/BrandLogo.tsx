import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex shrink-0 items-center min-h-[44px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${className}`}
      aria-label="Mind Matrix Intelligent Solutions — Home"
    >
      <Image
        src="/mind-matrix-logo.png"
        alt="Mind Matrix Intelligent Solutions"
        width={903}
        height={583}
        priority
        className="h-10 sm:h-12 w-auto object-contain object-left"
      />
    </Link>
  );
}
