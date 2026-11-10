import { Modal } from "antd";
import React from "react";

// ไม่มี footer — ใส่ปุ่มบันทึก (htmlType="submit") ไว้ในฟอร์มเอง
// destroyOnHidden ทำให้ฟอร์มข้างในถูกสร้างใหม่ทุกครั้งที่เปิด ค่าเก่าจึงไม่ค้าง
function UseModal({ title, open, onCancel, width, children }) {
    return (
        <Modal title={title} open={open} onCancel={onCancel} width={width} footer={null} destroyOnHidden>
            {children}
        </Modal>
    );
}

export default UseModal;
