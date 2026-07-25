import Link from "next/link";

export function BackgroundDecorativeElementSection() {
  return (
    <>
      <section className={"py-32 bg-primary text-on-primary text-center relative overflow-hidden"}><div className={"absolute inset-0 opacity-10 technical-grid pointer-events-none"}></div><div className={"max-w-container-max mx-auto px-margin-desktop relative z-10"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg text-white mb-8"}>{"Ready for Absolute Precision?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-12"}>{"\n                    Consult with our systems engineers to integrate Mind Matrix measurement solutions into your existing testing infrastructure.\n                "}</p><div className={"flex flex-col sm:flex-row justify-center gap-6"}><Link href={"/embedded-measurement-system"} className={"bg-white text-primary px-10 py-5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2"}>{"\n                        Schedule Lab Demo\n                        "}<span className={"material-symbols-outlined"}>{"event"}</span></Link><Link href={"/embedded-measurement-system"} className={"border border-white/20 text-white px-10 py-5 rounded-lg font-label-sm text-label-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"}>{"\n                        Download Datasheet\n                        "}<span className={"material-symbols-outlined"}>{"download"}</span></Link></div></div></section>
    </>
  );
}
