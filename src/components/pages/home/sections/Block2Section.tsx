import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg bg-primary-container relative"}><div className={"absolute inset-0 overflow-hidden pointer-events-none opacity-20"}><div className={"absolute -right-1/4 -top-1/4 w-1/2 h-full bg-secondary-container blur-[160px] rounded-full"}></div></div><div className={"max-w-container-max mx-auto px-margin-desktop text-center relative z-10"}><div className={"max-w-3xl mx-auto space-y-8"}><h2 className={"font-display-lg text-display-lg text-white"}>{"Ready to Architect Your Next Innovation?"}</h2><p className={"text-on-primary-container font-body-lg"}>{"Connect with our senior engineering team to discuss your technical challenges and project scope."}</p><div className={"flex flex-col sm:flex-row items-center justify-center gap-4"}><Link href={"/request-consultation"} className={"w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-full font-label-sm text-label-sm font-bold hover:bg-primary-fixed transition-all"}>{"Schedule a Technical Call"}</Link><Link href={"/technical-downloads-and-sdks"} className={"w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-full font-label-sm text-label-sm font-bold hover:bg-white/10 transition-all"}>{"Download Service Brochure"}</Link></div></div></div></section>
    </>
  );
}
