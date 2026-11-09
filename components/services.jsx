import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";

// Service Plinth Block ตาม DESIGN.md — บล็อกพื้น Mist Plinth มุมเหลี่ยม ไม่มีเงา
// รายการย่อยเป็นแถวสเปกคั่นด้วยเส้น 1px

export function Services() {
  return (
    <section id="services" className="bg-white px-5 py-section lg:px-gutter dark:bg-dark-page">
      <div className="mx-auto max-w-[1422px]">
        <SectionHeading label={services.label} title={services.title} body={services.body} />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {services.items.map((s) => (
            <Reveal
              as="article"
              key={s.title}
              className="flex flex-col bg-surface p-8 transition-colors! hover:bg-tint-blue lg:p-10 dark:bg-dark-card dark:hover:bg-dark-tint"
            >
              <span
                aria-hidden="true"
                className="mb-10 text-brand-navy dark:text-dark-primary [&_svg]:size-7 [&_svg]:stroke-[1.5]"
              >
                {s.mark}
              </span>

              <h3 className="mb-2 font-head text-[30px] leading-[1.3] font-light tracking-[-0.02em] text-brand-navy dark:text-dark-ink">
                {s.title}
              </h3>
              <p className="mb-8 text-base leading-[1.7] text-ink-muted dark:text-dark-ink-muted">{s.desc}</p>

              <ul className="mt-auto border-t border-line dark:border-dark-line">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-3 text-[15px] leading-[1.6] text-ink dark:border-dark-line dark:text-dark-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
