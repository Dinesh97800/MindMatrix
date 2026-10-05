import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-24 relative overflow-hidden bg-primary text-white text-center"}><div className={"relative z-10 px-margin-desktop max-w-container-max mx-auto"}><h2 className={"font-display-lg text-display-lg mb-8"}>{"Ready to Build the Future?"}</h2><p className={"font-body-lg text-body-lg text-white/70 max-w-xl mx-auto mb-12"}>{"\n                    Partner with Mind Matrix and leverage our world-class engineering team to bring your product vision to life.\n                "}</p><div className={"flex flex-col md:flex-row gap-6 justify-center items-center"}><Link href={"/manufacturing"} className={"bg-white text-primary px-10 py-5 rounded font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-all"}>{"Schedule a Consult"}</Link><Link href={"/technical-downloads-and-sdks"} className={"text-white border-b border-white/40 pb-1 font-label-sm text-label-sm uppercase tracking-widest hover:border-white transition-all"}>{"Download Services Guide"}</Link></div></div></section>
    </>
  );
}
