import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop"}><div className={"bg-primary-container rounded-3xl p-12 lg:p-20 relative overflow-hidden flex flex-col items-center text-center"}><div className={"relative z-10 max-w-2xl"}><h2 className={"font-display-lg text-headline-lg text-white mb-stack-sm"}>{"Ready to Engineer the Future of Transit?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container mb-stack-lg"}>{"Connect with our team of infrastructure experts to discuss your fleet electrification roadmap."}</p><Link href={"/metropolis-ev-transit"} className={"px-8 py-4 bg-white text-primary font-label-sm text-label-sm rounded-full font-bold technical-glow hover:bg-blue-50 transition-all uppercase tracking-widest"}>{"\n                            Speak to an Infrastructure Expert\n                        "}</Link></div></div></div></section>
    </>
  );
}
