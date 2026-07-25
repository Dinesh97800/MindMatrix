import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-mobile md:px-margin-desktop relative overflow-hidden"}><div className={"absolute inset-0 blueprint-pattern opacity-5"}></div><div className={"max-w-container-max mx-auto relative z-10 text-center py-20 bg-surface border border-outline-variant rounded-3xl overflow-hidden"}><div className={"absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 blur-[100px] rounded-full -mr-32 -mt-32"}></div><div className={"absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 blur-[100px] rounded-full -ml-32 -mb-32"}></div><h2 className={"font-display-lg text-headline-lg mb-6"}>{"Partner with Engineering Experts"}</h2><p className={"max-w-2xl mx-auto text-on-surface-variant font-body-lg text-body-lg mb-12"}>{"Accelerate your technical roadmap with a team that speaks the language of high-stakes industrial engineering."}</p><div className={"flex flex-col sm:flex-row justify-center gap-6"}><Link href={"/embedded-firmware-development"} className={"bg-primary text-on-primary px-10 py-4 rounded-full font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/10"}>{"\n                        SCHEDULE CONSULTATION\n                    "}</Link><Link href={"/case-studies"} className={"bg-transparent border border-outline px-10 py-4 rounded-full font-label-sm text-label-sm hover:bg-surface-container-low transition-all"}>{"\n                        VIEW CASE STUDIES\n                    "}</Link></div></div></section>
    </>
  );
}
