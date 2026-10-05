import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-32 relative overflow-hidden"}><div className={"max-w-container-max mx-auto px-margin-desktop relative z-10 text-center"}><h2 className={"font-display-lg text-headline-lg md:text-display-lg text-primary mb-8"}>{"Ready for the Next Generation of Industrial Comms?"}</h2><div className={"flex flex-col md:flex-row justify-center gap-stack-md"}><Link href={"/contact-us"} className={"bg-primary text-on-primary px-12 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary transition-all shadow-xl"}>{"Contact Engineering Team"}</Link><Link href={"/request-consultation"} className={"bg-white text-primary border border-outline px-12 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-all"}>{"Schedule Tech Demo"}</Link></div></div></section>
    </>
  );
}
