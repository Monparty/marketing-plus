"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// ปุ่มกลับขึ้นบนสุด — ลอยอยู่เหนือปุ่มสลับธีม และโผล่เฉพาะตอนเลื่อนลงมาจนเห็น footer
// การเลื่อนแบบนุ่มมาจาก scroll-behavior ใน app/globals.css จึงไม่ต้องส่ง behavior เอง

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const io = new IntersectionObserver(([entry]) =>
            setVisible(entry.isIntersecting),
        );
        io.observe(footer);
        return () => io.disconnect();
    }, []);

    return (
        <button
            type="button"
            title="กลับขึ้นด้านบน"
            aria-label="กลับขึ้นด้านบน"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0 })}
            className={`fixed right-4.5 bottom-21 z-60 flex size-12 cursor-pointer items-center justify-center rounded-full bg-brand-accent text-brand-navy shadow-cta transition-all duration-300 hover:scale-105 ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <ArrowUp className="size-5" strokeWidth={2.5} />
        </button>
    );
}
