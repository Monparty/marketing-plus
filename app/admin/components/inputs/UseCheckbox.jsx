import { Checkbox } from "antd";
import React from "react";

// ใช้ value/onChange แบบ boolean เหมือน input อื่น จึงวางใน UseFormItem ได้ตรง ๆ
function UseCheckbox({ id, value, onChange, label }) {
    return (
        <Checkbox id={id} checked={value} onChange={(e) => onChange?.(e.target.checked)}>
            {label}
        </Checkbox>
    );
}

export default UseCheckbox;
