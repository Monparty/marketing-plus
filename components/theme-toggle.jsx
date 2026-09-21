"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mplus-theme";
const THEME_EVENT = "mplus-theme-change";

// active คือวงแหวนเหลืองรอบวงที่ตรงกับธีมปัจจุบัน — ผูกกับ data-theme บน <html>
// ผ่าน variant dark:/not-dark: ตรง ๆ (ring-offset 2px + ring 3px = วงรอบนอก 5px)
// ต้องเขียน class เต็มไว้ตรงนี้ให้ Tailwind สแกนเจอ
const THEMES = [
  {
    value: "A",
    label: "ธีมสว่าง",
    swatch:
      "bg-surface not-dark:ring-3 not-dark:ring-brand-accent not-dark:ring-offset-2 not-dark:ring-offset-white",
  },
  {
    value: "B",
    label: "ธีมกรมท่า",
    swatch:
      "bg-brand-navy dark:ring-3 dark:ring-brand-accent dark:ring-offset-2 dark:ring-offset-dark-card",
  },
];

// ปุ่มสลับธีมลอยมุมขวาล่าง — วงกลมสองสีที่เป็นสีธีมจริง ไม่มีตัวหนังสือ
//
// ธีมตัวจริงเก็บไว้ที่ data-theme บน <html> ซึ่งสคริปต์ใน app/layout.jsx
// ตั้งค่าให้ก่อน paint (กันหน้าจอกระพริบตอนโหลดซ้ำด้วยธีม B)
// DOM จึงเป็น external store ตัวจริง — อ่านผ่าน useSyncExternalStore
// ไม่ใช่ useState เพื่อไม่ให้ React ถือสำเนาที่หลุดจากความจริง
//
// วงแหวนเหลืองรอบวงที่เลือกอยู่มาจาก CSS ล้วน (ดู THEMES ด้านบน)
// จึงไม่มีอาการกระพริบตอน hydrate ค่าที่อ่านที่นี่ใช้กับ aria-pressed เท่านั้น

function applyTheme(value) {
  document.documentElement.dataset.theme = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // โหมดส่วนตัวหรือปิด storage ไว้ — ธีมยังเปลี่ยนได้ แค่ไม่ถูกจำ
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribe(onChange) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "B" ? "B" : "A";
}

function getServerSnapshot() {
  return "A";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="สลับธีมสีของหน้าเว็บ"
      className="fixed right-4.5 bottom-4.5 z-60 flex items-center gap-3 rounded-pill border border-line bg-white/95 p-2 shadow-toggle backdrop-blur-sm dark:border-dark-line dark:bg-dark-card/95"
    >
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          data-theme-value={t.value}
          aria-pressed={theme === t.value}
          title={t.label}
          aria-label={t.label}
          onClick={() => applyTheme(t.value)}
          className={`size-9 cursor-pointer rounded-full inset-ring inset-ring-brand-navy/18 transition-transform hover:scale-105 dark:inset-ring-white/22 ${t.swatch}`}
        />
      ))}
    </div>
  );
}
