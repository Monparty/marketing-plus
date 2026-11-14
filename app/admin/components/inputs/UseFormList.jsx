import { Form } from "antd";
import React from "react";

// children เป็นฟังก์ชัน (fields, { add, remove }) => ... แบบเดียวกับ antd
function UseFormList({ name, children }) {
    return <Form.List name={name}>{children}</Form.List>;
}

export default UseFormList;
