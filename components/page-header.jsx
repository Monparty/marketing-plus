import Link from "next/link";
import { Logo } from "@/components/logo";
import { btn } from "@/lib/styles";

// Header ของหน้าย่อย (ผลงาน / PDPA) — พื้นกระดาษ ตัวอักษรกรมท่า ไม่มีเงาและเส้นขอบ
// ตาม Transparent Header Bar ใน DESIGN.md ตอนวางอยู่บน Paper

export function PageHeader() {
    return (
        <header className="bg-white px-5 lg:px-gutter dark:bg-dark-page">
            <div className="mx-auto flex h-16 max-w-[1422px] items-center gap-4 lg:h-20">
                <Link href="/" className="flex items-center" aria-label="กลับหน้าแรก">
                    <Logo className="h-6 w-auto lg:h-8" />
                </Link>
                <Link href="/#contact" className={`${btn.gold} ml-auto h-10 px-5 text-[15px]`}>
                    ขอใบเสนอราคา
                </Link>
            </div>
        </header>
    );
}

// Breadcrumb กลางหน้า สี Slate — แต่ละรายการเป็น { href, label } ตัวสุดท้ายไม่มี href
export function Breadcrumb({ items }) {
    return (
        <nav aria-label="breadcrumb" className="mb-6 flex flex-wrap justify-center gap-2 text-[13px] font-medium tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
            {items.map((it, i) => (
                <span key={it.label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {it.href ? (
                        <Link href={it.href} className="underline-offset-4 hover:text-brand-navy hover:underline dark:hover:text-dark-ink">
                            {it.label}
                        </Link>
                    ) : (
                        <span aria-current="page" className="text-brand-navy dark:text-dark-ink">
                            {it.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}
