import Link from "next/link";

export function AtmosphericBgElementSection() {
  return (
    <>
      <section className={"py-stack-lg bg-white overflow-hidden relative"}><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg text-primary mb-8 tracking-tighter"}>{"Ready to harden your infrastructure?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12"}>{"Connect with our industry-leading engineers to discuss your project specifics and safety requirements."}</p><div className={"flex flex-col sm:flex-row justify-center gap-4"}><Link href={"/quantum-ready-data-architecture"} className={"bg-primary text-on-primary px-12 py-5 font-bold font-label-sm text-label-sm transition-transform active:scale-95 shadow-lg"}>{"SECURE YOUR OPERATIONS"}</Link><Link href={"/quantum-ready-data-architecture"} className={"bg-surface-container text-primary px-12 py-5 font-bold font-label-sm text-label-sm transition-transform active:scale-95"}>{"REQUEST TECHNICAL SPECS"}</Link></div></div><div className={"absolute -bottom-24 -right-24 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px]"}></div></section>
    </>
  );
}
