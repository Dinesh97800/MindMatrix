import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg text-center relative grid-overlay"}><div className={"container-max mx-auto px-margin-desktop"}><div className={"max-w-3xl mx-auto"}><h2 className={"font-display-lg text-headline-lg mb-6"}>{"Ready to Engineer the Future of Urban Infrastructure?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant mb-10"}>{"Join leading architectural firms and property developers in building a more efficient, responsive world."}</p><div className={"flex flex-col sm:flex-row justify-center gap-4"}><Link href={"/cognitive-core-os"} className={"bg-primary text-on-primary px-10 py-5 rounded-lg font-label-sm text-label-sm text-[16px] hover:bg-secondary transition-all shadow-xl hover:shadow-primary/20"}>{"Build Smarter Now"}</Link><Link href={"/cognitive-core-os"} className={"bg-white border border-outline px-10 py-5 rounded-lg font-label-sm text-label-sm text-[16px] hover:bg-surface-container transition-all"}>{"Talk to an Engineer"}</Link></div></div></div></section>
    </>
  );
}
