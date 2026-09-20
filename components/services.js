import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bg-white px-5 py-section">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          label={services.label}
          title={services.title}
          body={services.body}
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {services.items.map((s) => (
            <Reveal
              as="article"
              key={s.title}
              className="rounded-card border border-line bg-white px-7 py-8 shadow-card transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="mb-5 flex size-13 items-center justify-center rounded-[14px] bg-tint-blue">
                <span
                  aria-hidden="true"
                  className="font-head text-[22px] font-semibold text-brand-primary"
                >
                  {s.mark}
                </span>
              </div>

              <h3 className="mb-2.5 font-head text-[22px] font-semibold text-brand-navy">
                {s.title}
              </h3>
              <p className="mb-5 text-base leading-[1.7] text-ink-muted">
                {s.desc}
              </p>

              <ul className="flex flex-col gap-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-ink"
                  >
                    <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-brand-accent" />
                    <span>{item}</span>
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
