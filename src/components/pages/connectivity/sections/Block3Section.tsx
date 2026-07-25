import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-stack-lg px-margin-desktop max-w-container-max mx-auto mb-stack-lg"}><div className={"bg-primary-container rounded-lg p-stack-lg text-center overflow-hidden relative"}><div className={"absolute top-0 right-0 w-64 h-64 bg-primary-fixed/10 blur-[100px]"}></div><div className={"absolute bottom-0 left-0 w-64 h-64 bg-on-tertiary-container/5 blur-[100px]"}></div><div className={"relative z-10"}><h2 className={"font-display-lg text-headline-lg text-on-primary-container mb-stack-md"}>{"Bridge the Connectivity Gap."}</h2><p className={"font-body-lg text-on-primary-container/80 max-w-2xl mx-auto mb-stack-lg"}>{"Consult with our RF engineering team to architect a robust wireless infrastructure tailored for your industrial environment."}</p><Link href={"/connectivity"} className={"bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-label-sm text-label-sm uppercase tracking-widest hover:scale-105 transition-transform"}>{"\n                        Schedule an Engineering Review\n                    "}</Link></div></div></section>
    </>
  );
}
