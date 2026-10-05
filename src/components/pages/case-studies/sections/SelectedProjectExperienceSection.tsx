import {
  caseStudies,
  caseStudyConfidentialityNote,
} from "@/data/case-studies";

export function SelectedProjectExperienceSection() {
  return (
    <section className="space-y-stack-lg">
      <div className="max-w-3xl">
        <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-3">
          Selected Project Experience
        </p>
        <p className="font-body-lg text-on-surface-variant">
          Anonymized summaries of representative embedded engineering work. Customer identity and
          selected implementation details are withheld under confidentiality obligations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {caseStudies.map((project) => (
          <article
            key={project.slug}
            className="rounded-xl border border-outline-variant/20 bg-white p-6 md:p-8 space-y-4"
          >
            <h2 className="font-headline-md text-headline-md text-primary">{project.title}</h2>
            <div className="space-y-3 text-sm md:text-base">
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  Customer requirement
                </h3>
                <p className="text-on-surface-variant">{project.requirement}</p>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  MMIS responsibility
                </h3>
                <p className="text-on-surface-variant">{project.responsibility}</p>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  Technology
                </h3>
                <p className="text-on-surface-variant">{project.technology}</p>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  Engineering challenge
                </h3>
                <p className="text-on-surface-variant">{project.challenge}</p>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  Solution
                </h3>
                <p className="text-on-surface-variant">{project.solution}</p>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant mb-1">
                  Result / status
                </h3>
                <p className="text-on-surface-variant">{project.result}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-on-surface-variant italic border-l-2 border-primary/30 pl-4">
        {caseStudyConfidentialityNote}
      </p>
    </section>
  );
}
