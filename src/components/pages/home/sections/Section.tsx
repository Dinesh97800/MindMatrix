import Link from 'next/link';
import { StitchImage } from '@/components/ui/StitchImage';

export function Section() {
  return (
    <>
      <section className={'py-stack-lg bg-white'}>
        <div className={'max-w-container-max mx-auto px-margin-desktop'}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-6 self-start">
              <h2 className="font-display-lg text-headline-lg text-primary">
                Specialized Industries
              </h2>

              <p className="text-on-surface-variant font-body-lg">
                We deliver tailored solutions for sectors requiring
                uncompromising stability and long lifecycle support.
              </p>

              <Link
                href="/industries"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-on-primary hover:bg-primary/90 transition-colors"
              >
                Explore Industries
              </Link>
            </div>
            <div
              className={'lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4'}
            >
              <div className={'relative group h-64 overflow-hidden rounded-xl'}>
                <div
                  className={
                    'absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all z-10'
                  }
                ></div>
                <StitchImage
                  src={
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBZq4GN3WQREFqU2ATVDe-qUec7qxUkeFA5DqK9YgK7QsJUI-FxR6nrFhHP3kkH2HH04HvQhzD_n3Lc1XU-j6rmi21kLY7-swMfyO007nXjfNtJ1i7ZYSA5KleHJF6Fx9dEk8IbJiR-tSz1AQTxcMZ5scAHCyBpjcjTw2ESoLoeiX54E9bH8QACihKngPtzUzQ-ki0Jt_HRFKFHzOWJ50v4L_C3wPhWK72HTtiKuZj6lAHe4BiodztwrF8NbjPb9-4jjmYJ33YAsw'
                  }
                  alt={
                    'A futuristic renewable energy farm with solar panels and wind turbines under a clear blue sky. The scene is shot with high-end architectural photography style, focusing on the technical integration of energy technology. Modern, clean-room industrial aesthetic.'
                  }
                  className={
                    'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  }
                />
                <div className={'absolute bottom-0 left-0 p-6 z-20'}>
                  <h4
                    className={'text-white font-headline-md text-headline-md'}
                  >
                    {'Renewable Energy'}
                  </h4>
                </div>
              </div>
              <div className={'relative group h-64 overflow-hidden rounded-xl'}>
                <div
                  className={
                    'absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all z-10'
                  }
                ></div>
                <StitchImage
                  src={
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBVTm33KWRt_b1Q5yFYMSsN5ycYqV1lktR148Wf4K1nRbIl2sMcoDuZa0y0CqpqD6DVN_8uTt9wU79y2f2A17cdOWn_VoAzqCRc09B3Hz2KJHGECVaywUSN-fjsmrP7jeI0mPf6ox5ARxIGIrqwKebH8gEVB5TBXaJNTBGW31dGRARBOhA_BDr30M41zAUxoL5JJw7jsnRYHwJLMvJCShUc4RAEydBVHgiOMHkeHX0qnVED0WXXcmnP3aoc7277ecaF3AZuz2LoaZ4'
                  }
                  alt={
                    'Close up of a smart grid digital interface showing electricity flow through a city at night. The lighting is dominated by deep blues and vibrant cyan data visualizations. Technical precision and high-stakes infrastructure theme.'
                  }
                  className={
                    'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  }
                />
                <div className={'absolute bottom-0 left-0 p-6 z-20'}>
                  <h4
                    className={'text-white font-headline-md text-headline-md'}
                  >
                    {'Smart Grid'}
                  </h4>
                </div>
              </div>
              <div className={'relative group h-64 overflow-hidden rounded-xl'}>
                <div
                  className={
                    'absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all z-10'
                  }
                ></div>
                <StitchImage
                  src={
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCgJApu5c5a2u4Zyx7SmZSRIp7Yr04lbhcCX_e0Xjo-LH_mT-BQXetDhGzPCjU3FFmd5xQzBy_bkl002mnbnkf6b9r_NCcCcCOoGDXsTiVL2njVI2-m1zhlL1-EIGKaIILOoZwBlXlXlF8XX32Awdp2WlGo3EMi3X3UFKlHaLlVL3aqDOpyvjrN34_RCy5boN2ghwNYgVla0AdR14DoSgHl3G6JqobDutNsOH-gxHqK0nNuKolkre-p_TgfIo6K7lvdPKIVmRVXp04'
                  }
                  alt={
                    'Electric vehicle charging station infrastructure at a high-tech corporate campus. Sleek, minimalist design of the chargers with subtle LED indicators. Bright, clean light-mode photography.'
                  }
                  className={
                    'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  }
                />
                <div className={'absolute bottom-0 left-0 p-6 z-20'}>
                  <h4
                    className={'text-white font-headline-md text-headline-md'}
                  >
                    {'EV Infrastructure'}
                  </h4>
                </div>
              </div>
              <div className={'relative group h-64 overflow-hidden rounded-xl'}>
                <div
                  className={
                    'absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all z-10'
                  }
                ></div>
                <StitchImage
                  src={
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCwpF5yxuwVdTrJHAX8kvF2MYRppl6vaT15EM7NxLB_3668VBmA0gRMeI8g6XaQwROaPjcoAI_Mb2QgPT_hYetTuk7NoGylwr91_YPxqDvO2b6tLK7dlhII0I9EyOGtYEXcgfhDUQT-ZbvTL9J6kY1SZxnxZIbop9LZKX2G6YCO3iNFz4LET6hyqsgMZga-xNZ2djcCwcitBpOy-5e60YKkDmHvnFA7PuUiNnb3m7pQLQBRl1DNKJ1BSNZ4Ugw9FdpFyj1lbqwAz_E'
                  }
                  alt={
                    'An automated industrial production line with robotic arms assembling electronics. Focus on precision, motion, and high-tech manufacturing environment. Industrial minimalism style.'
                  }
                  className={
                    'w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  }
                />
                <div className={'absolute bottom-0 left-0 p-6 z-20'}>
                  <h4
                    className={'text-white font-headline-md text-headline-md'}
                  >
                    {'Industrial IoT'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
