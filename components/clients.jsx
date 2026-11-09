import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clients } from "@/lib/content";

// โลโก้ลูกค้าเลื่อนวน + Testimonial Card (Warm Cream มุมเหลี่ยม คำพูดเป็น serif)

export function Clients() {
    return (
        <section className="bg-white px-5 py-section lg:px-gutter dark:bg-dark-page-alt">
            <div className="mx-auto max-w-[1422px]">
                <SectionHeading label={clients.label} title={clients.title} className="mb-12" />

                {/* โลโก้ลูกค้ามีพื้นขาวในไฟล์ จึงวางบนช่องสีขาวทั้งสองธีม
                    ไม่งั้นโลโก้สีเข้ม (Sansiri) จะจมหายบนพื้นมืด */}
                <Reveal className="group mb-16 overflow-hidden mask-x-from-90% mask-x-to-100%">
                    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                        {Array(4)
                            .fill(clients.logos)
                            .flat()
                            .map((l, i) => (
                                <div
                                    key={i}
                                    aria-hidden={i >= clients.logos.length}
                                    className="mr-2 flex h-24 w-[200px] shrink-0 items-center justify-center overflow-hidden bg-white px-6"
                                >
                                    <Image
                                        src={l.src}
                                        alt={i < clients.logos.length ? l.name : ""}
                                        sizes="200px"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {clients.quotes.map((q, i) => (
                        // บนพื้นมืดสีครีมจะขุ่น จึงย้ายสัญญาณ "การ์ดอบอุ่น" ไปที่เส้นขอบสีทองแทน
                        <Reveal
                            as="figure"
                            key={i}
                            className="flex flex-col gap-5 border border-transparent bg-warm p-8 dark:border-brand-accent/35 dark:bg-dark-card"
                        >
                            <span aria-hidden="true" className="font-head text-[28px] leading-none text-brand-accent">
                                +
                            </span>
                            <blockquote className="font-serif text-[17px] leading-[1.7] text-ink dark:text-dark-ink">
                                {q.text}
                            </blockquote>
                            <figcaption className="mt-auto text-[13px] font-medium tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
                                {q.by}
                            </figcaption>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
