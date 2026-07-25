import Link from "next/link";

export function DecorativeAtmosphericBackgroundSection() {
  return (
    <>
      <section className={"py-24 bg-surface relative overflow-hidden"}><div className={"px-margin-desktop max-w-container-max mx-auto text-center relative z-10"}><h2 className={"font-display-lg text-display-lg text-primary mb-8"}>{"Ready to secure your ecological data?"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12"}>{"\n                Join the forefront of technical conservation. Partner with us to deploy monitoring solutions that withstand the elements and deliver absolute truth.\n            "}</p><Link href={"/nanolithography-cluster-control"} className={"bg-primary text-on-primary px-12 py-5 font-label-sm text-label-sm hover:scale-105 transition-all duration-300 technical-glow"}>{"Protect Your Environment"}</Link></div><div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-fixed/30 rounded-full blur-[120px] -z-0"}></div></section>
    </>
  );
}
