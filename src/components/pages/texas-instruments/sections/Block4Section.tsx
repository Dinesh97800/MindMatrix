import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-24 px-margin-desktop text-center"}><div className={"max-w-3xl mx-auto glass-panel p-16 relative overflow-hidden group"}><div className={"absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"}></div><div className={"relative z-10 transition-colors duration-500 group-hover:text-on-primary"}><h2 className={"font-display-lg text-headline-lg mb-8"}>{"Ready to architect your next system?"}</h2><p className={"font-body-lg text-body-lg mb-10 opacity-70"}>{"Connect with our systems engineers to discuss your specific analog and embedded processing requirements."}</p><Link href={"/texas-instruments"} className={"bg-primary text-on-primary group-hover:bg-white group-hover:text-primary px-10 py-5 rounded-none font-label-sm text-label-sm uppercase tracking-[0.2em] transition-colors"}>{"\n                        Connect with an Expert\n                    "}</Link></div></div></section>
    </>
  );
}
