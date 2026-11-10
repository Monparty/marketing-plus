import { Button } from "antd";
import React from "react";

function UseButton({ label, type, onClick, icon, danger, htmlType, size = "large" }) {
    return (
        <Button size={size} type={type} onClick={onClick} icon={icon} danger={danger} htmlType={htmlType}>
            {label}
        </Button>
    );
}

export default UseButton;
