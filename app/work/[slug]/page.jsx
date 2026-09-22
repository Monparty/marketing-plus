import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { work } from "@/lib/content";
import { ChevronLeft } from "lucide-react";
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
            <header className="bg-brand-navy px-5 py-[18px] dark:bg-dark-footer">
                <div className="mx-auto flex max-w-[1000px] items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Logo variant="white" className="h-7.5 w-auto" />
                    </Link>
                    <Link
                        href="/#work"
                        className="ml-auto text-[15px] text-on-navy! hover:text-brand-accent! flex items-center gap-1"
                    >
                        <ChevronLeft className="size-6" />
                        กลับไปหน้าผลงาน
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-[1000px] px-5 pt-14 pb-20">
                <div className="mb-3.5 flex items-center gap-2.5">
                    <span className="block h-5 w-1 bg-brand-accent" />
                    <span className="text-sm font-semibold tracking-[0.06em] text-brand-primary dark:text-dark-primary">
                        {item.tag}
                    </span>
                </div>

                <h1 className="mb-5 font-head text-[clamp(30px,5vw,42px)] leading-[1.35] font-semibold text-brand-navy dark:text-dark-ink">
                    {item.title}
                </h1>
                <p className="mb-10 text-[17px] leading-[1.8] text-ink dark:text-dark-ink-muted">{item.note}</p>

                <Image
                    src={item.src}
                    alt={item.title}
                    loading="eager"
                    fetchPriority="high"
                    className="aspect-16/10 w-full rounded-card object-cover"
                />

                {others.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-6 font-head text-[22px] font-semibold text-brand-navy dark:text-dark-ink">
                            ผลงานอื่น ๆ
                        </h2>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                            {others.map((w) => (
                                <Link
                                    key={w.slug}
                                    href={`/work/${w.slug}`}
                                    className="overflow-hidden rounded-card border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-work-hover dark:border-dark-line dark:bg-dark-card dark:hover:shadow-dark-card-hover"
                                >
                                    <Image src={w.src} alt={w.title} className="aspect-16/10 w-full object-cover" />
                                    <div className="px-5 py-4">
                                        <h3 className="font-head text-lg font-semibold text-brand-navy dark:text-dark-ink">
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
