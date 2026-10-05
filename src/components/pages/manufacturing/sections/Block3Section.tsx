import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg bg-white relative overflow-hidden"}><div className={"absolute inset-0 opacity-[0.03] pointer-events-none"}><div className={"technical-grid w-full h-full"}></div></div><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-stack-md"}>{"Ready to Modernize?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"Schedule a deep-dive technical session with our industrial systems engineers to map your path to Industry 4.0."}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-md"}><Link href={"/manufacturing"} className={"bg-primary text-on-primary font-label-sm text-label-sm px-12 py-5 rounded-DEFAULT hover:bg-secondary transition-all shadow-xl hover:shadow-secondary/20 active:scale-95"}>{"\n                    Optimize Production Now\n                "}</Link><Link href={"/manufacturing"} className={"border border-outline text-primary font-label-sm text-label-sm px-12 py-5 rounded-DEFAULT hover:bg-surface-container transition-all active:scale-95"}>{"\n                    Request Technical Audit\n                "}</Link></div></div></section>
    </>
  );
}
