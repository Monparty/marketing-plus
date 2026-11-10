import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

// รับและส่งค่าเป็นสตริง "YYYY-MM-DD" หน้าที่ใช้จึงไม่ต้องยุ่งกับ dayjs
function UseDatePicker({ id, value, onChange }) {
    return (
        <DatePicker
            id={id}
            size="large"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange?.(date ? date.format("YYYY-MM-DD") : null)}
        />
    );
}

export default UseDatePicker;
