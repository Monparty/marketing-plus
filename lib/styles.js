// ชุด class ของปุ่มตาม DESIGN.md — ใช้ร่วมกันทุกหน้าให้ขนาดและรัศมีตรงกัน
//
// gold   = ปุ่มหลักตัวเดียวของหน้า ("ขอใบเสนอราคา") พื้นทอง ตัวอักษรกรมท่า
// navy   = ปุ่มทึบรอง พื้นกรมท่า ตัวอักษรขาว
// outline = ปุ่มโครงบนกระดาษ
// film   = pill สีขาวบนฉากมืด (hero) พร้อมเงาเยื้อง

const BASE =
  "inline-flex h-12 cursor-pointer items-center justify-center gap-2 px-6 font-head text-[17px] leading-none font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

export const btn = {
  gold: `${BASE} rounded-btn bg-brand-accent text-brand-navy! shadow-tactile hover:bg-brand-accent-hover`,
  goldPill: `${BASE} rounded-pill bg-brand-accent text-brand-navy! shadow-pill hover:bg-brand-accent-hover`,
  navy: `${BASE} rounded-btn bg-brand-navy text-white! shadow-tactile hover:bg-brand-primary dark:bg-dark-primary dark:text-dark-page! dark:hover:bg-white`,
  outline: `${BASE} rounded-btn border border-brand-navy text-brand-navy! hover:bg-tint-blue dark:border-dark-ink-muted dark:text-dark-ink! dark:hover:bg-dark-card`,
  film: `${BASE} rounded-pill bg-white text-brand-navy! font-normal shadow-pill hover:bg-surface`,
};

// ป้ายเล็กเหนือหัวข้อ — ภาษาไทยไม่มีตัวพิมพ์ใหญ่ จึงเว้นระยะแค่ 0.04em
export const eyebrow = "text-sm font-medium tracking-[0.04em]";
