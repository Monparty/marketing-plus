"use client";
import { useState } from "react";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseTextArea from "@/app/admin/components/inputs/UseTextArea";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import UsePopconfirm from "@/app/admin/components/display/UsePopconfirm";
import {
    staffBookings,
    staffList,
    projects,
    bookingStatusOptions,
    shiftOptions,
    formatDate,
    staffName,
    projectName,
} from "@/app/admin/mock-data";

const staffOptions = staffList.map((s) => ({ value: s.id, label: staffName(s.id) }));
const projectOptions = projects.filter((p) => p.status !== "done").map((p) => ({ value: p.id, label: p.name }));
const statusFilterOptions = [{ value: "all", label: "ทุกสถานะ" }, ...bookingStatusOptions];

const dateRange = (b) =>
    b.startDate === b.endDate ? formatDate(b.startDate) : `${formatDate(b.startDate)} - ${formatDate(b.endDate)}`;

function Page() {
    const [bookings, setBookings] = useState(staffBookings);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const close = () => {
        setEditing(null);
        setError("");
    };

    const save = (values) => {
        if (values.endDate < values.startDate) {
            setError("วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น");
            return;
        }
        const conflict =
            values.status !== "cancelled" &&
            bookings.find(
                (b) =>
                    b.id !== editing.id &&
                    b.staffId === values.staffId &&
                    b.status !== "cancelled" &&
                    b.startDate <= values.endDate &&
                    values.startDate <= b.endDate,
            );
        if (conflict) {
            setError(
                `จองซ้อนไม่ได้: ${staffName(values.staffId)} ติดงาน "${projectName(conflict.projectId)}" วันที่ ${dateRange(conflict)} แล้ว`,
            );
            return;
        }
        if (editing.id) {
            setBookings(bookings.map((b) => (b.id === editing.id ? { ...editing, ...values } : b)));
        } else {
            setBookings([...bookings, { id: Date.now(), ...values }]);
        }
        close();
    };

    const remove = (id) => setBookings(bookings.filter((b) => b.id !== id));

    const rows = bookings.filter(
        (b) =>
            staffName(b.staffId).toLowerCase().includes(search.trim().toLowerCase()) &&
            (statusFilter === "all" || b.status === statusFilter),
    );

    const columns = [
        { title: "บุคลากร", dataIndex: "staffId", render: (v) => staffName(v) },
        { title: "โปรเจกต์", dataIndex: "projectId", render: (v) => projectName(v) },
        { title: "วันที่", key: "date", render: (_, r) => dateRange(r) },
        { title: "ช่วงเวลา", dataIndex: "shift", render: (v) => shiftOptions.find((o) => o.value === v)?.label ?? v },
        {
            title: "สถานะ",
            dataIndex: "status",
            render: (v) => {
                const status = bookingStatusOptions.find((o) => o.value === v);
                return <UseTag color={status?.color} label={status?.label} />;
            },
        },
        { title: "หมายเหตุ", dataIndex: "note", render: (v) => v || "-" },
        {
            title: "จัดการ",
            key: "actions",
            render: (_, r) => (
                <div className="flex gap-2">
                    <UseButton label="แก้ไข" type="link" size="small" onClick={() => setEditing(r)} />
                    <UsePopconfirm title="ยืนยันการลบ?" onConfirm={() => remove(r.id)}>
                        <UseButton label="ลบ" type="link" size="small" danger />
                    </UsePopconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">จัดตารางงานฟรีแลนซ์</h1>
                <UseButton label="เพิ่มการจอง" type="primary" onClick={() => setEditing({ status: "pending" })} />
            </div>

            <div className="flex gap-2 mb-4">
                <div className="w-64">
                    <UseInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ค้นหาชื่อบุคลากร" />
                </div>
                <div className="w-48">
                    <UseSelect value={statusFilter} onChange={setStatusFilter} options={statusFilterOptions} />
                </div>
            </div>

            <UseTable columns={columns} dataSource={rows} />

            <UseModal title={editing?.id ? "แก้ไขการจอง" : "เพิ่มการจอง"} open={editing !== null} onCancel={close} width={720}>
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="staffId" label="บุคลากร" required>
                            <UseSelect options={staffOptions} placeholder="พิมพ์ค้นหาชื่อ" />
                        </UseFormItem>
                        <UseFormItem name="projectId" label="โปรเจกต์" required>
                            <UseSelect options={projectOptions} placeholder="เลือกงานอีเวนต์" />
                        </UseFormItem>
                        <UseFormItem name="startDate" label="วันที่เริ่มต้น" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="endDate" label="วันที่สิ้นสุด" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="shift" label="ช่วงเวลา (Shift)" required>
                            <UseSelect options={shiftOptions} placeholder="เลือกช่วงเวลา" />
                        </UseFormItem>
                        <UseFormItem name="status" label="สถานะการจอง" required>
                            <UseSelect options={bookingStatusOptions} />
                        </UseFormItem>
                    </div>
                    <UseFormItem name="note" label="หมายเหตุ">
                        <UseTextArea placeholder="เช่น จุดที่ต้องประจำการ ชุดยูนิฟอร์มที่ต้องใส่" />
                    </UseFormItem>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-end gap-2">
                        <UseButton label="ยกเลิก" onClick={close} />
                        <UseButton label="บันทึก" type="primary" htmlType="submit" />
                    </div>
                </UseForm>
            </UseModal>
        </div>
    );
}

export default Page;
