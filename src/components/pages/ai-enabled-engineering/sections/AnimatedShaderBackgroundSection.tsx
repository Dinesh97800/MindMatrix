import Link from "next/link";

export function AnimatedShaderBackgroundSection() {
  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden bg-primary-container">
      <div className="relative z-10 w-full px-margin-desktop max-w-container-max mx-auto grid grid-cols-12 gap-gutter items-center">
        <div className="col-span-12 lg:col-span-7">
          <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-6 rounded-sm uppercase tracking-widest">
            AI-Driven Product Engineering
          </span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 leading-tight">
            Edge AI and Intelligent
            <br />
            <span className="text-secondary-fixed">Engineering Solutions</span>
          </h1>
          <p className="font-body-lg text-body-lg text-white/70 mb-6 max-w-xl">
            We combine AI with embedded systems, sensors, IoT, industrial data,
            and customer knowledge to build practical intelligent products and
            automation solutions.
          </p>
          <p className="font-body-md text-body-md text-white/60 mb-10 max-w-xl">
            Artificial Intelligence + Embedded Systems + IoT + Industrial
            Automation
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/request-consultation"
              className="bg-white text-primary-container px-8 py-4 font-label-sm text-label-sm font-bold flex items-center gap-2 group transition-all"
            >
              Discuss Your Application
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
            <Link
              href="#capabilities"
              className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 font-label-sm text-label-sm font-bold"
            >
              View Capabilities
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 relative hidden lg:block">
          <div className="aspect-square glass-card rounded-xl overflow-hidden border-white/10 p-2">
            <div
              className="w-full h-full relative overflow-hidden rounded-lg bg-cover bg-center"
              data-alt="Industrial engineering workspace with embedded systems and sensor hardware used for edge AI development."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCU6toPdDiRj4bpPQWDel9oYIFDfPQEhfxI56-c0oXuqhdtyeyG6GMScPkpb-n8hF4jb_LKzE32SV3jHMur7FD9xloxAiSocb8za8DTPm2qj6KpNYH_UYcZRoHFl04hvpnbf7kice5MJKHfTMgGO5c6vzFu5OONCXzBbDFSMMsvsTxx1FHYYcxASko0Mt8rU8Ziy-9A3rPPvYSGybpFRQhXEKpHTKwZi4fFscX_lxK0v0jiPKkoezTDzipHyUgYr9CENSQim_8Qpzw')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 border border-white/10 rounded">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">
                      hub
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-label-sm text-label-sm">
                      Edge-to-Cloud Integration
                    </div>
                    <div className="text-white/60 text-xs">
                      Embedded devices, gateways &amp; cloud platforms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
