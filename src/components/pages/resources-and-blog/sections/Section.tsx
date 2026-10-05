import Link from "next/link";

export function Section() {
  return (
    <>
      <section className={"flex flex-col md:flex-row justify-between items-end mb-stack-md gap-4 border-b border-outline-variant/10 pb-8"}><div className={"max-w-xl"}><h2 className={"font-headline-lg text-headline-lg mb-2"}>{"Technical Archive"}</h2><p className={"font-body-md text-body-md text-on-surface-variant"}>{"Access our complete library of technical documentation, research papers, and industrial insights."}</p></div><div className={"flex gap-4"}><Link href={"/industrial-automation"} className={"flex items-center gap-2 px-6 py-2 bg-surface-container rounded-full font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"}><span className={"material-symbols-outlined text-[18px]"}>{"filter_list"}</span>{"\n                    Filter\n                "}</Link><Link href={"/industrial-automation"} className={"flex items-center gap-2 px-6 py-2 bg-surface-container rounded-full font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"}><span className={"material-symbols-outlined text-[18px]"}>{"sort"}</span>{"\n                    Latest First\n                "}</Link></div></section>
    </>
  );
}
