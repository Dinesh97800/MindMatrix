import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"bg-surface py-stack-lg border-t border-outline-variant/10"}><div className={"max-w-4xl mx-auto px-margin-desktop text-center flex flex-col items-center gap-stack-md"}><div className={"material-symbols-outlined text-primary text-5xl"}>{"precision_manufacturing"}</div><h2 className={"font-display-lg text-headline-lg"}>{"Ready to optimize your energy ecosystem?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant"}>{"\n                    From initial hardware prototyping to global fleet deployment, our engineers bridge the gap between energy physics and digital intelligence.\n                "}</p><div className={"flex gap-4 mt-4"}><Link href={"/renewable-energy"} className={"bg-primary text-on-primary px-10 py-5 rounded-DEFAULT font-label-sm text-label-sm font-bold uppercase technical-glow active:scale-95 transition-all"}>{"Consult our Energy Experts"}</Link></div></div></section>
    </>
  );
}
