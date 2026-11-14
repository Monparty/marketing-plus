import { Input } from "antd";
import React from "react";

function UseInputPassword({ id, value, onChange, placeholder }) {
    return <Input.Password id={id} size="large" value={value} onChange={onChange} placeholder={placeholder} />;
}

export default UseInputPassword;
