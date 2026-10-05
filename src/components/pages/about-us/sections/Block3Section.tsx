import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-32 bg-white relative overflow-hidden"}><div className={"absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none"}></div><div className={"px-margin-desktop max-w-container-max mx-auto text-center"}><h2 className={"font-headline-lg text-headline-lg text-primary mb-stack-md"}>{"Partner with Global Authority."}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"\n                    Ready to audit your current environment or plan a new technical frontier? Our consulting engineers are standing by.\n                "}</p><div className={"flex flex-col sm:flex-row items-center justify-center gap-base"}><Link href={"/contact-us"} className={"w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-DEFAULT font-label-sm text-label-sm technical-glow"}>{"\n                        Contact Engineering Dept\n                    "}</Link><Link href={"/technical-downloads-and-sdks"} className={"w-full sm:w-auto border border-outline px-10 py-4 rounded-DEFAULT font-label-sm text-label-sm hover:bg-surface transition-colors"}>{"\n                        Download Capabilities PDF\n                    "}</Link></div></div></section>
    </>
  );
}
