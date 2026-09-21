import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clients } from "@/lib/content";

export function Clients() {
    return (
        <section className="bg-white px-5 py-section dark:bg-dark-page">
            <div className="mx-auto max-w-[1200px]">
                <SectionHeading label={clients.label} title={clients.title} className="mb-9" />

                {/* โลโก้ลูกค้ามีพื้นขาวหรือพื้นทึบในไฟล์ การ์ดจึงเป็นสีขาวทั้งสองธีม
                    ไม่งั้นโลโก้สีเข้ม (Sansiri) จะจมหายบนพื้นมืด */}
                <Reveal className="group mb-10 overflow-hidden mask-x-from-90% mask-x-to-100%">
                    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                        {Array(4)
                            .fill(clients.logos)
                            .flat()
                            .map((l, i) => (
                                <div
                                    key={i}
                                    aria-hidden={i >= clients.logos.length}
                                    className="mr-4 flex h-21 w-[180px] shrink-0 items-center justify-center overflow-hidden border-line bg-white dark:border-dark-line"
                                >
                                    <Image
                                        src={l.src}
                                        alt={i < clients.logos.length ? l.name : ""}
                                        sizes="180px"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                    {clients.quotes.map((q, i) => (
                        // พื้นครีมบนธีมสว่างคือจุดพักสายตา บนพื้นมืดสีครีมจะขุ่น
                        // จึงย้ายสัญญาณ "การ์ดอบอุ่น" ไปที่เส้นขอบสีเน้นแทน
                        <Reveal
                            as="figure"
                            key={i}
                            className="flex flex-col gap-4 rounded-card border border-transparent bg-warm px-6.5 py-7 dark:border-brand-accent/35 dark:bg-dark-card"
                        >
                            <span aria-hidden="true" className="font-head text-[28px] leading-none text-brand-accent">
                                +
                            </span>
                            <blockquote className="text-base leading-[1.75] text-ink dark:text-dark-ink">
                                {q.text}
                            </blockquote>
                            <figcaption className="text-sm font-medium text-ink-muted dark:text-dark-ink-muted">
                                {q.by}
                            </figcaption>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
