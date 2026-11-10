"use client";
import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import dayjs from "dayjs";
import "dayjs/locale/th";
import React from "react";

// ชื่อเดือน/วันในปฏิทินมาจาก dayjs จึงต้องตั้ง locale ของ dayjs ด้วย
dayjs.locale("th");

function UseConfigProvider({ children }) {
    return <ConfigProvider locale={thTH}>{children}</ConfigProvider>;
}

export default UseConfigProvider;
