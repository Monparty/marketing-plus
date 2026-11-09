import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/content";

// Process Steps ตาม DESIGN.md — สี่คอลัมน์คั่นด้วยเส้นบน 1px
// เลขขั้นตอนอยู่ใน pill แบบโครง (inset ring) ไม่มีพื้นการ์ด

export function Process() {
  return (
    <section id="process" className="bg-surface px-5 py-section lg:px-gutter dark:bg-dark-page">
      <div className="mx-auto max-w-[1422px]">
        <SectionHeading label={process.label} title={process.title} />

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.items.map((st) => (
            <Reveal as="li" key={st.n} className="border-t border-line-strong pt-6 dark:border-dark-line">
              <span className="mb-6 inline-flex h-[34px] items-center rounded-pill bg-white px-4 font-head text-[17px] leading-none text-brand-navy shadow-ring dark:bg-transparent dark:text-dark-ink dark:shadow-ring-dark">
                {st.n}
              </span>
              <h3 className="mb-2 font-head text-[22px] leading-[1.3] font-normal text-brand-navy dark:text-dark-ink">
                {st.title}
              </h3>
              <p className="text-base leading-[1.7] text-ink-muted dark:text-dark-ink-muted">{st.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
