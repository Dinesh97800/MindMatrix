import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop"}><div className={"bg-primary p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center"}><div className={"relative z-10 max-w-2xl"}><h2 className={"font-display-lg text-headline-lg text-white mb-6"}>{"Ready to Optimize Your Infrastructure?"}</h2><p className={"text-on-primary-container text-lg mb-stack-md"}>{"Consult with our systems engineers to design a bespoke monitoring architecture for your enterprise."}</p><div className={"flex flex-col sm:flex-row gap-4 justify-center"}><Link href={"/smart-grid"} className={"bg-white text-primary px-8 py-4 rounded font-label-sm text-label-sm hover:bg-secondary-fixed transition-colors"}>{"Start Consultation"}</Link><Link href={"/smart-grid"} className={"border border-white/30 text-white px-8 py-4 rounded font-label-sm text-label-sm hover:bg-white/10 transition-colors"}>{"Download Specs"}</Link></div></div></div></div></section>
    </>
  );
}
