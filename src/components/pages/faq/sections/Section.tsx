export function Section() {
  return (
    <>
      <div className={"mb-stack-lg relative max-w-xl"}><span className={"material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"}>{"search"}</span><input className={"w-full bg-surface-container border-none rounded-lg pl-12 py-4 font-body-md text-on-surface focus:ring-2 focus:ring-primary transition-all"} placeholder={"Search technical documentation..."} type={"text"} /></div>
    </>
  );
}
