"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mplus-theme";
const THEME_EVENT = "mplus-theme-change";

const THEMES = [
  { value: "A", label: "ธีม A สว่าง" },
  { value: "B", label: "ธีม B กรมท่า" },
];

// ปุ่มสลับธีมลอยมุมขวาล่าง
//
// ธีมตัวจริงเก็บไว้ที่ data-theme บน <html> ซึ่งสคริปต์ใน app/layout.js
// ตั้งค่าให้ก่อน paint (กันหน้าจอกระพริบตอนโหลดซ้ำด้วยธีม B)
// DOM จึงเป็น external store ตัวจริง — อ่านผ่าน useSyncExternalStore
// ไม่ใช่ useState เพื่อไม่ให้ React ถือสำเนาที่หลุดจากความจริง
//
// หน้าตาปุ่ม active มาจาก CSS ล้วน (.theme-btn ใน globals.css)
// ค่าที่อ่านได้ที่นี่ใช้กับ aria-pressed ให้ screen reader อ่านถูก

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
      className="fixed right-4.5 bottom-4.5 z-60 flex items-center gap-2 rounded-pill bg-brand-navy/95 p-1.5 shadow-toggle"
    >
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          data-theme-value={t.value}
          aria-pressed={theme === t.value}
          onClick={() => applyTheme(t.value)}
          className="theme-btn cursor-pointer rounded-pill px-4 py-2.25 text-[13px] font-semibold transition-colors"
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
