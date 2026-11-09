"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/content";
import { btn } from "@/lib/styles";
import { Menu, X } from "lucide-react";

// Transparent Header Bar ตาม DESIGN.md
// - ลอยทับ hero: โปร่งใส ตัวอักษรขาว
// - เลื่อนลงพ้นขอบบน: พื้นกระดาษ 95% ตัวอักษรกรมท่า (ธีม B เป็นพื้นกรมท่าเข้ม)
// - ซ่อนเมื่อเลื่อนลง โผล่กลับเมื่อเลื่อนขึ้น ไม่มีเงาและไม่มีเส้นขอบ
// เมนูเดสก์ท็อป/มือถือสลับกันที่ 900px ด้วย breakpoint `nav:`

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [solid, setSolid] = useState(false);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                setSolid(y > 24);
                if (y <= 50) setShow(true);
                else setShow(y < lastScrollY.current);
                lastScrollY.current = y;
                ticking.current = false;
            });
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const onPaper = solid || menuOpen;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color] duration-300 ease-out ${
                show || menuOpen ? "translate-y-0" : "-translate-y-full"
            } ${
                onPaper
                    ? "bg-white/95 text-brand-navy backdrop-blur-md dark:bg-dark-page/95 dark:text-dark-ink"
                    : "bg-transparent text-white"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-[1422px] items-center gap-6 px-5 lg:h-20 lg:px-gutter">
                <Link href="/#top" className="flex shrink-0 items-center" aria-label="กลับด้านบน">
                    {onPaper ? (
                        <Logo className="h-6 w-auto lg:h-8" priority />
                    ) : (
                        <Logo variant="white" className="h-6 w-auto lg:h-8" priority />
                    )}
                </Link>

                {/* เมนูเดสก์ท็อป */}
                <nav className="ml-auto hidden items-center gap-7 nav:flex">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="font-head text-[15px] leading-none underline-offset-6 hover:underline"
                        >
                            {l.label}
                        </a>
                    ))}

                    <a
                        href={site.phoneHref}
                        className="font-head text-[15px] leading-none underline-offset-6 hover:underline"
                    >
                        {site.phoneDisplay}
                    </a>

                    <a href="#contact" className={`${btn.gold} h-10 px-5 text-[15px]`}>
                        ขอใบเสนอราคา
                    </a>
                </nav>

                {/* ปุ่มเมนูมือถือ */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? "ปิดเมนู" : "เมนู"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="ml-auto flex size-10 cursor-pointer items-center justify-center nav:hidden"
                >
                    {menuOpen ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
                </button>
            </div>

            {/* เมนูมือถือ — drawer กระดาษ ลิงก์ 22px */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    className="flex h-[calc(100svh-64px)] flex-col bg-white px-5 pt-4 pb-8 dark:bg-dark-page nav:hidden"
                >
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-3 font-head text-[22px] leading-[1.2] tracking-[-0.01em]"
                        >
                            {l.label}
                        </a>
                    ))}

                    <div className="my-4 h-px bg-line-strong dark:bg-dark-line" />

                    <a href={site.phoneHref} className="py-2 text-base">
                        โทร {site.phoneDisplay}
                    </a>

                    <a href="#contact" onClick={() => setMenuOpen(false)} className={`${btn.gold} mt-auto w-full`}>
                        ขอใบเสนอราคา
                    </a>
                </div>
            )}
        </header>
    );
}
