"use client";

import { useEffect, useRef } from "react";

// ค่อย ๆ ปรากฏเมื่อเลื่อนถึง — สไตล์อยู่ใน app/globals.css ที่ [data-reveal]
//
// ต้นฉบับใน .dc.html ใช้ setInterval สแกน DOM ทุก 800ms เพราะ design tool
// มองไม่เห็นตอน element ถูกเพิ่ม ที่นี่ผูก observer กับ element ของตัวเองตรง ๆ
// จึงไม่ต้อง poll

export function Reveal({ as: Tag = "div", className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}
