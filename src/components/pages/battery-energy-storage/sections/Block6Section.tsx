import Link from "next/link";

export function Block6Section() {
  return (
    <>
      <section className={"py-stack-lg relative overflow-hidden"}><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><div className={"max-w-3xl mx-auto"}><h2 className={"font-display-lg text-display-lg mb-stack-md"}>{"Ready to secure the future of energy?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant mb-stack-lg"}>{"Our engineering team is ready to discuss your BESS requirements, from initial proof-of-concept to utility-scale deployment."}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-md"}><Link href={"/battery-management-system"} className={"bg-primary text-on-primary px-12 py-5 font-label-sm text-label-sm hover:bg-primary/90 transition-all"}>{"\n                        Engineer Your Storage Solution\n                    "}</Link><Link href={"/battery-management-system"} className={"bg-transparent border border-outline px-12 py-5 font-label-sm text-label-sm hover:border-primary transition-all"}>{"\n                        View Technical Specs\n                    "}</Link></div></div></div></section>
    </>
  );
}
