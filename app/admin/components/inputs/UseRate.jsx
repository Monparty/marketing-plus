import { Rate } from "antd";
import React from "react";

// disabled = แสดงผลอย่างเดียว (เช่น ในตาราง)
function UseRate({ id, value, onChange, disabled }) {
    return <Rate id={id} value={value} onChange={onChange} disabled={disabled} />;
}

export default UseRate;
