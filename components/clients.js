import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clients } from "@/lib/content";

export function Clients() {
  return (
    <section className="bg-white px-5 py-section">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          label={clients.label}
          title={clients.title}
          className="mb-9"
        />

        {/* ที่วางโลโก้ลูกค้า — แทนที่ด้วยไฟล์โลโก้จริงเมื่อได้รับ */}
        <Reveal className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          {clients.logos.map((l) => (
            <div
              key={l}
              className="flex h-21 items-center justify-center rounded-[14px] border border-dashed border-line-dashed bg-surface-alt p-2.5 text-center font-mono text-xs text-ink-faint"
            >
              {l}
            </div>
          ))}
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {clients.quotes.map((q, i) => (
            <Reveal
              as="figure"
              key={i}
              className="flex flex-col gap-4 rounded-card bg-warm px-6.5 py-7"
            >
              <span
                aria-hidden="true"
                className="font-head text-[28px] leading-none text-brand-accent"
              >
                +
              </span>
              <blockquote className="text-base leading-[1.75] text-ink">
                {q.text}
              </blockquote>
              <figcaption className="text-sm font-medium text-ink-muted">
                {q.by}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
