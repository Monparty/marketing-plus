"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { hero } from "@/lib/content";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { Fragment } from "react";

// ส่วนหัวหน้าแรก — สีทั้งหมดอ่านจากตัวแปรธีม จึงเป็น server component ได้
// ลายเครื่องหมายบวกเป็น SVG ฝังใน --plus-pattern (globals.css)

export function Hero() {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false }));
    return (
        <section id="top" className="relative overflow-hidden" style={{ background: "var(--hero-bg)" }}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    opacity: "var(--plus-opacity)",
                    backgroundImage: "var(--plus-pattern)",
                    backgroundSize: "72px 72px",
                }}
            />

            <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pt-8 lg:pt-16 pb-8 lg:pb-16 nav:grid-cols-[1.05fr_0.95fr]">
                <div className="max-w-[620px]">
                    <div
                        className="mb-[22px] inline-flex items-center gap-2.5 rounded-pill px-4 py-2"
                        style={{ background: "var(--pill-bg)" }}
                    >
                        <span className="block size-[9px] rounded-full bg-brand-accent" />
                        <span className="text-sm font-medium" style={{ color: "var(--pill-text)" }}>
                            {hero.pill}
                        </span>
                    </div>

                    <h1
                        className="mb-5 font-head text-[clamp(34px,6.4vw,58px)] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:pretty]"
                        style={{ color: "var(--hero-title)" }}
                    >
                        {hero.titleLines[0]}
                        <span className="text-amber-400">{hero.titleLines[1]}</span>
                        {hero.titleLines[2]}
                    </h1>

                    <p className="mb-8 max-w-[520px] text-[18px] leading-[1.7]" style={{ color: "var(--hero-body)" }}>
                        {hero.body}
                    </p>

                    <div className="flex flex-wrap gap-3.5">
                        <a
                            href="#contact"
                            className="flex items-center justify-center cursor-pointer rounded-btn bg-brand-accent px-6 py-4 text-[17px] font-semibold text-brand-navy! shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-accent-hover"
                        >
                            ขอใบเสนอราคา
                        </a>
                        <a
                            href="#work"
                            className="flex items-center justify-center rounded-btn border-[1.5px] px-[30px] py-4 text-[17px] font-semibold transition-colors dark:hover:bg-brand-accent/10 hover:bg-blue-100"
                            style={{
                                borderColor: "var(--ghost-border)",
                                color: "var(--ghost-text)",
                            }}
                        >
                            ดูผลงาน
                        </a>
                    </div>

                    <div
                        className="mt-[34px] flex flex-wrap items-center gap-x-6.5 gap-y-2.5 text-[15px]"
                        style={{ color: "var(--hero-body)" }}
                    >
                        {hero.tags.map((tag, i) => (
                            <Fragment key={tag}>
                                {i > 0 && <span className="opacity-40">•</span>}
                                <span>{tag}</span>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* ที่วางภาพหลัก — แทนที่ div นี้ด้วย next/image เมื่อได้ภาพจริง */}
                <Carousel
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={() => plugin.current.play()}
                >
                    <CarouselContent>
                        {hero.imagePlaceholder?.map((item, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}
