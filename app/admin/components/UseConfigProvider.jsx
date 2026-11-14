"use client";
import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import dayjs from "dayjs";
import "dayjs/locale/th";
import React from "react";

// ชื่อเดือน/วันในปฏิทินมาจาก dayjs จึงต้องตั้ง locale ของ dayjs ด้วย
dayjs.locale("th");

// theme: ใส่เมื่อต้องการปรับสี/ขนาดเฉพาะส่วน (ครอบซ้อนได้ ค่าที่ไม่ได้ระบุจะใช้ของชั้นนอก)
function UseConfigProvider({ theme, children }) {
    return (
        <ConfigProvider locale={thTH} theme={theme}>
            {children}
        </ConfigProvider>
    );
}

export default UseConfigProvider;
