export function Section() {
  return (
    <>
      <section className={"border-y border-outline-variant/10 bg-white"}><div className={"max-w-container-max mx-auto px-margin-desktop py-12"}><div className={"grid grid-cols-2 md:grid-cols-4 gap-gutter"}><div className={"space-y-2 border-l border-outline-variant/30 pl-6"}><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter"}>{"Validation Latency"}</p><p className={"font-display-lg text-headline-lg text-primary"}>{"0.02µs"}</p></div><div className={"space-y-2 border-l border-outline-variant/30 pl-6"}><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter"}>{"Sync Precision"}</p><p className={"font-display-lg text-headline-lg text-primary"}>{"Sub-µs"}</p></div><div className={"space-y-2 border-l border-outline-variant/30 pl-6"}><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter"}>{"Max Velocity"}</p><p className={"font-display-lg text-headline-lg text-primary"}>{"1000km/h"}</p></div><div className={"space-y-2 border-l border-outline-variant/30 pl-6"}><p className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter"}>{"Simultaneous Channels"}</p><p className={"font-display-lg text-headline-lg text-primary"}>{"12ch"}</p></div></div></div></section>
    </>
  );
}
