import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-stack-lg bg-surface-container relative overflow-hidden"}><div className={"px-margin-desktop max-w-container-max mx-auto relative z-10 text-center py-stack-lg"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg mb-stack-md"}>{"Ready to Modernize?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"Contact our grid engineering specialists for a technical feasibility assessment of your current infrastructure."}</p><div className={"flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-gutter"}><Link href={"/solutions"} className={"w-full md:w-auto bg-primary text-on-primary px-12 py-5 rounded-lg font-label-sm text-label-sm font-bold shadow-lg hover:shadow-primary/20 transition-all"}>{"Optimize Your Grid"}</Link><Link href={"/request-consultation"} className={"w-full md:w-auto border border-outline text-primary px-12 py-5 rounded-lg font-label-sm text-label-sm font-bold hover:bg-white transition-all"}>{"Schedule Tech Demo"}</Link></div></div></section>
    </>
  );
}
