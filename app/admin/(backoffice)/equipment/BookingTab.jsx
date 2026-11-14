"use client";
import UseAlert from "@/app/admin/components/display/UseAlert";
import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import { formatDate, projectName, projects } from "@/app/admin/mock-data";
import { useState } from "react";
import RowActions from "@/app/admin/components/RowActions";

const projectOptions = projects.map((p) => ({ value: p.id, label: p.name }));

function BookingTab({ bookings, setBookings, equipment, equipmentOptions }) {
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");
    const [equipmentId, setEquipmentId] = useState("all");

    const open = (record) => {
        setError("");
        setEditing(record);
    };

    const save = (values) => {
        if (values.endDate < values.startDate) {
            setError("วันกำหนดคืนต้องไม่ก่อนวันที่ใช้");
            return;
        }
        const total = equipment.find((e) => e.id === values.equipmentId)?.total ?? 0;
        const booked = bookings
            .filter(
                (b) =>
                    b.id !== editing.id &&
                    b.equipmentId === values.equipmentId &&
                    b.startDate <= values.endDate &&
                    b.endDate >= values.startDate
            )
            .reduce((sum, b) => sum + b.quantity, 0);
        if (booked + values.quantity > total) {
            setError(
                `จองไม่ได้ ช่วงวันที่นี้เหลือว่าง ${Math.max(total - booked, 0)} ชิ้น (มีทั้งหมด ${total} ชิ้น ถูกจองแล้ว ${booked} ชิ้น)`
            );
            return;
        }
        if (editing.id) {
            setBookings(bookings.map((x) => (x.id === editing.id ? { ...editing, ...values } : x)));
        } else {
            setBookings([...bookings, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setBookings(bookings.filter((x) => x.id !== id));

    const columns = [
        {
            title: "อุปกรณ์",
            dataIndex: "equipmentId",
            render: (v) => equipmentOptions.find((o) => o.value === v)?.label ?? "-",
        },
        { title: "โปรเจกต์", dataIndex: "projectId", render: (v) => projectName(v) },
        {
            title: "จำนวน",
            dataIndex: "quantity",
            align: "right",
            render: (v) => `${Number(v || 0).toLocaleString("th-TH")} ชิ้น`,
        },
        { title: "วันที่ใช้", dataIndex: "startDate", render: (v) => formatDate(v) },
        { title: "กำหนดคืน", dataIndex: "endDate", render: (v) => formatDate(v) },
        {
            title: "จัดการ",
            render: (_, r) => (
                <RowActions onEdit={() => open(r)} onDelete={() => remove(r.id)} />
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center gap-2 mb-4">
                <div className="w-72">
                    <UseSelect
                        value={equipmentId}
                        onChange={setEquipmentId}
                        options={[{ value: "all", label: "ทุกอุปกรณ์" }, ...equipmentOptions]}
                    />
                </div>
                <UseButton label="เพิ่มการจอง" type="primary" onClick={() => open({})} />
            </div>
            <UseTable
                columns={columns}
                dataSource={bookings.filter((x) => equipmentId === "all" || x.equipmentId === equipmentId)}
            />

            <UseModal
                title={editing?.id ? "แก้ไขการจอง" : "เพิ่มการจอง"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="equipmentId" label="อุปกรณ์" required>
                            <UseSelect options={equipmentOptions} placeholder="เลือกอุปกรณ์" />
                        </UseFormItem>
                        <UseFormItem name="projectId" label="โปรเจกต์" required>
                            <UseSelect options={projectOptions} placeholder="เลือกโปรเจกต์" />
                        </UseFormItem>
                        <UseFormItem name="startDate" label="วันที่ใช้" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="endDate" label="วันกำหนดคืน" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="quantity" label="จำนวน" required>
                            <UseInputNumber min={1} suffix="ชิ้น" />
                        </UseFormItem>
                    </div>
                    {error && (
                        <div className="mb-4">
                            <UseAlert type="error" title={error} />
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        <UseButton label="ยกเลิก" onClick={() => setEditing(null)} />
                        <UseButton label="บันทึก" type="primary" htmlType="submit" />
                    </div>
                </UseForm>
            </UseModal>
        </div>
    );
}

export default BookingTab;
