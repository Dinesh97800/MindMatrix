import { siteContent } from "@/config/site-content";

export function HeroSection() {
  return (
    <section className="relative min-h-[640px] md:min-h-[819px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-center opacity-90"
          data-alt="Engineering bench with embedded prototype hardware under test."
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYmbMYrtbaUv9ure55r9yaOGB5FXHvEu74Sawbv3_UmbkKSpNgUu16TwZzLUJSYZ-BSZdlsP4noc5bVN_FtSDZqD1LIgTelZFdWLlzN3PiZmOzBjfETNR5an8rTp2pJkQnIW3IRp3ffPh0tW78zD1dFJhFAxTNESDto_1FOx-fT_Jno38FecoHsisPGrFuS8sUCjFL9JJSuJK2CNVq8PIuo92a7mGZxeY6ZLQ1IN4Rt_SRawAuoO5UqJAUfgMggMOgdD8OK4AqyYk')",
          }}
        />
      </div>
      <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-3xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-4 block">
            About Mind Matrix Intelligent Solutions
          </span>
          <h1 className="font-display-lg text-display-lg text-primary leading-tight mb-stack-md">
            Embedded Product Engineering Consultancy
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-stack-lg">
            {siteContent.locationStatement}
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            {siteContent.experienceStatement}.
          </p>
        </div>
      </div>
    </section>
  );
}
