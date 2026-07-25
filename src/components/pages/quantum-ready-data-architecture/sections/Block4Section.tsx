import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-24 relative overflow-hidden bg-primary"}><div className={"absolute inset-0 z-0"}></div><div className={"relative z-10 px-margin-desktop max-w-container-max mx-auto text-center"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg text-on-primary mb-stack-md"}>{"Secure Your Digital Perimeter"}</h2><p className={"font-body-lg text-body-lg text-on-primary/70 mb-stack-lg max-w-2xl mx-auto"}>{"Our engineering team is ready to audit your existing infrastructure and design a roadmap for quantum resilience."}</p><div className={"flex flex-col md:flex-row gap-stack-md justify-center"}><Link href={"/industrial-iot-solutions"} className={"px-10 py-5 bg-white text-primary font-label-sm text-label-sm tracking-widest uppercase hover:bg-secondary hover:text-white transition-all shadow-xl"}>{"Audit Your Infrastructure Security"}</Link><Link href={"/industrial-iot-solutions"} className={"px-10 py-5 border border-white/30 text-on-primary font-label-sm text-label-sm tracking-widest uppercase hover:bg-white/10 transition-all"}>{"Download Technical Spec"}</Link></div></div></section>
    </>
  );
}
