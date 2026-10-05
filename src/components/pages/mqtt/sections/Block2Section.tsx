export function Block2Section() {
  return (
    <>
      <section className={"py-stack-lg border-y border-outline-variant/20 bg-white"}><div className={"max-w-container-max mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter"}><div className={"text-center"}><p className={"font-display-lg text-[48px] text-primary leading-none"}>{"2"}<span className={"text-headline-md"}>{"B"}</span></p><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2"}>{"Active Sessions"}</p></div><div className={"text-center"}><p className={"font-display-lg text-[48px] text-primary leading-none"}>{"<15"}<span className={"text-headline-md"}>{"ms"}</span></p><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2"}>{"Avg. Latency"}</p></div><div className={"text-center"}><p className={"font-display-lg text-[48px] text-primary leading-none"}>{"99.99"}</p><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2"}>{"Uptime (%)"}</p></div><div className={"text-center"}><p className={"font-display-lg text-[48px] text-primary leading-none"}>{"100"}<span className={"text-headline-md"}>{"X"}</span></p><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2"}>{"Efficiency vs HTTP"}</p></div></div></section>
    </>
  );
}
