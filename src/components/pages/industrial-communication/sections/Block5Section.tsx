import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-stack-lg bg-surface relative overflow-hidden"}><div className={"absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"}></div><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg mb-stack-md"}>{"Ready to Optimize Your "}<span className={"text-primary"}>{"Communication Fabric?"}</span></h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"Connect with our systems architects to design a deterministic, future-proof industrial network."}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-sm"}><Link href={"/industrial-communication"} className={"bg-primary text-white px-10 py-5 font-label-sm text-label-sm uppercase font-bold tracking-widest hover:bg-on-primary-fixed-variant transition-all"}>{"Schedule Technical Audit"}</Link><Link href={"/industrial-communication"} className={"border border-primary text-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all"}>{"Review Case Studies"}</Link></div></div></section>
    </>
  );
}
