import Link from "next/link";

export function Block3Section() {
  return (
    <>
      <section className={"mb-stack-lg px-margin-desktop max-w-container-max mx-auto"}><div className={"relative bg-primary p-12 lg:p-24 overflow-hidden"}><div className={"absolute right-0 bottom-0 opacity-20 pointer-events-none"}><span className={"material-symbols-outlined text-[300px] text-white/50"} style={{"fontVariationSettings":"'FILL' 1"}}>{"cell_tower"}</span></div><div className={"relative z-10 max-w-2xl"}><h2 className={"font-display-lg text-display-lg text-white mb-stack-md leading-tight"}>{"Ready to fortify your telecommunications backbone?"}</h2><p className={"text-on-primary-container font-body-lg mb-stack-lg"}>{"Consult with our lead RF engineers to design a system that defies the digital frontier's toughest conditions."}</p><Link href={"/telecom"} className={"bg-white text-primary px-10 py-5 font-label-sm text-label-sm font-bold tracking-widest hover:bg-secondary-container transition-colors uppercase"}>{"Strengthen Your Network"}</Link></div></div></section>
    </>
  );
}
