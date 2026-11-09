import { Breadcrumb, PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { privacy, site } from "@/lib/content";
import Link from "next/link";

export const metadata = {
    title: "นโยบายความเป็นส่วนตัว (PDPA)",
    description:
        "นโยบายความเป็นส่วนตัวของ Marketing Plus — ข้อมูลที่เราเก็บ วัตถุประสงค์ในการใช้ และสิทธิของเจ้าของข้อมูลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
};

export default function PrivacyPage() {
    return (
        <div className="w-full">
            <PageHeader />

            <main className="mx-auto max-w-[760px] px-5 pt-14 pb-section">
                <div className="mb-16 text-center">
                    <Breadcrumb items={[{ href: "/", label: "หน้าแรก" }, { label: privacy.label }]} />
                    <h1 className="mb-4 font-head text-[clamp(32px,4.4vw,48px)] leading-[1.2] font-normal tracking-[-0.02em] text-brand-navy dark:text-dark-ink">
                        {privacy.title}
                    </h1>
                    <p className="mb-8 text-[13px] font-medium tracking-[0.04em] text-ink-faint dark:text-dark-ink-faint">
                        {privacy.updated}
                    </p>
                    <p className="font-serif text-[17px] leading-[1.7] text-ink-muted dark:text-dark-ink-muted">{privacy.intro}</p>
                </div>

                {privacy.sections.map((s) => (
                    <section key={s.n} className="mb-12 border-t border-line-strong pt-8 dark:border-dark-line">
                        <h2 className="mb-3.5 flex items-baseline gap-3 font-head text-[22px] leading-[1.4] font-normal text-brand-navy dark:text-dark-ink">
                            <span className="text-[15px] text-ink-muted dark:text-dark-ink-muted">{s.n}</span>
                            <span>{s.title}</span>
                        </h2>

                        <p className="mb-3.5 text-[17px] leading-[1.8] text-ink dark:text-dark-ink-muted">{s.body}</p>

                        {s.list.length > 0 && (
                            <ul className="flex flex-col gap-2.5">
                                {s.list.map((li) => (
                                    <li
                                        key={li}
                                        className="flex items-start gap-3 text-base leading-[1.75] text-ink-muted dark:text-dark-ink-muted"
                                    >
                                        <span className="mt-[9px] block size-1.5 shrink-0 rounded-full bg-brand-accent" />
                                        <span>{li}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <div className="mt-4 bg-surface p-8 dark:bg-dark-card">
                    <h2 className="mb-4 font-head text-[22px] leading-[1.4] font-normal text-brand-navy dark:text-dark-ink">
                        {privacy.contactHeading}
                    </h2>
                    <div className="flex flex-col gap-2 text-base leading-[1.7] text-ink dark:text-dark-ink-muted!">
                        <span>{site.name}</span>
                        <span>{site.address}</span>
                        <a className="text-ink! hover:underline! dark:text-dark-ink-muted!" href={site.phoneHref}>
                            โทร {site.phoneDisplay}
                        </a>
                        <a
                            className="text-ink! hover:underline! dark:text-dark-ink-muted!"
                            href={`mailto:${site.email}`}
                        >
                            {site.email}
                        </a>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
