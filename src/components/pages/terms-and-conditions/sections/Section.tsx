import Link from "next/link";

export function Section() {
  return (
    <>
      <section className={"max-w-container-max mx-auto px-margin-desktop pb-stack-lg"}><div className={"bg-surface-container p-12 rounded-2xl flex flex-col items-center text-center gap-6 border border-outline-variant/20 relative overflow-hidden"}><div className={"absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"}></div><div className={"absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"}></div><h3 className={"font-headline-lg text-headline-lg"}>{"Questions regarding our Legal Framework?"}</h3><p className={"max-w-2xl font-body-lg text-on-surface-variant"}>{"Our compliance and legal engineering teams are available to discuss enterprise-level modifications or specific regulatory requirements for your jurisdiction."}</p><div className={"flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md"}><input className={"flex-grow p-4 bg-white border border-outline-variant rounded focus:outline-none focus:ring-2 focus:ring-primary/20 font-body-md"} placeholder={"Enter your business email"} type={"email"} /><Link href={"/terms-and-conditions"} className={"bg-primary text-on-primary px-8 py-4 rounded font-label-sm text-label-sm font-bold hover:bg-secondary transition-all"}>{"Contact Compliance"}</Link></div></div></section>
    </>
  );
}
