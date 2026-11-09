import { Breadcrumb, PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { work } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function findWork(slug) {
    return work.items.find((w) => w.slug === slug);
}

export function generateStaticParams() {
    return work.items.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = findWork(slug);
    if (!item) return {};
    return { title: item.title.trim(), description: item.note };
}

export default async function WorkDetailPage({ params }) {
    const { slug } = await params;
    const item = findWork(slug);
    if (!item) notFound();

    const others = work.items.filter((w) => w.slug !== slug).slice(0, 3);

    return (
        <div className="w-full">
            <PageHeader />

            <main className="px-5 pt-14 pb-section lg:px-gutter">
                <div className="mx-auto max-w-[704px] text-center">
                    <Breadcrumb
                        items={[
                            { href: "/", label: "หน้าแรก" },
                            { href: "/#work", label: "ผลงาน" },
                            { label: item.tag },
                        ]}
                    />
                    <h1 className="mb-5 font-head text-[clamp(32px,4.4vw,48px)] leading-[1.2] font-normal tracking-[-0.02em] text-brand-navy [text-wrap:balance] dark:text-dark-ink">
                        {item.title}
                    </h1>
                    <p className="mb-12 font-serif text-[17px] leading-[1.7] text-ink-muted dark:text-dark-ink-muted">
                        {item.note}
                    </p>
                </div>

                {/* ภาพหลักบน Mist Plinth ขอบใน 8px มุมเหลี่ยม */}
                <div className="mx-auto max-w-[1200px] bg-surface p-2 dark:bg-dark-card">
                    <Image
                        src={item.src}
                        alt={item.title}
                        loading="eager"
                        fetchPriority="high"
                        sizes="(min-width: 1200px) 1200px, 100vw"
                        className="aspect-16/10 w-full object-cover"
                    />
                </div>

                {others.length > 0 && (
                    <section className="mx-auto mt-section max-w-[1422px]">
                        <h2 className="mb-10 text-center font-head text-[30px] leading-[1.3] font-light tracking-[-0.02em] text-brand-navy dark:text-dark-ink">
                            ผลงานอื่น ๆ
                        </h2>
                        <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-3">
                            {others.map((w) => (
                                <Link key={w.slug} href={`/work/${w.slug}`} className="group block">
                                    <div className="overflow-hidden bg-surface p-2 dark:bg-dark-card">
                                        <div className="overflow-hidden">
                                            <Image
                                                src={w.src}
                                                alt={w.title}
                                                sizes="(min-width: 640px) 33vw, 100vw"
                                                className="aspect-16/10 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-4 pt-5 text-center">
                                        <p className="mb-1.5 text-[13px] font-medium tracking-[0.04em] text-ink-muted dark:text-dark-ink-muted">
                                            {w.tag}
                                        </p>
                                        <h3 className="font-head text-lg leading-[1.35] text-brand-navy dark:text-dark-ink">
                                            {w.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            <SiteFooter />
        </div>
    );
}
