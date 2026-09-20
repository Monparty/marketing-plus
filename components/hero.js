import { Fragment } from "react";
import { hero } from "@/lib/content";

// ส่วนหัวหน้าแรก — สีทั้งหมดอ่านจากตัวแปรธีม จึงเป็น server component ได้
// ลายเครื่องหมายบวกเป็น SVG ฝังใน --plus-pattern (globals.css)

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: "var(--plus-opacity)",
          backgroundImage: "var(--plus-pattern)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pt-16 pb-[72px] nav:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-[620px]">
          <div
            className="mb-[22px] inline-flex items-center gap-2.5 rounded-pill px-4 py-2"
            style={{ background: "var(--pill-bg)" }}
          >
            <span className="block size-[9px] rounded-full bg-brand-accent" />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--pill-text)" }}
            >
              {hero.pill}
            </span>
          </div>

          <h1
            className="mb-5 font-head text-[clamp(34px,6.4vw,58px)] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:pretty]"
            style={{ color: "var(--hero-title)" }}
          >
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
          </h1>

          <p
            className="mb-8 max-w-[520px] text-[18px] leading-[1.7]"
            style={{ color: "var(--hero-body)" }}
          >
            {hero.body}
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="rounded-btn bg-brand-accent px-[30px] py-4 text-[17px] font-semibold text-brand-navy shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-brand-navy"
            >
              ขอใบเสนอราคา
            </a>
            <a
              href="#work"
              className="rounded-btn border-[1.5px] px-[30px] py-4 text-[17px] font-semibold transition-colors hover:bg-brand-primary/10"
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
        <div className="overflow-hidden rounded-[20px] border border-brand-navy/10 shadow-hero dark:border-white/12">
          <div className="flex aspect-4/3 flex-col items-center justify-center gap-2.5 bg-[repeating-linear-gradient(135deg,#E9EDF5_0_12px,#F4F6FA_12px_24px)] p-6 text-center dark:bg-[repeating-linear-gradient(135deg,#2A3557_0_12px,#222C49_12px_24px)]">
            <span className="font-mono text-[13px] tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
              {hero.imagePlaceholder.main}
            </span>
            <span className="font-mono text-xs text-ink-faint dark:text-dark-ink-faint">
              {hero.imagePlaceholder.hint}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
