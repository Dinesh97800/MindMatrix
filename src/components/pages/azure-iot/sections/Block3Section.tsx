import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop"}><div className={"max-w-container-max mx-auto glass-panel rounded-2xl p-stack-lg border border-primary/10 relative overflow-hidden"}><div className={"relative z-10 text-center space-y-stack-sm"}><h2 className={"font-headline-lg text-headline-lg text-primary"}>{"Seamless Ecosystem Integration"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto"}>{"\n                        Leverage the power of Microsoft Azure. Connect your IoT data to Power BI for visualization, Azure Synapse for analytics, and Microsoft 365 for operational collaboration.\n                    "}</p><div className={"flex justify-center pt-8"}><Link href={"/azure-iot"} className={"bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-[0.2em] px-12 py-5 rounded hover:scale-105 transition-transform shadow-xl"}>{"Launch Your Matrix"}</Link></div></div></div></section>
    </>
  );
}
