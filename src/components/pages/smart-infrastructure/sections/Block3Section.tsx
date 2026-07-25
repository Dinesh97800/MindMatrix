import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-32 bg-primary relative overflow-hidden"}><div className={"relative z-10 px-margin-desktop max-w-container-max mx-auto text-center"}><h2 className={"text-display-lg font-display-lg text-white mb-stack-md"}>{"Ready to Modernize?"}</h2><p className={"text-body-lg text-on-primary-container max-w-2xl mx-auto mb-stack-lg"}>{"Connect with our systems engineers to discuss your city's digital transformation roadmap."}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-md"}><button className={"bg-white text-primary px-10 py-5 rounded-DEFAULT font-headline-md text-headline-md hover:bg-innovation-cyan hover:text-white transition-all shadow-xl"}>{"Connect Your City"}</button><Link href={"/technical-downloads-and-sdks"} className={"border border-white/20 text-white px-10 py-5 rounded-DEFAULT font-headline-md text-headline-md hover:bg-white/10 transition-all"}>{"Download Brochure"}</Link></div></div></section>
    </>
  );
}
