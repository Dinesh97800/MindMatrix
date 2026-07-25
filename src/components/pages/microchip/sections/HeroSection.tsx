import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <section className={"relative min-h-[819px] flex flex-col justify-center overflow-hidden border-b border-outline-variant/10"}><div className={"relative z-10 px-margin-desktop max-w-container-max mx-auto w-full"}><div className={"max-w-3xl"}><span className={"inline-block px-3 py-1 mb-6 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-widest"}>{"Architectural Foundation"}</span><h1 className={"font-display-lg text-display-lg mb-8 text-primary leading-none"}>{"Embedded Intelligence for Mission-Critical Engineering."}</h1><p className={"font-body-lg text-body-lg text-on-surface-variant mb-12 leading-relaxed"}>{"\n                        Precision-engineered Microchip solutions spanning PIC, AVR, and SAM architectures. We bridge the gap between legacy reliability and high-performance modern integration for global industrial leadership.\n                    "}</p><div className={"flex gap-4"}><Link href={"/connectivity"} className={"bg-primary text-on-primary px-8 py-4 rounded-lg font-label-sm text-label-sm flex items-center gap-2 technical-glow transition-all"}>{"\n                            EXPLORE ARCHITECTURES\n                            "}<span className={"material-symbols-outlined text-sm"}>{"arrow_forward"}</span></Link><Link href={"/connectivity"} className={"border border-outline px-8 py-4 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-all"}>{"VIEW DATASHEETS"}</Link></div></div></div></section>
    </>
  );
}
