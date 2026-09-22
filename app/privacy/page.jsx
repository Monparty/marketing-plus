import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { privacy, site } from "@/lib/content";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "นโยบายความเป็นส่วนตัว (PDPA)",
    description:
        "นโยบายความเป็นส่วนตัวของ Marketing Plus — ข้อมูลที่เราเก็บ วัตถุประสงค์ในการใช้ และสิทธิของเจ้าของข้อมูลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
};

export default function PrivacyPage() {
    return (
        <div className="w-full">
            <header className="bg-brand-navy px-5 py-[18px] dark:bg-dark-footer">
                <div className="mx-auto flex max-w-[820px] items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Logo variant="white" className="h-7.5 w-auto" />
                    </Link>

                    <Link
                        href="/"
                        className="ml-auto text-[15px] text-on-navy! hover:text-brand-accent! flex items-center gap-1"
                    >
                        <ChevronLeft className="size-6" />
                        กลับหน้าแรก
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-[820px] px-5 pt-14 pb-20">
                <div className="mb-3.5 flex items-center gap-2.5">
                    <span className="block size-2.5 rounded-full bg-brand-accent" />
                    <span className="text-sm font-semibold tracking-[0.06em] text-brand-primary dark:text-dark-primary">
                        {privacy.label}
                    </span>
                </div>

                <h1 className="mb-3.5 font-head text-[clamp(30px,5vw,42px)] leading-[1.35] font-semibold text-brand-navy dark:text-dark-ink">
                    {privacy.title}
                </h1>
                <p className="mb-10 text-[15px] text-ink-faint dark:text-dark-ink-faint">{privacy.updated}</p>

                <p className="mb-10 text-[17px] leading-[1.8] text-ink dark:text-dark-ink-muted">{privacy.intro}</p>

                {privacy.sections.map((s) => (
                    <section key={s.n} className="mb-10">
                        <h2 className="mb-3.5 flex items-baseline gap-3 font-head text-[22px] leading-[1.5] font-semibold text-brand-navy dark:text-dark-ink">
                            <span className="text-[15px] font-semibold text-brand-accent">{s.n}</span>
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
                                        <span className="mt-[9px] block size-1.5 shrink-0 rounded-full bg-brand-primary dark:bg-brand-accent" />
                                        <span>{li}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <div className="mt-2 rounded-card border border-transparent bg-surface px-6.5 py-7 dark:border-dark-line dark:bg-dark-card">
                    <h2 className="mb-3.5 font-head text-xl font-semibold text-brand-navy dark:text-dark-ink">
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
