import { Reveal } from "@/components/reveal";
import { why } from "@/lib/content";
import { eyebrow } from "@/lib/styles";
import Image from "next/image";
import whyImage from "@/public/assets/img3.jpg";

// Plus Blue Split Panel ตาม DESIGN.md — พื้นอิ่มสีผืนเดียวของหน้า
// ซ้ายเป็นภาพงานจริงเต็มครึ่ง ขวาเป็นคอลัมน์ข้อความบนพื้น Plus Blue มุมเหลี่ยม

export function Why() {
    return (
        <section id="why" className="grid grid-cols-1 bg-brand-primary text-white lg:grid-cols-2 dark:bg-dark-tint">
            <div className="relative min-h-[320px] lg:min-h-[720px]">
                <Image
                    src={whyImage}
                    alt="บรรยากาศงานอีเวนท์ที่ทีม Marketing Plus ดูแล"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex items-center px-5 py-section lg:px-16 xl:px-24">
                <Reveal className="w-full max-w-[560px]">
                    <p className={`mb-4 inline-flex items-center gap-2 text-on-navy ${eyebrow}`}>
                        <span aria-hidden="true" className="font-head text-base leading-none text-brand-accent">
                            +
                        </span>
                        {why.label}
                    </p>
                    <h2 className="mb-12 font-head text-[clamp(32px,4.4vw,48px)] leading-[1.2] font-normal tracking-[-0.02em]">
                        {why.title}
                    </h2>

                    <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                        {why.items.map((p) => (
                            <div key={p.title}>
                                <span
                                    aria-hidden="true"
                                    className="mb-4 block text-brand-accent [&_svg]:size-6 [&_svg]:stroke-[1.5]"
                                >
                                    {p.mark}
                                </span>
                                <h3 className="mb-2 font-head text-[22px] leading-[1.3] font-normal">{p.title}</h3>
                                <p className="text-base leading-[1.7] text-on-navy">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
