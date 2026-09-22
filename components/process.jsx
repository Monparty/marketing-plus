import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/content";

export function Process() {
  return (
    <section
      id="process"
      className="bg-surface px-5 py-section dark:bg-dark-page-alt"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading label={process.label} title={process.title} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {process.items.map((st) => (
            <Reveal
              key={st.n}
              className="relative rounded-card border border-line bg-white px-6 py-7 dark:border-dark-line dark:bg-dark-card dark:shadow-dark-card"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-9.5 items-center justify-center rounded-full bg-brand-primary font-head text-base font-semibold text-white">
                  {st.n}
                </span>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,#DCE3EF,rgba(220,227,239,0))] dark:bg-[linear-gradient(90deg,#46577F,rgba(70,87,127,0))]" />
          
              </div>
              <h3 className="mb-2 font-head text-lg font-semibold text-brand-navy dark:text-dark-ink">
                {st.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-ink-muted dark:text-dark-ink-muted">
                {st.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
