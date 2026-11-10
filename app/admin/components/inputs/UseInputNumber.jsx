import { InputNumber } from "antd";
import React from "react";

// ใส่ลูกน้ำคั่นหลักพันให้อ่านจำนวนเงินง่าย
function UseInputNumber({ id, value, onChange, min = 0, suffix }) {
    return (
        <InputNumber
            id={id}
            size="large"
            style={{ width: "100%" }}
            value={value}
            onChange={onChange}
            min={min}
            suffix={suffix}
            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(v) => v?.replace(/,/g, "")}
        />
    );
}

export default UseInputNumber;
