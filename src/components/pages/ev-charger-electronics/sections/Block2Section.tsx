import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg relative overflow-hidden"}><div className={"absolute inset-0 bg-primary-container z-0"}></div><div className={"px-margin-desktop max-w-container-max mx-auto relative z-10 text-center py-20"}><h2 className={"font-display-lg text-display-lg text-white mb-8"}>{"Ready to Engineer the "}<br /><span className={"text-on-primary-container/40"}>{"Next Charging Era?"}</span></h2><p className={"text-on-primary-container/80 max-w-xl mx-auto mb-12 font-body-lg text-body-lg"}>{"\n                    Partner with Mind Matrix for custom module design, reference architectures, or full-stack power electronics production.\n                "}</p><div className={"flex flex-col sm:flex-row gap-4 justify-center"}><Link href={"/ev-charger-electronics"} className={"bg-white text-primary px-10 py-5 rounded font-label-sm text-label-sm uppercase tracking-widest font-bold hover:bg-on-primary-container transition-colors"}>{"Speak to an Engineer"}</Link><Link href={"/ev-charger-electronics"} className={"border border-white/20 text-white px-10 py-5 rounded font-label-sm text-label-sm uppercase tracking-widest hover:bg-white/10 transition-colors"}>{"Request Dev Kit"}</Link></div></div></section>
    </>
  );
}
