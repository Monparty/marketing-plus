import { Drawer } from "antd";
import React from "react";

// size: ความกว้าง (px) เมื่อเปิดจากซ้าย/ขวา
function UseDrawer({ title, open, onClose, placement = "left", size = 280, children }) {
    return (
        <Drawer title={title} open={open} onClose={onClose} placement={placement} size={size}>
            {children}
        </Drawer>
    );
}

export default UseDrawer;
