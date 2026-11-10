import { Form } from "antd";
import React from "react";

function UseFormItem({ name, label, required, children }) {
    return (
        <Form.Item name={name} label={label} rules={required ? [{ required: true, message: `กรุณากรอก${label}` }] : []}>
            {children}
        </Form.Item>
    );
}

export default UseFormItem;
