import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <div className={"flex justify-center mt-stack-lg pt-stack-md border-t border-outline-variant/10"}><nav className={"flex items-center gap-2"}><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors"}><span className={"material-symbols-outlined text-[20px]"}>{"chevron_left"}</span></Link><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-sm"}>{"1"}</Link><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors font-label-sm"}>{"2"}</Link><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors font-label-sm"}>{"3"}</Link><span className={"px-2 text-on-surface-variant opacity-40"}>{"..."}</span><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors font-label-sm"}>{"12"}</Link><Link href={"/industrial-automation"} className={"w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors"}><span className={"material-symbols-outlined text-[20px]"}>{"chevron_right"}</span></Link></nav></div>
    </>
  );
}
