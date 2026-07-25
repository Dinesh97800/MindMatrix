export function Block2Section() {
  return (
    <>
      <section className={"py-stack-md border-y border-outline-variant/10"}><div className={"max-w-container-max mx-auto px-margin-desktop"}><div className={"flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"}><div className={"flex items-center gap-3"}><span className={"material-symbols-outlined text-4xl"}>{"router"}</span><span className={"font-display-lg text-headline-md"}>{"SNMP"}</span></div><div className={"flex items-center gap-3"}><span className={"material-symbols-outlined text-4xl"}>{"lan"}</span><span className={"font-display-lg text-headline-md"}>{"MQTT"}</span></div><div className={"flex items-center gap-3"}><span className={"material-symbols-outlined text-4xl"}>{"developer_board"}</span><span className={"font-display-lg text-headline-md"}>{"ARM Cortex-M"}</span></div><div className={"flex items-center gap-3"}><span className={"material-symbols-outlined text-4xl"}>{"analytics"}</span><span className={"font-display-lg text-headline-md"}>{"High-speed Sampling"}</span></div></div></div></section>
    </>
  );
}
