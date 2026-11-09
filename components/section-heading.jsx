import { Reveal } from "@/components/reveal";
import { eyebrow } from "@/lib/styles";

// Section Heading ตาม DESIGN.md — กองกลางหน้า:
// ป้ายเล็กสี Slate (มี + สีทอง) → หัวข้อ Prompt 48px/400 สีกรมท่า → ย่อหน้า serif กว้างไม่เกิน 704px
// ใช้ซ้ำทุก section ของหน้าแรก ให้ระยะและขนาดตรงกันทั้งหน้า

export function SectionHeading({ label, title, body, className = "mb-14", tone = "paper" }) {
  const onDark = tone === "dark";

  return (
    <Reveal className={`mx-auto max-w-[704px] text-center ${className}`}>
      <p
        className={`mb-4 inline-flex items-center gap-2 ${eyebrow} ${
          onDark ? "text-on-navy" : "text-ink-muted dark:text-dark-ink-muted"
        }`}
      >
        <span aria-hidden="true" className="font-head text-base leading-none text-brand-accent">
          +
        </span>
        {label}
      </p>

      <h2
        className={`font-head text-[clamp(32px,4.4vw,48px)] leading-[1.2] font-normal tracking-[-0.02em] [text-wrap:balance] ${
          onDark ? "text-white" : "text-brand-navy dark:text-dark-ink"
        } ${body ? "mb-5" : ""}`}
      >
        {title}
      </h2>

      {body && (
        <p
          className={`font-serif text-[17px] leading-[1.7] ${
            onDark ? "text-on-navy" : "text-ink-muted dark:text-dark-ink-muted"
          }`}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}
