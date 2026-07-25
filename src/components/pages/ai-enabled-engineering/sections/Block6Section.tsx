import Link from "next/link";

export function Block6Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto"}><div className={"bg-primary-container rounded-2xl p-12 lg:p-24 relative overflow-hidden text-center"}><div className={"relative z-10"}><h2 className={"font-display-lg text-headline-lg lg:text-display-lg text-white mb-8"}>{"Ready to engineer the "}<span className={"text-secondary-fixed"}>{"autonomous future?"}</span></h2><p className={"text-white/60 text-body-lg mb-12 max-w-2xl mx-auto"}>{"Schedule a deep-dive session with our engineering team to discuss your hardware constraints and performance requirements."}</p><div className={"flex flex-col md:flex-row gap-6 justify-center"}><Link href={"/ai-enabled-engineering"} className={"bg-white text-primary-container px-10 py-5 font-bold rounded-lg hover:scale-105 transition-transform"}>{"Book Technical Audit"}</Link><Link href={"/ai-enabled-engineering"} className={"border border-white/20 text-white px-10 py-5 font-bold rounded-lg hover:bg-white/5 transition-colors"}>{"Download Ecosystem Guide"}</Link></div></div></div></section>
    </>
  );
}
