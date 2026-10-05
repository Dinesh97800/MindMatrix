import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto text-center"}><div className={"glass-card p-20 border-2 border-primary/5"}><h2 className={"font-display-lg text-headline-lg mb-6"}>{"Ready to Modernize Your Operations?"}</h2><p className={"text-on-surface-variant font-body-lg mb-10 max-w-2xl mx-auto"}>{"Schedule a technical deep-dive with our engineering team to map your path to Industrial 4.0."}</p><div className={"flex flex-col sm:flex-row gap-4 justify-center"}><Link href={"/manufacturing"} className={"bg-primary text-on-primary px-10 py-5 font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"}>{"Book a Consultation"}</Link><Link href={"/manufacturing"} className={"border border-outline-variant px-10 py-5 font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-surface-container transition-all"}>{"Download Technical Spec"}</Link></div></div></section>
    </>
  );
}
