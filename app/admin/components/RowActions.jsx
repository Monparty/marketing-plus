import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import UseButton from "./inputs/UseButton";
import UsePopconfirm from "./display/UsePopconfirm";
import UseTooltip from "./display/UseTooltip";

// ปุ่มไอคอนในคอลัมน์ "จัดการ" ของตาราง: ดินสอ = แก้ไข, ถังขยะ = ลบ (ถามยืนยันก่อน) ข้อความอยู่ใน tooltip
// children: ปุ่มไอคอนเพิ่มเติม วางไว้หน้าปุ่มแก้ไข
function RowActions({ onEdit, onDelete, children }) {
    return (
        <div className="flex gap-2">
            {children}
            <UseTooltip title="แก้ไข">
                <UseButton className="bg-amber-300!" type="text" size="small" ariaLabel="แก้ไข" icon={<Pencil size={14} />} onClick={onEdit} />
            </UseTooltip>
            <UsePopconfirm title="ยืนยันการลบ?" onConfirm={onDelete}>
                <UseTooltip title="ลบ">
                    <UseButton className="bg-red-500!" type="text" size="small" danger ariaLabel="ลบ" icon={<Trash2 size={14} color="#ffffff" />} />
                </UseTooltip>
            </UsePopconfirm>
        </div>
    );
}

export default RowActions;
