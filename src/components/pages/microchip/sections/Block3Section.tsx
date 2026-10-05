import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-24 px-margin-desktop max-w-container-max mx-auto text-center"}><div className={"max-w-2xl mx-auto"}><h2 className={"font-display-lg text-headline-lg mb-8"}>{"Ready to architect your next innovation?"}</h2><p className={"text-on-surface-variant mb-12 text-body-lg"}>{"Connect with our systems architects to define the optimal silicon strategy for your technical roadmap."}</p><div className={"flex flex-wrap justify-center gap-6"}><Link href={"/connectivity"} className={"bg-primary text-on-primary px-10 py-4 rounded-lg font-label-sm text-label-sm hover:scale-105 transition-transform"}>{"START PROJECT"}</Link><Link href={"/connectivity"} className={"bg-white border border-outline px-10 py-4 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-colors"}>{"TECHNICAL SUPPORT"}</Link></div></div></section>
    </>
  );
}
