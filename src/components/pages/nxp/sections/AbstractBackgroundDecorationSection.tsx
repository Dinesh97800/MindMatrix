import Link from "next/link";

export function AbstractBackgroundDecorationSection() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto mb-20"}><div className={"bg-surface-container-high rounded-3xl p-12 lg:p-20 relative overflow-hidden flex flex-col items-center text-center"}><div className={"relative z-10 max-w-3xl"}><h2 className={"font-display-lg text-headline-lg lg:text-display-lg text-primary mb-8 leading-tight"}>{"Ready to Engineer the Future?"}</h2><p className={"font-body-lg text-on-surface-variant mb-12"}>{"\n                        Our engineering teams are ready to assist with custom hardware design, BSP optimization, and long-term production support for your i.MX-based projects.\n                    "}</p><div className={"flex flex-col sm:flex-row gap-6 justify-center"}><Link href={"/contact-us"} className={"bg-primary text-on-primary px-10 py-5 rounded-lg font-bold font-label-sm text-label-sm shadow-xl shadow-primary/10 hover:bg-secondary transition-all"}>{"\n                            CONTACT TECHNICAL SALES\n                        "}</Link><button className={"bg-white border border-outline-variant px-10 py-5 rounded-lg font-bold font-label-sm text-label-sm hover:bg-surface transition-all"}>{"\n                            VIEW DEV KITS\n                        "}</button></div></div><div className={"absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"}></div></div></section>
    </>
  );
}
