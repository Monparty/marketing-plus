import Image from "next/image";
import logoLight from "@/public/assets/mplus-logo.png";
import logoWhite from "@/public/assets/mplus-logo-white.png";

// โลโก้ MPLUS จากไฟล์ภาพ
//
// ⚠️ ไฟล์ใน public/assets/ ตอนนี้เป็น PLACEHOLDER (แถบทึบมุมโค้ง 1024×236)
//    เอาไฟล์โลโก้จริงทับได้เลย ชื่อเดิม ที่เดิม — ไม่ต้องแก้โค้ด
//    next/image อ่านขนาดจริงจากไฟล์ตอน build จึงปรับอัตราส่วนให้เอง
//      public/assets/mplus-logo.png        (เวอร์ชันสี)
//      public/assets/mplus-logo-white.png  (เวอร์ชันขาว)
//
// variant="auto"  สลับสี/ขาว ตามธีม A/B ด้วย CSS (ตัวแปร --logo-*-display)
//                 เรนเดอร์ทั้งสองไฟล์แล้วซ่อนด้วย display จึงไม่ต้องใช้ JS
// variant="white" บังคับเวอร์ชันขาว ใช้บนพื้นกรมท่า — เรนเดอร์ไฟล์เดียว
//
// ชื่อสำหรับ screen reader อยู่บน wrapper ตัวเดียว ส่วน <Image> ปิด alt ไว้
// ไม่ให้อ่านซ้ำสองรอบเวลาเรนเดอร์ทั้งสองไฟล์

const LABEL = "MPLUS — Marketing Plus";

// ความสูงกำหนดด้วย CSS (h-8.5 / h-8 / h-7.5) ความกว้างจึงออกมาราว 130–150px
// บอก sizes ไว้ให้ next/image สร้าง srcset แบบ w- เบราว์เซอร์จะเลือกไฟล์เล็ก
// ถ้าไม่บอก มันจะโหลดไฟล์กว้าง 2048px มาแสดงที่ 150px
const LOGO_SIZES = "150px";

export function Logo({
  variant = "auto",
  className = "h-8.5 w-auto",
  priority = false,
}) {
  if (variant === "white") {
    return (
      <span role="img" aria-label={LABEL} className="inline-flex shrink-0">
        <Image
          src={logoWhite}
          alt=""
          aria-hidden="true"
          priority={priority}
          sizes={LOGO_SIZES}
          className={className}
        />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={LABEL}
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={logoLight}
        alt=""
        aria-hidden="true"
        priority={priority}
        sizes={LOGO_SIZES}
        className={className}
        style={{ display: "var(--logo-light-display)" }}
      />
      <Image
        src={logoWhite}
        alt=""
        aria-hidden="true"
        priority={priority}
        sizes={LOGO_SIZES}
        className={className}
        style={{ display: "var(--logo-dark-display)" }}
      />
    </span>
  );
}
