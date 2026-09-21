import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { work } from "@/lib/content";
import Image from "next/image";

export function Work() {
    return (
        <section id="work" className="bg-surface px-5 py-section dark:bg-dark-page-alt">
            <div className="mx-auto max-w-[1200px]">
                <SectionHeading label={work.label} title={work.title} body={work.body} />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    {work.items.map((w) => (
                        <Reveal
                            as="article"
                            key={w.ph}
                            className="overflow-hidden rounded-card border border-line bg-white transition-all! hover:-translate-y-1.5 hover:shadow-work-hover dark:border-dark-line dark:bg-dark-card dark:hover:shadow-dark-card-hover"
                        >
                            {/* ที่วางภาพผลงาน 16:10 — แทนที่ด้วย next/image เมื่อได้ภาพจริง */}
                            <div className="relative">
                                <Image
                                    src={w.src}
                                    className="flex aspect-16/10 items-center justify-center bg-[repeating-linear-gradient(135deg,#E4E9F2_0_12px,#EEF1F7_12px_24px)] text-center dark:bg-[repeating-linear-gradient(135deg,#2B3760_0_12px,#242E4F_12px_24px)]"
                                />
                                <span className="absolute top-3.5 left-3.5 rounded-pill bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white dark:bg-dark-chip dark:text-dark-ink">
                                    {w.tag}
                                </span>
                            </div>

                            <div className="px-6 pt-[22px] pb-[26px]">
                                <h3 className="mb-2 font-head text-xl font-semibold text-brand-navy dark:text-dark-ink">
                                    {w.title}
                                </h3>
                                <p className="text-[15px] leading-[1.65] text-ink-muted dark:text-dark-ink-muted">
                                    {w.note}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
