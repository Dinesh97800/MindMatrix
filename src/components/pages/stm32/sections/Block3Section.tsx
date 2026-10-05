import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg bg-primary-container text-on-primary-container text-center"}><div className={"px-margin-desktop max-w-container-max mx-auto"}><h2 className={"font-headline-lg text-headline-lg mb-6 text-on-primary"}>{"Ready to Engineer the Future?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container/70 mb-12 max-w-2xl mx-auto"}>{"Contact our silicon experts today for a deep-dive technical assessment of your project requirements."}</p><div className={"flex flex-col md:flex-row justify-center gap-4"}><Link href={"/request-consultation"} className={"bg-on-primary-container text-primary-container px-10 py-5 rounded-lg font-label-sm text-label-sm font-extrabold hover:bg-on-primary transition-all active:scale-[0.98]"}>{"\n                        SCHEDULE TECHNICAL REVIEW\n                    "}</Link><Link href={"/industrial-automation"} className={"border border-on-primary-container/30 text-on-primary-container px-10 py-5 rounded-lg font-label-sm text-label-sm font-bold hover:bg-on-primary-container/10 transition-all"}>{"\n                        DOWNLOAD PORTFOLIO\n                    "}</Link></div></div></section>
    </>
  );
}
