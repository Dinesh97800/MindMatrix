import { StitchImage } from "@/components/ui/StitchImage";
import { siteContent } from "@/config/site-content";

const approachPoints = siteContent.whyChooseUs.slice(0, 3);

export function Section() {
  return (
    <section className="bg-primary-container px-margin-mobile py-stack-lg text-on-primary md:px-margin-desktop">
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-stack-lg lg:grid-cols-2 lg:gap-gutter">
        <div>
          <h2 className="mb-8 font-display-lg text-headline-lg-mobile md:text-headline-lg">
            Our Engineering Approach
          </h2>
          <div className="space-y-8">
            {approachPoints.map((item) => (
              <div key={item.title} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-on-primary/20">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h4 className="mb-2 font-headline-md text-xl">{item.title}</h4>
                  <p className="font-body-md text-on-primary-container">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="group relative h-[420px] w-full overflow-hidden rounded-2xl border border-on-primary/10">
          <StitchImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAflVGcvisbgzSU0i_hdzWrn8nlqP60yxJ0aBEcRDUHs_zZFhqz-YKTGmd711qdAwaA6RSgHNgr0bCWek7e61MD2EbccHZHWsGBDyWnC69efZDi2b5d0oUYQq1mDmFB8Hzfvfk-B3O3DAFvirupeJJ4mEqvjBOsj3Eyvj2L0gG3J6TUBOvcRLiAqCzMU-NnpdYQ5AJp3IE0_Xt0I9pYFwwMn8AaEuxqubDX-kiyV7fzVgQUaDMM6cqe4A4dGcYiT9_MOiUiCVCW5dU"
            alt="Engineering workspace with a detailed circuit board during prototype bring-up and validation."
            className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <p className="font-body-md text-on-primary">{siteContent.intro}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
