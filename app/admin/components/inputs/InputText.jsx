import { Input } from "antd";
import React from "react";

function InputText({ label }) {
    return (
        <div>
            <label htmlFor="label" className="text-sm">
                {label}
            </label>
            <Input id="label" placeholder={label} size="large" />
        </div>
    );
}

export default InputText;
