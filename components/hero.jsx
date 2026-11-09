"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { hero } from "@/lib/content";
import { btn } from "@/lib/styles";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { Fragment } from "react";

// Full-Bleed Scene Block ตาม DESIGN.md
// ภาพอีเวนท์เต็มจอเลื่อนวนอยู่ด้านหลัง ทับด้วย scrim สี Night Stage
// แล้ววางกองข้อความสีขาวไว้กลางจอ — header โปร่งใสลอยทับด้านบน

export function Hero() {
    // สร้าง plugin ครั้งเดียวด้วย lazy state — อ่านค่าตอน render ได้ (ref อ่านไม่ได้)
    const [autoplay] = React.useState(() => Autoplay({ delay: 5000, stopOnInteraction: false }));

    return (
        <section
            id="top"
            className="relative isolate flex h-[clamp(600px,92svh,1000px)] items-center justify-center overflow-hidden bg-dark-page text-white"
        >
            <Carousel plugins={[autoplay]} opts={{ loop: true }} className="absolute inset-0 -z-10">
                <CarouselContent className="ml-0 h-[clamp(600px,92svh,1000px)]">
                    {hero.imagePlaceholder?.map((item, index) => (
                        <CarouselItem key={index} className="relative h-full pl-0">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="100vw"
                                priority={index === 0}
                                className="object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* ปุ่มเลื่อนภาพ — มุมซ้ายล่างแบบปุ่มหยุดฟิล์มในต้นแบบ */}
                <div className="absolute bottom-6 left-5 z-10 flex gap-2 lg:left-gutter">
                    <CarouselPrevious className="static size-10 translate-y-0 rounded-pill border-white/40 bg-transparent! text-white hover:bg-white/15! [&_svg]:text-white" />
                    <CarouselNext className="static size-10 translate-y-0 rounded-pill border-white/40 bg-transparent! text-white hover:bg-white/15! [&_svg]:text-white" />
                </div>
            </Carousel>

            {/* scrim — มืดขึ้นด้านล่างให้ตัวอักษรอ่านได้ทุกภาพ */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(30,39,64,0.6)_0%,rgba(30,39,64,0.5)_45%,rgba(30,39,64,0.8)_100%)]"
            />

            <div className="mx-auto flex max-w-[980px] flex-col items-center px-5 pt-16 text-center">
                <p className="mb-6 text-sm font-medium tracking-[0.04em] text-on-navy">{hero.pill}</p>

                <h1 className="mb-6 font-head text-[clamp(40px,6vw,77px)] leading-[1.2] font-normal tracking-[-0.02em] [text-wrap:balance]">
                    {hero.titleLines[0]}
                    <span className="text-brand-accent">{hero.titleLines[1]}</span>
                    {hero.titleLines[2]}
                </h1>

                <p className="mb-10 max-w-[620px] text-[17px] leading-[1.7] text-on-navy-bright">{hero.body}</p>

                <div className="flex flex-wrap justify-center gap-3">
                    <a href="#contact" className={btn.goldPill}>
                        ขอใบเสนอราคา
                    </a>
                    <a href="#work" className={btn.film}>
                        ดูผลงาน
                    </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium tracking-[0.04em] text-on-navy">
                    {hero.tags.map((tag, i) => (
                        <Fragment key={tag}>
                            {i > 0 && <span className="text-brand-accent">+</span>}
                            <span>{tag}</span>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
