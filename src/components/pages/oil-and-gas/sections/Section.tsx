export function Section() {
  return (
    <>
      <section className={"py-stack-lg overflow-hidden border-y border-outline-variant/10"}><div className={"px-margin-desktop max-w-container-max mx-auto mb-10"}><span className={"font-label-sm text-label-sm text-on-primary-container font-bold tracking-widest uppercase"}>{"The Stack"}</span></div><div className={"flex whitespace-nowrap gap-12 animate-marquee-slower items-center px-10"}><span className={"font-display-lg text-4xl md:text-6xl text-outline-variant uppercase tracking-tighter"}>{"Modbus TCP/RTU"}</span><span className={"w-4 h-4 rounded-full bg-primary"}></span><span className={"font-display-lg text-4xl md:text-6xl text-primary uppercase tracking-tighter"}>{"LoRaWAN Mesh"}</span><span className={"w-4 h-4 rounded-full bg-outline-variant"}></span><span className={"font-display-lg text-4xl md:text-6xl text-outline-variant uppercase tracking-tighter"}>{"Satellite Backhaul"}</span><span className={"w-4 h-4 rounded-full bg-primary"}></span><span className={"font-display-lg text-4xl md:text-6xl text-primary uppercase tracking-tighter"}>{"Ultra-Low Power"}</span><span className={"w-4 h-4 rounded-full bg-outline-variant"}></span><span className={"font-display-lg text-4xl md:text-6xl text-outline-variant uppercase tracking-tighter"}>{"MQTT Sparkplug B"}</span></div></section>
    </>
  );
}
