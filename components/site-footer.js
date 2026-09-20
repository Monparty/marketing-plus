import Link from "next/link";
import { Logo } from "@/components/logo";
import { footerLinks, site } from "@/lib/content";

// ท้ายเว็บ — พื้นกรมท่าเสมอ จึงบังคับโลโก้เป็นเวอร์ชันขาว ไม่ขึ้นกับธีม

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy px-5 pt-14 pb-8 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-9">
        <div>
          <Link href="/#top" className="mb-[18px] inline-flex">
            <Logo variant="white" className="text-[26px]" />
          </Link>
          <p className="max-w-[280px] text-[15px] leading-[1.7] text-on-navy">
            รับจัดอีเวนท์ ผลิตสื่อโฆษณา และวางแผนการตลาด สำหรับแบรนด์และโครงการอสังหาริมทรัพย์
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-head text-base font-semibold text-white">
            เมนู
          </h4>
          <div className="flex flex-col gap-2.5 text-[15px]">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-on-navy hover:text-brand-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-head text-base font-semibold text-white">
            ติดต่อ
          </h4>
          <div className="flex flex-col gap-2.5 text-[15px] leading-[1.6] text-on-navy">
            <a
              href={site.phoneHref}
              className="text-on-navy hover:text-brand-accent"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="break-all text-on-navy hover:text-brand-accent"
            >
              {site.email}
            </a>
            <a
              href={site.facebookHref}
              target="_blank"
              rel="noopener"
              className="text-on-navy hover:text-brand-accent"
            >
              {site.facebookDisplay}
            </a>
            <span>{site.address}</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-head text-base font-semibold text-white">
            เริ่มต้นโครงการ
          </h4>
          <Link
            href="/#contact"
            className="inline-block rounded-xl bg-brand-accent px-6 py-3.5 text-base font-semibold text-brand-navy hover:bg-brand-accent-hover hover:text-brand-navy"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm text-on-navy-muted">
        <span>{site.copyright}</span>
        <Link href="/privacy" className="text-on-navy hover:text-brand-accent">
          นโยบายความเป็นส่วนตัว (PDPA)
        </Link>
      </div>
    </footer>
  );
}
