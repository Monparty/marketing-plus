import { Reveal } from "@/components/reveal";

// หัวข้อประจำ section: จุดเหลือง + ป้ายกำกับ + H2 + คำอธิบาย (ถ้ามี)
// ใช้ซ้ำทุก section ของหน้าแรก ให้ระยะและขนาดตรงกันทั้งหน้า

export function SectionHeading({ label, title, body, className = "mb-11" }) {
  return (
    <Reveal className={`max-w-[640px] ${className}`}>
      <div className="mb-3.5 flex items-center gap-2">
        <span className="block h-5 w-1 bg-brand-accent" />
        <span className="text-sm font-semibold tracking-[0.06em] text-brand-primary dark:text-dark-primary">
          {label}
        </span>
      </div>

      <h2
        className={`font-head text-[clamp(28px,4.4vw,40px)] leading-[1.35] font-semibold text-brand-navy dark:text-dark-ink ${
          body ? "mb-3.5" : ""
        }`}
      >
        {title}
      </h2>

      {body && (
        <p className="text-[17px] leading-[1.7] text-ink-muted dark:text-dark-ink-muted">
          {body}
        </p>
      )}
    </Reveal>
  );
}
