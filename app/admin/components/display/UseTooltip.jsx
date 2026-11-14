import { Tooltip } from "antd";
import React from "react";

// ห่อ <span> เพราะ Tooltip ต้องผูก ref กับ DOM ของลูก (เหมือน UsePopconfirm)
function UseTooltip({ title, placement, children }) {
    return (
        <Tooltip title={title} placement={placement}>
            <span className="inline-flex">{children}</span>
        </Tooltip>
    );
}

export default UseTooltip;
