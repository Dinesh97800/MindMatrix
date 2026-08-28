import Link from "next/link";
import { SplitHero } from "@/components/sections/hero";
import { HERO_ASSETS } from "@/config/hero-images";

export function AnimatedShaderBackgroundSection() {
  return (
    <SplitHero
      eyebrow="AI-Driven Product Engineering"
      title={
        <>
          Edge AI and Intelligent
          <br />
          <span className="text-secondary-fixed">Engineering Solutions</span>
        </>
      }
      description="We combine AI with embedded systems, sensors, IoT, industrial data, and customer knowledge to build practical intelligent products and automation solutions."
      supportingText="Artificial Intelligence + Embedded Systems + IoT + Industrial Automation"
      image={HERO_ASSETS.edgeComputing}
      imageAlt="Industrial engineering workspace with embedded systems and sensor hardware used for edge AI development."
      imageOverlay={
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-4 rounded border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed">
              <span className="material-symbols-outlined text-primary-container">hub</span>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-white">Edge-to-Cloud Integration</div>
              <div className="text-xs text-white/60">
                Embedded devices, gateways &amp; cloud platforms
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Link
        href="/request-consultation"
        className="group flex items-center gap-2 bg-white px-8 py-4 font-label-sm text-label-sm font-bold text-primary-container transition-all"
      >
        Discuss Your Application
        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
      </Link>
      <Link
        href="#capabilities"
        className="border border-white/20 px-8 py-4 font-label-sm text-label-sm font-bold text-white hover:bg-white/5"
      >
        View Capabilities
      </Link>
    </SplitHero>
  );
}
