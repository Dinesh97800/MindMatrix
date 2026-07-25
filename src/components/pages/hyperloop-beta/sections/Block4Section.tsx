import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg border-t border-outline-variant/10"}><div className={"max-w-container-max mx-auto px-margin-desktop text-center"}><div className={"max-w-2xl mx-auto"}><h2 className={"font-headline-lg text-headline-lg text-primary mb-6"}>{"Ready for Technical Review?"}</h2><p className={"font-body-lg text-on-surface-variant mb-10"}>{"Access the full anonymized telemetry data and structural validation reports from the Hyperloop Beta phase."}</p><Link href={"/embedded-measurement-system"} className={"bg-primary text-white px-10 py-4 rounded-lg font-label-sm text-label-sm flex items-center justify-center mx-auto hover:bg-on-primary-fixed-variant transition-all active:scale-95 group"}>{"\n                        View Validation Reports\n                        "}<span className={"material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform"}>{"arrow_forward"}</span></Link></div></div></section>
    </>
  );
}
