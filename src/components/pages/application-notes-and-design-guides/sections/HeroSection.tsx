export function HeroSection() {
  return (
    <>
      <header className={"mb-stack-lg"}><nav className={"flex items-center gap-2 text-label-sm text-on-primary-container mb-4"}><span>{"Documentation"}</span><span className={"material-symbols-outlined text-[14px]"}>{"chevron_right"}</span><span className={"text-primary font-semibold"}>{"Application Notes"}</span></nav><h1 className={"font-display-lg text-display-lg text-primary tracking-tight mb-4"}>{"Application Notes"}</h1><p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl"}>{"\n                    Detailed engineering implementations, architecture best practices, and systematic 'How-To' guides for scaling Mind Matrix Workspace across high-stakes industrial ecosystems.\n                "}</p></header>
    </>
  );
}
