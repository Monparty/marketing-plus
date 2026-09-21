"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FIELD =
    "rounded-xl border border-line-strong bg-white px-4 py-3.5 text-base text-ink outline-none placeholder:text-ink-faint focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/15 dark:border-dark-line dark:bg-dark-field dark:text-dark-ink dark:placeholder:text-dark-ink-faint dark:focus:border-brand-accent dark:focus:ring-brand-accent/20";

const LABEL = "flex flex-col gap-2 text-[15px] font-medium text-ink dark:text-dark-ink";

// ฟอร์มขอใบเสนอราคา
//
// ยังไม่ได้ส่งข้อมูลไปที่ไหน — แสดงข้อความสำเร็จอยู่ในเครื่องผู้ใช้เท่านั้น
// เหมือนต้นฉบับใน MPLUS Landing.dc.html
// ถ้าต้องการรับข้อมูลจริง ให้ทำ route handler (เช่น app/api/quote/route.js)
// แล้ว POST จาก onSubmit ด้านล่างแทนบรรทัด setSent(true)

export function ContactForm() {
    const [sent, setSent] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-[18px] rounded-[18px] border border-line bg-white px-7 py-8 shadow-form dark:border-dark-line dark:bg-dark-card dark:shadow-dark-card"
        >
            <h3 className="font-head text-[22px] font-semibold text-brand-navy dark:text-dark-ink">ขอใบเสนอราคา</h3>

            <label className={LABEL}>
                ชื่อผู้ติดต่อ
                <input required name="name" autoComplete="name" placeholder="ชื่อ-นามสกุล" className={FIELD} />
            </label>

            <label className={LABEL}>
                เบอร์โทร
                <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="08X-XXX-XXXX"
                    className={FIELD}
                />
            </label>

            <label className={LABEL}>
                ประเภทงาน
                <Select required name="type">
                    <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทงาน" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>ประเภทงาน</SelectLabel>
                            {contact.jobTypes.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </label>

            <label className={LABEL}>
                รายละเอียดงาน
                <textarea
                    name="detail"
                    rows={4}
                    placeholder="เล่าคร่าวๆ เช่น ประเภทโครงการ วันที่ งบประมาณ"
                    className={`${FIELD} resize-y leading-[1.6]`}
                />
            </label>

            <button
                type="submit"
                className="cursor-pointer rounded-btn bg-brand-accent px-6 py-4 text-[17px] font-semibold text-brand-navy shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-accent-hover"
            >
                ส่งข้อมูลขอใบเสนอราคา
            </button>

            {sent && (
                <p
                    role="status"
                    className="rounded-xl bg-warm px-4 py-3.5 text-[15px] leading-[1.6] text-brand-navy dark:bg-brand-accent/15 dark:text-brand-accent"
                >
                    ได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด
                </p>
            )}

            <p className="text-[13px] text-center leading-[1.6] text-ink-faint! dark:text-dark-ink-faint">
                การส่งฟอร์มถือว่ายอมรับ <Link href="/privacy"><span className="text-blue-800! dark:text-slate-300!">นโยบายความเป็นส่วนตัว</span></Link>
            </p>
        </form>
    );
}
