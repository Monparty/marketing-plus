import { Popconfirm } from "antd";
import React from "react";

// ห่อ <span> เพราะ Popconfirm ต้องผูก ref กับ DOM ของลูก ซึ่ง UseButton ไม่ได้ส่ง ref ต่อ
function UsePopconfirm({ title, onConfirm, children }) {
    return (
        <Popconfirm title={title} onConfirm={onConfirm} okText="ยืนยัน" cancelText="ยกเลิก">
            <span>{children}</span>
        </Popconfirm>
    );
}

export default UsePopconfirm;
