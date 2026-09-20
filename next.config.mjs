import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // มี package-lock.json อีกไฟล์อยู่ที่ Desktop/projects ซึ่งอยู่นอก git repo นี้
  // ถ้าไม่ปักหมุด root ไว้ Turbopack จะเตือนและอาจเดา root ผิด
  turbopack: {
    root: path.join(import.meta.dirname, "."),
  },
};

export default nextConfig;
