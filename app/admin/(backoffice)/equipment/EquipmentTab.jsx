"use client";
import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import { equipmentCategoryOptions, equipmentStatusOptions } from "@/app/admin/mock-data";
import { useState } from "react";
import RowActions from "@/app/admin/components/RowActions";

const categoryFilterOptions = [{ value: "all", label: "ทุกหมวดหมู่" }, ...equipmentCategoryOptions];

function EquipmentTab({ items, setItems }) {
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const save = (values) => {
        if (editing.id) {
            setItems(items.map((x) => (x.id === editing.id ? { ...editing, ...values } : x)));
        } else {
            setItems([...items, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setItems(items.filter((x) => x.id !== id));

    const filtered = items.filter(
        (x) =>
            (category === "all" || x.category === category) &&
            `${x.code} ${x.name}`.toLowerCase().includes(search.trim().toLowerCase())
    );

    const columns = [
        { title: "รหัส", dataIndex: "code" },
        { title: "ชื่อ", dataIndex: "name" },
        {
            title: "หมวดหมู่",
            dataIndex: "category",
            render: (v) => equipmentCategoryOptions.find((o) => o.value === v)?.label ?? "-",
        },
        {
            title: "จำนวนทั้งหมด",
            dataIndex: "total",
            align: "right",
            render: (v) => `${Number(v || 0).toLocaleString("th-TH")} ชิ้น`,
        },
        {
            title: "สถานะ",
            dataIndex: "status",
            render: (v) => {
                const option = equipmentStatusOptions.find((o) => o.value === v);
                return option ? <UseTag color={option.color} label={option.label} /> : "-";
            },
        },
        {
            title: "จัดการ",
            render: (_, r) => (
                <RowActions onEdit={() => setEditing(r)} onDelete={() => remove(r.id)} />
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center gap-2 mb-4">
                <div className="flex gap-2">
                    <div className="w-64">
                        <UseInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ค้นหารหัสหรือชื่ออุปกรณ์" />
                    </div>
                    <div className="w-48">
                        <UseSelect value={category} onChange={setCategory} options={categoryFilterOptions} />
                    </div>
                </div>
                <UseButton label="เพิ่มอุปกรณ์" type="primary" onClick={() => setEditing({})} />
            </div>
            <UseTable columns={columns} dataSource={filtered} />

            <UseModal
                title={editing?.id ? "แก้ไขอุปกรณ์" : "เพิ่มอุปกรณ์"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="code" label="รหัสอุปกรณ์" required>
                            <UseInput placeholder="เช่น ST-003" />
                        </UseFormItem>
                        <UseFormItem name="name" label="ชื่ออุปกรณ์" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="category" label="หมวดหมู่" required>
                            <UseSelect options={equipmentCategoryOptions} placeholder="เลือกหมวดหมู่" />
                        </UseFormItem>
                        <UseFormItem name="total" label="จำนวนทั้งหมด" required>
                            <UseInputNumber suffix="ชิ้น" />
                        </UseFormItem>
                        <UseFormItem name="status" label="สถานะปัจจุบัน" required>
                            <UseSelect options={equipmentStatusOptions} placeholder="เลือกสถานะ" />
                        </UseFormItem>
                    </div>
                    <div className="flex justify-end gap-2">
                        <UseButton label="ยกเลิก" onClick={() => setEditing(null)} />
                        <UseButton label="บันทึก" type="primary" htmlType="submit" />
                    </div>
                </UseForm>
            </UseModal>
        </div>
    );
}

export default EquipmentTab;
