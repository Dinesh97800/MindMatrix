export function Section() {
  return (
    <>
      <section className={"bg-primary-container text-on-primary py-stack-lg"}><div className={"max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter"}><div className={"flex flex-col gap-2"}><span className={"font-label-sm text-label-sm text-on-primary-container/60 uppercase"}>{"System Jitter"}</span><span className={"font-display-lg text-headline-lg"}>{"< 100µs"}</span><div className={"h-1 w-full bg-primary-fixed-dim/20 overflow-hidden"}><div className={"h-full bg-on-primary-container w-[85%]"}></div></div></div><div className={"flex flex-col gap-2"}><span className={"font-label-sm text-label-sm text-on-primary-container/60 uppercase"}>{"Safety Rating"}</span><span className={"font-display-lg text-headline-lg"}>{"SIL3"}</span><div className={"h-1 w-full bg-primary-fixed-dim/20 overflow-hidden"}><div className={"h-full bg-on-primary-container w-full"}></div></div></div><div className={"flex flex-col gap-2"}><span className={"font-label-sm text-label-sm text-on-primary-container/60 uppercase"}>{"Production Gain"}</span><span className={"font-display-lg text-headline-lg"}>{"+42%"}</span><div className={"h-1 w-full bg-primary-fixed-dim/20 overflow-hidden"}><div className={"h-full bg-on-primary-container w-[42%]"}></div></div></div></div></section>
    </>
  );
}
