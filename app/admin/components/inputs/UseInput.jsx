import { Input } from "antd";
import React from "react";

function UseInput({ id, value, onChange, placeholder }) {
    return <Input id={id} size="large" value={value} onChange={onChange} placeholder={placeholder} />;
}

export default UseInput;
