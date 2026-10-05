import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg bg-primary-container relative overflow-hidden"}><div className={"absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/50 to-transparent opacity-50"}></div><div className={"relative z-10 px-margin-desktop max-w-container-max mx-auto text-center"}><div className={"max-w-3xl mx-auto space-y-6"}><h2 className={"font-display-lg text-display-lg text-primary-fixed"}>{"Ready to Engineer Your Next Chapter?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container"}>{"Partner with the technical authority trusted by the world's most complex engineering organizations."}</p><div className={"flex flex-col sm:flex-row justify-center gap-4 pt-6"}><Link href={"/case-studies"} className={"bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-DEFAULT font-bold hover:bg-white transition-all"}>{"Schedule a Technical Audit"}</Link><Link href={"/case-studies"} className={"border border-primary-fixed text-primary-fixed px-8 py-4 rounded-DEFAULT hover:bg-primary-fixed/10 transition-all"}>{"Download Capabilities Deck"}</Link></div></div></div></section>
    </>
  );
}
