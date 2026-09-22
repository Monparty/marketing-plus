"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/content";
import { Menu } from "lucide-react";

// แถบบนแบบ sticky — สีทั้งหมดอ่านจากตัวแปรธีม (--nav-*) ใน globals.css
// เมนูเดสก์ท็อป/มือถือสลับกันที่ 900px ด้วย breakpoint `nav:` ของ Tailwind
// (ต้นฉบับใช้ JS ฟัง resize เพราะ design tool เขียน media query ไม่ได้)

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    // hide header on scroll down
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const threshold = 50;
                    if (currentScrollY <= threshold) {
                        setShow(true);
                    } else if (currentScrollY > lastScrollY.current) {
                        setShow(false);
                    } else {
                        setShow(true);
                    }
                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-[translate,opacity] duration-300 ease-out [backdrop-filter:saturate(140%)_blur(8px)] ${show || menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
            style={{
                background: "var(--nav-bg)",
                borderColor: "var(--nav-border)",
            }}
        >
            <div className="mx-auto flex max-w-[1200px] items-center gap-5 px-5 py-2 lg:py-3.5">
                <Link href="/#top" className="flex shrink-0 items-center">
                    <Logo className="h-4.5 lg:h-8 w-auto" priority />
                </Link>

                {/* เมนูเดสก์ท็อป */}
                <nav className="ml-auto hidden items-center gap-2 nav:flex">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="rounded-[10px] px-3.5 py-2.5 text-[15px] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                            style={{ color: "var(--nav-link)" }}
                        >
                            {l.label}
                        </a>
                    ))}

                    <a
                        href={site.phoneHref}
                        className="rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                        style={{ color: "var(--nav-link)" }}
                    >
                        {site.phoneDisplay}
                    </a>

                    <a
                        href="#contact"
                        className="cursor-pointer rounded-btn bg-brand-accent px-4 py-2 text-[15px] font-semibold text-brand-navy! shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-accent-hover"
                    >
                        ขอใบเสนอราคา
                    </a>
                </nav>

                {/* ปุ่มเมนูมือถือ */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="เมนู"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="ml-auto flex size-7 cursor-pointer flex-col items-center justify-center rounded-md border bg-transparent nav:hidden"
                    style={{ borderColor: "var(--nav-border)" }}
                >
                    <Menu className="size-4.5" />
                </button>
            </div>

            {/* เมนูมือถือ */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    className="flex flex-col gap-0.5 border-t px-5 pt-3 pb-5 nav:hidden"
                    style={{
                        background: "var(--nav-bg)",
                        borderColor: "var(--nav-border)",
                    }}
                >
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-1.5 py-3.5 text-[17px]"
                            style={{ color: "var(--nav-link)" }}
                        >
                            {l.label}
                        </a>
                    ))}

                    <a
                        href={site.phoneHref}
                        className="px-1.5 py-3.5 text-[17px] font-semibold"
                        style={{ color: "var(--nav-link)" }}
                    >
                        โทร {site.phoneDisplay}
                    </a>

                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center cursor-pointer rounded-btn bg-brand-accent px-6 py-4 text-[17px] font-semibold text-brand-navy! shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-accent-hover"
                    >
                        ขอใบเสนอราคา
                    </a>
                </div>
            )}
        </header>
    );
}
