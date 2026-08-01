import Link from "next/link";

const solutionHighlights = [
  {
    title: "Edge AI Products",
    icon: "developer_board",
  },
  {
    title: "Engineering & Knowledge Solutions",
    icon: "menu_book",
  },
  {
    title: "Industrial & IoT Solutions",
    icon: "precision_manufacturing",
  },
  {
    title: "Controlled Agentic Workflows",
    icon: "account_tree",
  },
];

export function AiSolutionsHighlightSection() {
  return (
    <section className="py-stack-lg bg-primary-container relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -right-1/4 top-0 w-1/2 h-full bg-secondary-container blur-[160px] rounded-full" />
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-sm uppercase tracking-widest">
              AI-Driven Product Engineering
            </span>
            <h2 className="font-display-lg text-headline-lg text-white leading-tight">
              Edge AI and Intelligent{" "}
              <span className="text-secondary-fixed">Engineering Solutions</span>
            </h2>
            <p className="text-white/70 font-body-lg">
              We combine AI with embedded systems, sensors, IoT, industrial
              data, and customer knowledge to build practical intelligent
              products and automation solutions.
            </p>
            <p className="text-white/60 font-body-md">
              Artificial Intelligence + Embedded Systems + IoT + Industrial
              Automation
            </p>
            <Link
              href="/ai-enabled-engineering"
              className="inline-flex items-center gap-2 bg-white text-primary-container px-8 py-4 font-label-sm text-label-sm font-bold rounded-full hover:bg-primary-fixed transition-all group"
            >
              Explore AI Solutions
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            {solutionHighlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl text-secondary-fixed mb-4">
                  {item.icon}
                </span>
                <h3 className="font-headline-md text-headline-md text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
