export function Section() {
  return (
    <>
      <section className={"py-stack-md border-y border-outline-variant/20 bg-background"}><div className={"container-max mx-auto px-margin-desktop"}><div className={"flex flex-col md:flex-row justify-between items-center gap-8"}><span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest"}>{"Connectivity Standard:"}</span><div className={"flex flex-wrap justify-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"}><div className={"flex items-center gap-2 font-display-lg text-headline-md font-bold text-primary"}>{"BACnet"}</div><div className={"flex items-center gap-2 font-display-lg text-headline-md font-bold text-primary"}>{"Zigbee"}</div><div className={"flex items-center gap-2 font-display-lg text-headline-md font-bold text-primary"}>{"Thread"}</div><div className={"flex items-center gap-2 font-display-lg text-headline-md font-bold text-primary"}>{"MQTT"}</div><div className={"flex items-center gap-2 font-display-lg text-headline-md font-bold text-primary"}>{"KNX"}</div></div></div></div></section>
    </>
  );
}
