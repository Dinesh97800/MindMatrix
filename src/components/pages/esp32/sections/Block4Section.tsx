import Link from "next/link";

export function Block4Section() {
  return (
    <>
      <section className={"py-stack-lg text-center relative"}><div className={"absolute inset-0 z-0 pointer-events-none opacity-20"}></div><div className={"container max-w-container-max mx-auto px-margin-desktop relative z-10"}><h2 className={"font-display-lg text-display-lg mb-6"}>{"Scale Your IoT Frontier"}</h2><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-md"}>{"\n                    Leverage our deep hardware expertise to accelerate your ESP32-based product development from prototype to mass production.\n                "}</p><div className={"flex justify-center gap-stack-sm"}><Link href={"/connectivity"} className={"bg-primary text-on-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary transition-all"}>{"\n                        Technical Inquiries\n                    "}</Link><Link href={"/connectivity"} className={"border border-outline px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-all"}>{"\n                        Download Datasheet\n                    "}</Link></div></div></section>
    </>
  );
}
