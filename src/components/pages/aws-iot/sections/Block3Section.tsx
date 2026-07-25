import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg relative overflow-hidden"}><div className={"max-w-container-max mx-auto px-margin-desktop relative z-10 text-center"}><div className={"glass-card p-16 rounded-3xl border border-outline-variant/30 max-w-4xl mx-auto"}><h2 className={"font-display-lg text-headline-lg mb-8"}>{"Ready to Architect Your IoT Frontier?"}</h2><p className={"font-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto"}>{"\n                        Speak with our principal engineers about integrating AWS IoT into your existing manufacturing or urban operations.\n                    "}</p><div className={"flex flex-col sm:flex-row justify-center gap-stack-md"}><Link href={"/connectivity"} className={"bg-primary text-on-primary px-10 py-5 rounded-lg font-label-sm text-label-sm hover:scale-[1.02] transition-transform shadow-xl"}>{"\n                            Request Technical Audit\n                        "}</Link><Link href={"/contact-us"} className={"bg-white text-primary border border-outline-variant px-10 py-5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-colors"}>{"\n                            Contact Engineering Team\n                        "}</Link></div></div></div></section>
    </>
  );
}
