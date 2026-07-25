import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant/20"}><h3 className={"font-headline-md text-headline-md mb-12"}>{"Related Engineering Projects"}</h3><div className={"grid grid-cols-1 md:grid-cols-2 gap-gutter"}><Link href={"/building-automation"} className={"group block bg-surface p-8 rounded-xl border border-outline-variant/10 technical-glow transition-all"}><div className={"flex justify-between items-start mb-6"}><span className={"material-symbols-outlined text-4xl text-primary"}>{"monitor_heart"}</span><span className={"material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"}>{"arrow_forward"}</span></div><h4 className={"font-headline-md text-headline-md mb-2"}>{"Environmental Monitoring"}</h4><p className={"text-on-surface-variant"}>{"Global IoT network for real-time atmospheric tracking in pharmaceutical storage."}</p></Link><Link href={"/building-automation"} className={"group block bg-surface p-8 rounded-xl border border-outline-variant/10 technical-glow transition-all"}><div className={"flex justify-between items-start mb-6"}><span className={"material-symbols-outlined text-4xl text-primary"}>{"domain"}</span><span className={"material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"}>{"arrow_forward"}</span></div><h4 className={"font-headline-md text-headline-md mb-2"}>{"Building Automation"}</h4><p className={"text-on-surface-variant"}>{"Smart energy management for hyper-scale data centers using AI optimization."}</p></Link></div></section>
    </>
  );
}
