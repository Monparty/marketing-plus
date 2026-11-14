import { Button } from "antd";
import React from "react";

// block: ปุ่มเต็มความกว้าง, ariaLabel: ชื่อปุ่มสำหรับ screen reader (จำเป็นเมื่อเป็นปุ่มไอคอนอย่างเดียว)
function UseButton({ label, type, onClick, icon, danger, htmlType, block, ariaLabel, className, size = "large" }) {
    return (
        <Button
            size={size}
            type={type}
            onClick={onClick}
            icon={icon}
            danger={danger}
            htmlType={htmlType}
            block={block}
            aria-label={ariaLabel}
            className={className}
        >
            {label}
        </Button>
    );
}

export default UseButton;
