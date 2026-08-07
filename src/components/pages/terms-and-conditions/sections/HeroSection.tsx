import { siteContent } from "@/config/site-content";

export function HeroSection() {
  return (
    <header className="border-b border-outline-variant/20 bg-white/50 px-margin-mobile py-stack-lg backdrop-blur-sm md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary/60">
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="font-display-lg text-display-lg tracking-tighter">
            Terms of Website Use
          </h1>
          <p className="font-body-md text-on-surface-variant">{siteContent.legalName}</p>
        </div>
      </div>
    </header>
  );
}
