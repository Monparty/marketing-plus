import Link from "next/link";
import { Logo } from "@/components/logo";
import { privacy, site } from "@/lib/content";

export const metadata = {
  title: "นโยบายความเป็นส่วนตัว (PDPA)",
  description:
    "นโยบายความเป็นส่วนตัวของ Marketing Plus — ข้อมูลที่เราเก็บ วัตถุประสงค์ในการใช้ และสิทธิของเจ้าของข้อมูลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
};

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <header className="bg-brand-navy px-5 py-[18px]">
        <div className="mx-auto flex max-w-[820px] items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo variant="white" className="text-[24px]" />
          </Link>
          <Link
            href="/"
            className="ml-auto text-[15px] text-on-navy hover:text-brand-accent"
          >
            ← กลับหน้าแรก
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-5 pt-14 pb-20">
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="block size-2.5 rounded-full bg-brand-accent" />
          <span className="text-sm font-semibold tracking-[0.06em] text-brand-primary">
            {privacy.label}
          </span>
        </div>

        <h1 className="mb-3.5 font-head text-[clamp(30px,5vw,42px)] leading-[1.35] font-semibold text-brand-navy">
          {privacy.title}
        </h1>
        <p className="mb-10 text-[15px] text-ink-faint">{privacy.updated}</p>

        <p className="mb-10 text-[17px] leading-[1.8] text-ink">
          {privacy.intro}
        </p>

        {privacy.sections.map((s) => (
          <section key={s.n} className="mb-10">
            <h2 className="mb-3.5 flex items-baseline gap-3 font-head text-[22px] leading-[1.5] font-semibold text-brand-navy">
              <span className="text-[15px] font-semibold text-brand-accent">
                {s.n}
              </span>
              <span>{s.title}</span>
            </h2>

            <p className="mb-3.5 text-[17px] leading-[1.8] text-ink">
              {s.body}
            </p>

            {s.list.length > 0 && (
              <ul className="flex flex-col gap-2.5">
                {s.list.map((li) => (
                  <li
                    key={li}
                    className="flex items-start gap-3 text-base leading-[1.75] text-ink-muted"
                  >
                    <span className="mt-[9px] block size-1.5 shrink-0 rounded-full bg-brand-primary" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="mt-2 rounded-card bg-surface px-6.5 py-7">
          <h2 className="mb-3.5 font-head text-xl font-semibold text-brand-navy">
            {privacy.contactHeading}
          </h2>
          <div className="flex flex-col gap-2 text-base leading-[1.7] text-ink">
            <span>{site.name}</span>
            <span>{site.address}</span>
            <a href={site.phoneHref}>โทร {site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </main>

      <footer className="bg-brand-navy px-5 py-7 text-on-navy-muted">
        <div className="mx-auto flex max-w-[820px] flex-wrap justify-between gap-x-6 gap-y-3 text-sm">
          <span>{site.copyright}</span>
          <Link href="/" className="text-on-navy hover:text-brand-accent">
            หน้าแรก
          </Link>
        </div>
      </footer>
    </div>
  );
}
