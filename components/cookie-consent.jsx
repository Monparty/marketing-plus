"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Cookie, SlidersHorizontal, X } from "lucide-react";
import { cookieConsent } from "@/lib/content";

// แบนเนอร์ขอความยินยอมคุกกี้ — ตอนนี้เป็น UI อย่างเดียว
// ทุกปุ่มแค่ปิดแบนเนอร์ ยังไม่บันทึกค่าหรือเปิด/ปิดสคริปต์ใด ๆ จริง
// และจะโผล่ใหม่ทุกครั้งที่โหลดหน้า
//
// มุมซ้ายล่างบนจอใหญ่ เพื่อไม่ทับปุ่มสลับธีมกับปุ่มกลับขึ้นบนที่อยู่ขวาล่าง
// บนมือถือกางเต็มความกว้างและอยู่เหนือปุ่มทั้งสอง (z-70) จนกว่าจะถูกปิด

export function CookieConsent() {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState("banner");
    const [prefs, setPrefs] = useState(() =>
        Object.fromEntries(cookieConsent.categories.map((c) => [c.id, !!c.locked])),
    );

    // หน่วงเล็กน้อยให้แบนเนอร์เลื่อนขึ้นมาหลังหน้าโหลด แทนที่จะโผล่พร้อมเนื้อหา
    useEffect(() => {
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
    }, []);

    const close = () => setOpen(false);
    const { actions } = cookieConsent;

    return (
        <div
            role="dialog"
            aria-labelledby="cookie-title"
            aria-hidden={!open}
            inert={!open}
            className={`fixed inset-x-3 bottom-3 z-70 rounded-card border border-line bg-white pt-10 px-4 pb-4 shadow-hero transition-all duration-500 sm:right-auto sm:left-4.5 sm:bottom-4.5 sm:w-[400px] dark:border-dark-line dark:bg-dark-card dark:shadow-dark-card-hover ${
                open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
        >
            <button
                type="button"
                aria-label="ปิด"
                onClick={close}
                className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface hover:text-ink dark:text-dark-ink-faint dark:hover:bg-dark-card-alt dark:hover:text-dark-ink"
            >
                <X className="size-4" />
            </button>

            {view === "banner" ? (
                <>
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="w-full flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-warm text-brand-navy dark:bg-brand-accent/15 dark:text-brand-accent">
                                <Cookie className="size-5" />
                            </span>
                            <h2
                                id="cookie-title"
                                className="font-head text-md font-semibold text-brand-navy dark:text-dark-ink"
                            >
                                {cookieConsent.title}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setView("settings")}
                            className="flex items-center justify-center h-8 w-8 cursor-pointer rounded-lg text-ink-faint"
                        >
                            <SlidersHorizontal className="size-4" />
                        </button>
                    </div>
                    <p className="mb-4 text-sm leading-normal text-ink-muted dark:text-dark-ink-muted">
                        {cookieConsent.body}{" "}
                        <Link
                            href="/privacy"
                            className="font-medium text-brand-primary! underline underline-offset-2 dark:text-dark-primary!"
                        >
                            {cookieConsent.policyLabel}
                        </Link>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={close}
                            className="flex-1 cursor-pointer rounded-btn bg-brand-accent px-4 py-2 text-xs font-semibold text-brand-navy shadow-cta-sm transition hover:bg-brand-accent-hover"
                        >
                            {actions.accept}
                        </button>
                        <button
                            type="button"
                            onClick={close}
                            className="flex-1 cursor-pointer rounded-btn border border-line-strong px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-surface dark:border-dark-line dark:text-dark-ink dark:hover:bg-dark-card-alt"
                        >
                            {actions.reject}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-4 flex items-center gap-2 pr-8">
                        <button
                            type="button"
                            aria-label={actions.back}
                            onClick={() => setView("banner")}
                            className="-ml-1.5 flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface dark:text-dark-ink-muted dark:hover:bg-dark-card-alt"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <h2
                            id="cookie-title"
                            className="font-head text-md font-semibold text-brand-navy dark:text-dark-ink"
                        >
                            {cookieConsent.settingsTitle}
                        </h2>
                    </div>
                    <ul className="mb-4 flex flex-col gap-3">
                        {cookieConsent.categories.map((c) => (
                            <li
                                key={c.id}
                                className="flex items-start gap-3 rounded-btn bg-surface-alt p-3.5 dark:bg-dark-card-alt"
                            >
                                <div className="flex-1">
                                    <p className="mb-1 text-sm font-semibold text-ink dark:text-dark-ink">{c.title}</p>
                                    <p className="text-xs leading-[1.6] text-ink-muted dark:text-dark-ink-muted">
                                        {c.desc}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={prefs[c.id]}
                                    aria-label={c.title}
                                    disabled={c.locked}
                                    onClick={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }))}
                                    className={`relative mt-0.5 h-6 w-11 shrink-0 cursor-pointer rounded-pill transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                                        prefs[c.id]
                                            ? "bg-brand-primary dark:bg-dark-primary"
                                            : "bg-line-strong dark:bg-dark-line"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-card transition-transform ${
                                            prefs[c.id] ? "translate-x-5" : ""
                                        }`}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={close}
                        className="w-full cursor-pointer rounded-btn bg-brand-accent px-4 py-2 text-xs font-semibold text-brand-navy shadow-cta-sm transition hover:bg-brand-accent-hover"
                    >
                        {actions.save}
                    </button>
                </>
            )}
        </div>
    );
}
