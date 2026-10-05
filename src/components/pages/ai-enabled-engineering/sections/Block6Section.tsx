import Link from "next/link";

export function Block6Section() {
  return (
    <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-primary-container rounded-2xl p-12 lg:p-24 relative overflow-hidden text-center">
        <div className="relative z-10">
          <h2 className="font-display-lg text-headline-lg lg:text-display-lg text-white mb-8">
            Let us develop your next{" "}
            <span className="text-secondary-fixed">intelligent product</span>
          </h2>
          <p className="text-white/70 text-body-lg mb-12 max-w-2xl mx-auto">
            Let us develop your next intelligent product, Edge AI solution, or
            customer-specific engineering application.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/request-consultation"
              className="bg-white text-primary-container px-10 py-5 font-bold rounded-lg hover:scale-105 transition-transform"
            >
              Request Consultation
            </Link>
            <Link
              href="/contact-us"
              className="border border-white/20 text-white px-10 py-5 font-bold rounded-lg hover:bg-white/5 transition-colors"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
