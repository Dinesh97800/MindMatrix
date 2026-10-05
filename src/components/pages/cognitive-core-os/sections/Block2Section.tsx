import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg bg-background relative overflow-hidden"}><div className={"max-w-container-max mx-auto px-margin-desktop text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg mb-stack-md"}>{"Ready to optimize your"}<br />{"deterministic workload?"}</h2><div className={"flex flex-col md:flex-row gap-stack-md justify-center mt-stack-lg"}><Link href={"/industrial-automation"} className={"bg-primary text-on-primary px-10 py-4 font-label-sm text-label-sm hover:scale-[1.02] transition-all"}>{"Request a Technical Deep-Dive"}</Link><Link href={"/industrial-automation"} className={"border border-outline px-10 py-4 font-label-sm text-label-sm hover:bg-surface-container transition-all"}>{"Download whitepaper"}</Link></div></div><div className={"absolute top-0 left-0 w-full h-full flex justify-center opacity-[0.03] pointer-events-none"}><span className={"text-[400px] font-bold select-none"}>{"ENGINEERING"}</span></div></section>
    </>
  );
}
