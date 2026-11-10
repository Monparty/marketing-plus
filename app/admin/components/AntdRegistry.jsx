"use client";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";

// เก็บ CSS ของ antd ตอน render ฝั่งเซิร์ฟเวอร์แล้วใส่ลงใน HTML
// หน้าจึงมีสไตล์ตั้งแต่โหลด ไม่แวบเป็นหน้าไม่มีสไตล์ก่อน JS ทำงาน
function AntdRegistry({ children }) {
    const [cache] = useState(() => createCache());

    useServerInsertedHTML(() => {
        // once: ส่งเฉพาะสไตล์ที่ยังไม่เคยส่ง (กรณี stream มาหลายรอบ)
        const css = extractStyle(cache, { plain: true, once: true });
        if (!css) return null;
        return <style data-rc-order="prepend" data-rc-priority="-1000" dangerouslySetInnerHTML={{ __html: css }} />;
    });

    return <StyleProvider cache={cache}>{children}</StyleProvider>;
}

export default AntdRegistry;
