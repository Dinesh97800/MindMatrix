import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg relative overflow-hidden"}><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><h2 className={"font-display-lg text-headline-lg text-primary mb-stack-md"}>{"Ready to secure your pipeline?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg"}>{"\n                    Our engineering team is ready to design a bespoke monitoring matrix for your specific infrastructure requirements.\n                "}</p><Link href={"/wireless-sensor-network"} className={"bg-primary text-on-primary px-10 py-5 rounded-lg font-label-sm text-label-sm font-extrabold uppercase tracking-widest hover:bg-[#2563EB] shadow-xl hover:shadow-[#2563EB33] transition-all"}>{"\n                    Monitor Your Infrastructure\n                "}</Link></div><div className={"absolute inset-0 z-0 opacity-5 pointer-events-none"}><div className={"w-full h-full"} style={{"backgroundImage":"radial-gradient(circle at 2px 2px, black 1px, transparent 0)","backgroundSize":"24px 24px"}}></div></div></section>
    </>
  );
}
