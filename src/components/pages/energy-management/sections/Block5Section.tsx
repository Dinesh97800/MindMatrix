import Link from "next/link";

export function Block5Section() {
  return (
    <>
      <section className={"py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop text-center bg-primary-container text-on-primary-container p-stack-lg"}><div className={"max-w-2xl mx-auto space-y-stack-md"}><h2 className={"font-display-lg text-display-lg leading-tight"}>{"Ready to Audit Your Efficiency?"}</h2><p className={"text-body-lg opacity-70"}>{"Connect with our systems engineers for a comprehensive evaluation of your energy infrastructure."}</p><div className={"pt-8 flex flex-col sm:flex-row justify-center gap-4"}><Link href={"/embedded-firmware-development"} className={"bg-surface text-primary px-10 py-5 text-label-sm font-label-sm hover:bg-secondary-container transition-all"}>{"Analyze Your Energy"}</Link><Link href={"/embedded-firmware-development"} className={"border border-white/20 text-white px-10 py-5 text-label-sm font-label-sm hover:bg-white/10 transition-all"}>{"Download Technical Spec"}</Link></div></div></div></section>
    </>
  );
}
