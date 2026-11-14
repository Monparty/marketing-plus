import { Form } from "antd";
import React from "react";

// noStyle: ไม่แสดง label/ระยะห่าง ใช้กับช่องที่วางเรียงกันในแถวเดียว (เช่นใน UseFormList)
function UseFormItem({ name, label, required, noStyle, children }) {
    return (
        <Form.Item
            name={name}
            label={label}
            noStyle={noStyle}
            rules={required ? [{ required: true, message: `กรุณากรอก${label}` }] : []}
        >
            {children}
        </Form.Item>
    );
}

export default UseFormItem;
