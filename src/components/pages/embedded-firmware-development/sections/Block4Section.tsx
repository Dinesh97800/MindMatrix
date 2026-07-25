import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-24 bg-primary-container relative overflow-hidden"}><div className={"absolute inset-0 opacity-10 pointer-events-none"}><div className={"absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"}></div></div><div className={"relative z-10 max-w-container-max mx-auto px-margin-desktop text-center"}><h2 className={"font-display-lg text-headline-lg text-white mb-stack-md"}>{"Ready to build the foundation of your device?"}</h2><p className={"text-white/70 font-body-lg text-body-lg mb-stack-lg max-w-2xl mx-auto"}>{"Our firmware experts are standing by to review your architecture and discuss your mission-critical requirements."}</p><div className={"flex flex-col sm:flex-row gap-stack-sm justify-center"}><Link href={"/request-consultation"} className={"bg-white text-primary font-label-sm text-label-sm px-10 py-5 rounded-lg hover:bg-surface-container transition-all"}>{"Schedule Technical Review"}</Link><Link href={"/contact-us"} className={"border border-white/30 text-white font-label-sm text-label-sm px-10 py-5 rounded-lg hover:bg-white/10 transition-all"}>{"Contact Sales"}</Link></div></div></section>
    </>
  );
}
