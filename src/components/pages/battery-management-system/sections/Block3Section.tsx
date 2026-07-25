import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"bg-primary text-on-primary py-stack-lg relative overflow-hidden"}><div className={"max-w-container-max mx-auto px-margin-desktop relative z-10 flex flex-col items-center text-center"}><h2 className={"font-display-lg text-headline-lg-mobile md:text-display-lg mb-8 tracking-tighter"}>{"Ready to engineer your next power solution?"}</h2><p className={"font-body-lg text-body-lg mb-12 max-w-2xl opacity-80"}>{"Download our engineering whitepaper on High-Voltage BMS Architecture or schedule a technical deep-dive with our lead architects."}</p><div className={"flex flex-col sm:flex-row gap-gutter"}><Link href={"/battery-management-system"} className={"bg-on-primary text-primary px-12 py-6 font-label-sm text-label-sm font-bold hover:bg-on-primary-fixed-variant hover:text-on-primary transition-all active:scale-95"}>{"\n                        DOWNLOAD WHITEPAPER\n                    "}</Link><Link href={"/battery-management-system"} className={"border border-on-primary px-12 py-6 font-label-sm text-label-sm font-bold hover:bg-on-primary hover:text-primary transition-all active:scale-95"}>{"\n                        TALK TO AN ENGINEER\n                    "}</Link></div></div></section>
    </>
  );
}
