import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto text-center"}><div className={"bg-primary p-16 rounded-2xl relative overflow-hidden"}><div className={"absolute inset-0 opacity-10"}></div><div className={"relative z-10"}><h2 className={"font-display-lg text-display-lg text-white mb-6"}>{"Ready to Stabilize Your Operation?"}</h2><p className={"text-on-primary-container text-body-lg mb-10 max-w-2xl mx-auto"}>{"Bring industrial precision to your manufacturing floor with Mind Matrix custom control solutions."}</p><Link href={"/building-automation"} className={"bg-white text-primary px-12 py-5 rounded-DEFAULT font-bold text-lg hover:bg-primary-fixed transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"}>{"Consult on Cleanroom Control"}</Link></div></div></section>
    </>
  );
}
