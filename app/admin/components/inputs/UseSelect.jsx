import { Select } from "antd";
import React from "react";

// options: [{ value, label }] — พิมพ์ค้นหาจาก label ได้
function UseSelect({ id, value, onChange, options, placeholder, mode }) {
    return (
        <Select
            id={id}
            size="large"
            style={{ width: "100%" }}
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            mode={mode}
            showSearch={{ optionFilterProp: "label" }}
        />
    );
}

export default UseSelect;
