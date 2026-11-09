import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { contact, site } from "@/lib/content";
import { btn } from "@/lib/styles";

// ช่องทางติดต่อเป็นแถวสเปกคั่นเส้น 1px (แบบ spec rows ใน DESIGN.md)
// ฟอร์มเป็น Floating Card ด้านซ้าย ปุ่ม + แผนที่ด้านขวา

function InfoRow({ label, icon, children }) {
  return (
    <div className="flex items-start gap-4 border-b border-line-strong py-5 dark:border-dark-line">
      <span
        aria-hidden="true"
        className="mt-0.5 text-brand-navy dark:text-dark-primary [&_svg]:size-5 [&_svg]:stroke-[1.5]"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-[13px] font-medium tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
          {label}
        </div>
        <div className="font-head text-[17px] leading-[1.5] text-brand-navy dark:text-dark-ink">{children}</div>
      </div>
    </div>
  );
}

const LINK = "underline-offset-4 hover:underline";

export function Contact() {
  return (
    <section id="contact" className="bg-surface px-5 py-section lg:px-gutter dark:bg-dark-page">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading label={contact.label} title={contact.title} body={contact.body} />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-8">
            <div className="border-t border-line-strong dark:border-dark-line">
              <InfoRow label="โทรศัพท์" icon={site.iconPhone}>
                <a href={site.phoneHref} className={LINK}>
                  {site.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow label="อีเมล" icon={site.iconMail}>
                <a href={`mailto:${site.email}`} className={`break-all ${LINK}`}>
                  {site.email}
                </a>
              </InfoRow>
              <InfoRow label="Facebook" icon={site.iconFace}>
                <a href={site.facebookHref} target="_blank" rel="noopener" className={LINK}>
                  {site.facebookDisplay}
                </a>
              </InfoRow>
              <InfoRow label="ที่อยู่" icon={site.iconAddr}>
                <p>{site.address}</p>
              </InfoRow>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={site.phoneHref} className={`${btn.navy} flex-[1_1_160px]`}>
                โทรหาเรา
              </a>
              <a
                href={site.facebookHref}
                target="_blank"
                rel="noopener"
                className={`${btn.outline} flex-[1_1_160px]`}
              >
                ทักผ่าน Facebook
              </a>
            </div>

            <div className="overflow-hidden bg-white dark:bg-dark-card">
              <iframe
                title="แผนที่ Marketing Plus"
                src={site.mapSrc}
                width="100%"
                height={300}
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
