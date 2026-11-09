import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { work } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

// Plinth Work Card ตาม DESIGN.md — ภาพวางบนพื้น Mist Plinth ขอบใน 8px มุมเหลี่ยม
// คำบรรยายเล็กกลางการ์ด กริดกว้างไม่เท่ากัน: ชิ้นแรกกิน 2×2 บนเดสก์ท็อป

export function Work() {
    return (
        <section id="work" className="bg-white px-5 py-section lg:px-gutter dark:bg-dark-page-alt">
            <div className="mx-auto max-w-[1422px]">
                <SectionHeading label={work.label} title={work.title} body={work.body} />

                <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {work.items.map((w, i) => {
                        const feature = i === 0;
                        return (
                            <Reveal
                                as="article"
                                key={w.slug}
                                className={feature ? "sm:col-span-2 lg:row-span-2" : ""}
                            >
                                <Link href={`/work/${w.slug}`} className="group flex h-full flex-col">
                                    <div className={`relative overflow-hidden bg-surface p-2 dark:bg-dark-card ${feature ? "flex-1" : ""}`}>
                                        <div className="relative h-full min-h-0 overflow-hidden">
                                            <Image
                                                src={w.src}
                                                alt={w.title}
                                                sizes={feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                                                className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                                                    feature ? "aspect-16/10 lg:aspect-auto lg:h-full" : "aspect-16/10"
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    <div className="px-4 pt-5 text-center">
                                        <p className="mb-1.5 text-[13px] font-medium tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
                                            {w.tag}
                                        </p>
                                        <h3 className="mb-1.5 font-head text-lg leading-[1.35] text-brand-navy dark:text-dark-ink">
                                            {w.title}
                                        </h3>
                                        <p className="mx-auto max-w-[440px] text-sm leading-[1.6] text-ink-muted dark:text-dark-ink-muted">
                                            {w.note}
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
