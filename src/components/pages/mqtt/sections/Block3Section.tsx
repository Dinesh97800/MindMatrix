import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-24 bg-surface grid-bg relative"}><div className={"max-w-container-max mx-auto px-margin-desktop text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg text-primary mb-stack-md"}>{"Engineered for the Digital Frontier"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"\n                    Ready to deploy mission-critical messaging? Our engineering team is standing by to assist with architectural audits and large-scale protocol migrations.\n                "}</p><div className={"flex justify-center gap-stack-sm"}><Link href={"/industrial-automation"} className={"bg-primary text-on-primary px-12 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary-container hover:text-on-secondary-container transition-all"}>{"\n                        Schedule Audit\n                    "}</Link></div></div></section>
    </>
  );
}
