"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { navLinks, site } from "@/lib/content";

// แถบบนแบบ sticky — สีทั้งหมดอ่านจากตัวแปรธีม (--nav-*) ใน globals.css
// เมนูเดสก์ท็อป/มือถือสลับกันที่ 900px ด้วย breakpoint `nav:` ของ Tailwind
// (ต้นฉบับใช้ JS ฟัง resize เพราะ design tool เขียน media query ไม่ได้)

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b [backdrop-filter:saturate(140%)_blur(8px)]"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--nav-border)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-5 px-5 py-3.5">
        <Link href="/#top" className="flex shrink-0 items-center">
          <Logo className="text-[26px]" />
        </Link>

        {/* เมนูเดสก์ท็อป */}
        <nav className="ml-auto hidden items-center gap-1 nav:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-[10px] px-3.5 py-2.5 text-[15px] transition-colors hover:bg-black/5"
              style={{ color: "var(--nav-link)" }}
            >
              {l.label}
            </a>
          ))}

          <a
            href={site.phoneHref}
            className="rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold transition-colors hover:bg-black/5"
            style={{ color: "var(--nav-link)" }}
          >
            {site.phoneDisplay}
          </a>

          <a
            href="#contact"
            className="ml-1.5 rounded-xl bg-brand-accent px-5 py-3 text-[15px] font-semibold text-brand-navy shadow-cta-sm transition hover:-translate-y-px hover:bg-brand-accent-hover hover:text-brand-navy"
          >
            ขอใบเสนอราคา
          </a>
        </nav>

        {/* ปุ่มเมนูมือถือ */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="เมนู"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="ml-auto flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border bg-transparent nav:hidden"
          style={{ borderColor: "var(--nav-border)" }}
        >
          <span
            className="block h-0.5 w-[18px] rounded-sm"
            style={{ background: "var(--nav-link)" }}
          />
          <span
            className="block h-0.5 w-[18px] rounded-sm"
            style={{ background: "var(--nav-link)" }}
          />
          <span
            className="block h-0.5 w-[18px] rounded-sm"
            style={{ background: "var(--nav-link)" }}
          />
        </button>
      </div>

      {/* เมนูมือถือ */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col gap-0.5 border-t px-5 pt-3 pb-5 nav:hidden"
          style={{
            background: "var(--nav-bg)",
            borderColor: "var(--nav-border)",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-1.5 py-3.5 text-[17px]"
              style={{ color: "var(--nav-link)" }}
            >
              {l.label}
            </a>
          ))}

          <a
            href={site.phoneHref}
            className="px-1.5 py-3.5 text-[17px] font-semibold"
            style={{ color: "var(--nav-link)" }}
          >
            โทร {site.phoneDisplay}
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-xl bg-brand-accent px-5 py-[15px] text-center text-[17px] font-semibold text-brand-navy hover:text-brand-navy"
          >
            ขอใบเสนอราคา
          </a>
        </div>
      )}
    </header>
  );
}
