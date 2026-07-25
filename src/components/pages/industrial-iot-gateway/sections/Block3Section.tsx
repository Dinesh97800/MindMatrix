import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"py-24 bg-primary text-on-primary relative overflow-hidden"}><div className={"absolute inset-0 opacity-10"}></div><div className={"max-w-container-max mx-auto px-margin-desktop text-center relative z-10"}><h2 className={"font-display-lg text-display-lg mb-8"}>{"Ready for the Digital Frontier?"}</h2><p className={"font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-12"}>{"\n                    Connect your assets, secure your data, and unlock industrial intelligence today. Our engineering team is standing by to discuss your specific technical requirements.\n                "}</p><div className={"flex flex-col sm:flex-row justify-center gap-6"}><Link href={"/manufacturing"} className={"bg-white text-primary px-10 py-5 rounded-lg font-headline-md hover:bg-secondary-fixed transition-all shadow-xl"}>{"\n                        Schedule a Demo\n                    "}</Link><Link href={"/manufacturing"} className={"border border-on-primary/30 text-on-primary px-10 py-5 rounded-lg font-headline-md hover:bg-on-primary/10 transition-all"}>{"\n                        Technical Specs\n                    "}</Link></div></div></section>
    </>
  );
}
