// โลโก้ MPLUS — ประกอบจากตัวอักษร Prompt + จุดเหลือง ตามสัดส่วนโลโก้จริง
//
// นี่เป็น "ตัวยืน" แทนไฟล์ภาพจริง เพราะ assets/mplus-logo.png และ
// assets/mplus-logo-white.png ยังไม่มีอยู่ในโปรเจกต์
//
// วิธีเปลี่ยนไปใช้ไฟล์ PNG จริง:
//   1. วางไฟล์ไว้ที่ public/assets/mplus-logo.png และ mplus-logo-white.png
//   2. แทนที่ body ของคอมโพเนนต์นี้ด้วย:
//        import Image from "next/image";
//        <Image src={variant === "white" ? "/assets/mplus-logo-white.png"
//                                        : "/assets/mplus-logo.png"}
//               alt="MPLUS — Marketing Plus" width={150} height={34} priority />
//      (ธีม B ต้องสลับไปใช้ไฟล์ขาว — ดูตัวแปร --logo-* ใน app/globals.css)
//
// สีแต่ละตัวอักษรอ่านจากตัวแปร --logo-* ซึ่งเปลี่ยนตามธีม A/B ให้เอง
// variant="white" บังคับเป็นเวอร์ชันขาวเสมอ (ใช้บนพื้นกรมท่า)

export function Logo({ variant = "auto", className = "text-[28px]" }) {
  return (
    <span
      data-logo={variant}
      role="img"
      aria-label="MPLUS — Marketing Plus"
      className={`inline-flex items-end font-head font-bold leading-none tracking-[-0.02em] select-none ${className}`}
    >
      {/* จุดเหลืองมุมซ้ายล่าง */}
      <span className="mb-[0.08em] mr-[0.1em] block size-[0.2em] rounded-full bg-brand-accent" />

      <span style={{ color: "var(--logo-m)" }}>M</span>
      <span style={{ color: "var(--logo-p)" }}>P</span>
      <span style={{ color: "var(--logo-l)" }}>L</span>

      {/* U เหลืองเสมอ พร้อมสี่เหลี่ยมเล็กด้านบน */}
      <span className="relative text-brand-accent">
        <span className="absolute -top-[0.3em] left-[0.1em] block size-[0.16em] bg-brand-accent" />
        U
      </span>

      <span style={{ color: "var(--logo-s)" }}>S</span>

      {/* สี่เหลี่ยมเอียงเล็กมุมขวาล่าง */}
      <span
        className="mb-[0.06em] ml-[0.06em] block size-[0.13em] rotate-[20deg]"
        style={{ background: "var(--logo-s)" }}
      />
    </span>
  );
}
