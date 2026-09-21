import { Noto_Sans_Thai, Prompt } from "next/font/google";
import "./globals.css";

// Prompt ใช้กับหัวข้อ / Noto Sans Thai ใช้กับเนื้อหา ตาม Design System
// Prompt ไม่มี variable font จึงต้องระบุน้ำหนักที่ใช้จริง
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Marketing Plus | สร้างสรรค์ วางแผน และจัดอีเวนท์ครบวงจรในที่เดียว",
    template: "%s · Marketing Plus",
  },
  description:
    "Marketing Plus ดูแลการเปิดตัวโครงการอสังหาริมทรัพย์ครบวงจร ตั้งแต่วางกลยุทธ์การตลาด ผลิตสื่อ ไปจนถึงจัดงานจริง โดยทีมเดียว",
  keywords: [
    "จัดอีเวนท์",
    "ผลิตสื่อโฆษณา",
    "วางแผนการตลาด",
    "เปิดตัวโครงการ",
    "Sales Gallery",
    "Marketing Plus",
  ],
  openGraph: {
    title: "Marketing Plus | สร้างสรรค์ วางแผน และจัดอีเวนท์ครบวงจรในที่เดียว",
    description:
      "รับจัดอีเวนท์ ผลิตสื่อโฆษณา และวางแผนการตลาด สำหรับแบรนด์และโครงการอสังหาริมทรัพย์",
    locale: "th_TH",
    type: "website",
  },
};

// ตั้งธีมก่อน paint กันหน้าจอกระพริบตอนโหลดซ้ำด้วยธีม B
const themeInit = `try{var t=localStorage.getItem('mplus-theme');document.documentElement.dataset.theme=t==='B'?'B':'A'}catch(e){}`;

// ตัวแปรฟอนต์ต้องอยู่บน <html> เพราะ --font-head/--font-body ใน globals.css
// ประกาศไว้บน :root และอ้างถึงตัวแปรเหล่านี้
export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      data-theme="A"
      className={`${prompt.variable} ${notoSansThai.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* ถ้าปิด JavaScript ให้เนื้อหาที่รอ reveal แสดงทันที */}
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
