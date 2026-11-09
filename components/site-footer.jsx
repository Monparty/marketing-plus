import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";
import { footerLinks, site } from "@/lib/content";
import { btn } from "@/lib/styles";

// Night Link Footer ตาม DESIGN.md — พื้น Footer Night เสมอ ไม่ขึ้นกับธีม
// ลิงก์เมนูตัวใหญ่ Prompt 26px สีขาว รายละเอียดติดต่อและลิงก์กฎหมายเป็นสี On-Navy

export function SiteFooter() {
    return (
        <footer className="bg-dark-footer px-5 pt-16 pb-8 text-white lg:px-gutter">
            <div className="mx-auto max-w-[1422px]">
                <div className="mb-14 flex flex-wrap items-center justify-between gap-6">
                    <Link href="/#top" className="inline-flex">
                        <Logo variant="white" className="h-8 w-auto" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
                    <div className="grid gap-2">
                        <p className="max-w-80 font-serif text-[17px] leading-[1.7] text-on-navy">
                            รับจัดอีเวนท์ ผลิตสื่อโฆษณา และวางแผนการตลาด สำหรับแบรนด์และโครงการอสังหาริมทรัพย์
                        </p>
                        <div className="w-fit">
                            <Link href="/#contact" className={btn.goldPill}>
                                ขอใบเสนอราคา
                            </Link>
                        </div>
                    </div>

                    <nav aria-label="เมนูท้ายเว็บ" className="flex flex-col">
                        {footerLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="py-2 font-head text-[26px] leading-[1.2] tracking-[-0.02em] text-white transition-colors hover:text-brand-accent"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-3 text-[15px] leading-[1.6] text-on-navy">
                        <a
                            href={site.phoneHref}
                            className="font-head text-[26px] leading-[1.2] tracking-[-0.02em] text-white hover:text-brand-accent"
                        >
                            {site.phoneDisplay}
                        </a>
                        <a href={`mailto:${site.email}`} className="break-all hover:text-brand-accent">
                            {site.email}
                        </a>
                        <a href={site.facebookHref} target="_blank" rel="noopener" className="hover:text-brand-accent">
                            {site.facebookDisplay}
                        </a>
                        <span>{site.address}</span>
                    </div>
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[13px] text-on-navy-muted">
                    <span>{site.copyright}</span>
                    <Link href="/privacy" className="hover:text-brand-accent">
                        นโยบายความเป็นส่วนตัว (PDPA)
                    </Link>
                </div>
            </div>
        </footer>
    );
}
