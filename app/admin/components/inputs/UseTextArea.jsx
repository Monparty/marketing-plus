import { Input } from "antd";
import React from "react";

function UseTextArea({ id, value, onChange, placeholder, rows = 3 }) {
    return <Input.TextArea id={id} size="large" value={value} onChange={onChange} placeholder={placeholder} rows={rows} />;
}

export default UseTextArea;
