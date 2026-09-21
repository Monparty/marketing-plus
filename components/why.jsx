import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { why } from "@/lib/content";

export function Why() {
    return (
        <section id="why" className="bg-white px-5 py-section dark:bg-dark-page">
            <div className="mx-auto max-w-[1200px]">
                <SectionHeading label={why.label} title={why.title} />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
                    {why.items.map((p) => (
                        <Reveal
                            key={p.title}
                            className="rounded-card bg-surface px-6 py-7 transition-all! hover:-translate-y-1 dark:bg-dark-card"
                        >
                            <div className="mb-5 flex size-13 items-center justify-center rounded-[14px] bg-white dark:bg-dark-page-alt">
                                <span
                                    aria-hidden="true"
                                    className="font-head text-[22px] font-semibold text-brand-primary dark:text-dark-primary"
                                >
                                    {p.mark}
                                </span>
                            </div>

                            <h3 className="mb-2 font-head text-lg font-semibold text-brand-navy dark:text-dark-ink">
                                {p.title}
                            </h3>
                            <p className="text-[15px] leading-[1.7] text-ink-muted dark:text-dark-ink-muted">
                                {p.desc}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
