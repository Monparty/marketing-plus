import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { contact, site } from "@/lib/content";

function InfoCard({ label, children }) {
  return (
    <div className="rounded-card border border-line bg-white px-6 py-[22px] dark:border-dark-line dark:bg-dark-card dark:shadow-dark-card">
      <div className="mb-2 text-[13px] font-semibold tracking-[0.05em] text-ink-faint dark:text-dark-ink-faint">
        {label}
      </div>
      {children}
    </div>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-surface px-5 py-section dark:bg-dark-page-alt"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          label={contact.label}
          title={contact.title}
          body={contact.body}
          className="mb-10"
        />

        <Reveal className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          <InfoCard label="โทรศัพท์">
            <a
              href={site.phoneHref}
              className="font-head text-xl font-semibold text-brand-primary dark:text-dark-primary"
            >
              {site.phoneDisplay}
            </a>
          </InfoCard>

          <InfoCard label="อีเมล">
            <a
              href={`mailto:${site.email}`}
              className="text-base font-semibold break-all text-brand-primary dark:text-dark-primary"
            >
              {site.email}
            </a>
          </InfoCard>

          <InfoCard label="Facebook">
            <a
              href={site.facebookHref}
              target="_blank"
              rel="noopener"
              className="text-base font-semibold text-brand-primary dark:text-dark-primary"
            >
              {site.facebookDisplay}
            </a>
          </InfoCard>

          <InfoCard label="ที่อยู่">
            <p className="text-[15px] leading-[1.6] text-ink dark:text-dark-ink-muted">
              {site.address}
            </p>
          </InfoCard>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-6">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="flex-[1_1_160px] rounded-btn bg-brand-primary px-5 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-brand-navy hover:text-white dark:hover:bg-brand-primary/75"
              >
                โทรหาเรา
              </a>
              {/* บนพื้นมืด ปุ่มโครงน้ำเงินจมไปกับพื้น จึงใช้สีเน้นเหมือน
                  ปุ่ม ghost ของ hero ให้ภาษาปุ่มสอดคล้องกันทั้งหน้า */}
              <a
                href={site.facebookHref}
                target="_blank"
                rel="noopener"
                className="flex-[1_1_160px] rounded-btn border-[1.5px] border-brand-primary px-5 py-4 text-center text-base font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 dark:border-brand-accent dark:text-brand-accent dark:hover:bg-brand-accent/10"
              >
                ทักผ่าน Facebook
              </a>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-line bg-white dark:border-dark-line dark:bg-dark-card">
              <iframe
                title="แผนที่ Marketing Plus"
                src={site.mapSrc}
                width="100%"
                height={320}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
