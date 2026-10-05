import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop"}><div className={"bg-primary text-on-primary rounded-3xl p-12 lg:p-20 relative overflow-hidden"}><div className={"relative z-10 max-w-2xl"}><h2 className={"font-display-lg text-headline-lg lg:text-display-lg mb-8"}>{"Ready to architect your hardware future?"}</h2><p className={"text-on-primary/70 text-body-lg mb-12"}>{"Connect with our senior engineering team to discuss your technical roadmap and architectural requirements."}</p><div className={"flex flex-col sm:flex-row gap-4"}><Link href={"/manufacturing"} className={"bg-white text-primary px-8 py-4 rounded-lg font-bold hover:scale-[1.02] transition-transform"}>{"Schedule Tech Review"}</Link><Link href={"/manufacturing"} className={"border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"}>{"Speak to an Architect"}</Link></div></div></div></div></section>
    </>
  );
}
