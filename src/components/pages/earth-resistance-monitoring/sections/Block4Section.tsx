import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop"}><div className={"bg-primary rounded-2xl p-12 text-center text-on-primary relative overflow-hidden shadow-2xl"}><div className={"relative z-10 max-w-2xl mx-auto space-y-stack-md"}><h2 className={"font-display-lg text-headline-lg text-white"}>{"Ready to Secure Your "}<br />{"Infrastructure?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container"}>{"Speak with our lead engineers about integrating Earth Resistance Monitoring into your existing SCADA system."}</p><div className={"flex justify-center gap-base"}><Link href={"/renewable-energy"} className={"bg-white text-primary px-8 py-4 font-label-sm text-label-sm rounded-lg hover:bg-white/90 transition-all"}>{"Schedule a Tech Deep-Dive"}</Link><Link href={"/renewable-energy"} className={"border border-white/20 text-white px-8 py-4 font-label-sm text-label-sm rounded-lg hover:bg-white/10 transition-all"}>{"Request a Demo Unit"}</Link></div></div></div></div></section>
    </>
  );
}
