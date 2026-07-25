import Link from "next/link";

export function Section() {
  return (
    <>
      <section className={"py-24 px-margin-desktop"}><div className={"max-w-container-max mx-auto bg-primary rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden"}><div className={"relative z-10"}><h2 className={"font-display-lg text-headline-lg text-white mb-stack-md"}>{"Ready to optimize your Edge?"}</h2><p className={"text-on-primary-container max-w-xl mx-auto mb-stack-lg text-lg"}>{"Partner with Mind Matrix to engineer a robust, scalable, and secure Embedded Linux platform for your next industrial innovation."}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-md"}><Link href={"/technologies"} className={"bg-white text-primary px-10 py-5 rounded-lg font-bold text-lg hover:bg-primary-fixed transition-all active:scale-95"}>{"Speak to an Architect"}</Link><Link href={"/technical-downloads-and-sdks"} className={"text-white border border-white/20 px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"}>{"Download Capability Statement"}</Link></div></div></div></section>
    </>
  );
}
