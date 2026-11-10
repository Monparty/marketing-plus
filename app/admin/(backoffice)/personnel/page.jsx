"use client";

import { useState } from "react";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import UseTextArea from "@/app/admin/components/inputs/UseTextArea";
import UseRate from "@/app/admin/components/inputs/UseRate";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import UsePopconfirm from "@/app/admin/components/display/UsePopconfirm";
import { staffList, staffTypeOptions, roleOptions, rateUnitOptions, bankOptions } from "@/app/admin/mock-data";

const typeColors = { fulltime: "blue", freelance: "purple" };

const typeFilterOptions = [{ value: "all", label: "ทั้งหมด" }, ...staffTypeOptions];

function formatRate(staff) {
    if (!staff.rate) return "-";
    const unit = rateUnitOptions.find((o) => o.value === staff.rateUnit)?.label ?? "บาท";
    return `${Number(staff.rate).toLocaleString("th-TH")} ${unit}`;
}

function Page() {
    const [list, setList] = useState(staffList);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const keyword = search.trim().toLowerCase();
    const rows = list.filter(
        (s) =>
            (typeFilter === "all" || s.type === typeFilter) &&
            [`${s.firstName} ${s.lastName}`, s.nickname, s.phone, s.phone?.replace(/-/g, "")].some((v) =>
                (v || "").toLowerCase().includes(keyword)
            )
    );

    const save = (values) => {
        if (editing.id) {
            setList(list.map((s) => (s.id === editing.id ? { ...editing, ...values } : s)));
        } else {
            setList([...list, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setList(list.filter((s) => s.id !== id));

    const columns = [
        {
            title: "ชื่อ-นามสกุล",
            key: "name",
            render: (_, s) => (
                <div>
                    <div>{`${s.firstName} ${s.lastName}`}</div>
                    {s.nickname && <div className="text-gray-500 text-sm">({s.nickname})</div>}
                </div>
            ),
        },
        {
            title: "ประเภท",
            dataIndex: "type",
            render: (type) => (
                <UseTag color={typeColors[type]} label={staffTypeOptions.find((o) => o.value === type)?.label ?? "-"} />
            ),
        },
        {
            title: "ตำแหน่ง",
            dataIndex: "roles",
            render: (roles) => (
                <div className="flex flex-wrap gap-1">
                    {(roles || []).map((role) => (
                        <UseTag key={role} label={role} />
                    ))}
                </div>
            ),
        },
        { title: "เบอร์โทร", dataIndex: "phone" },
        { title: "Line ID", dataIndex: "lineId", render: (v) => v || "-" },
        { title: "เรตค่าจ้าง", key: "rate", render: (_, s) => formatRate(s) },
        {
            title: "ธนาคาร/เลขบัญชี",
            key: "bank",
            render: (_, s) => (
                <div>
                    <div>{s.bankName || "-"}</div>
                    {s.bankAccount && <div className="text-gray-500 text-sm">{s.bankAccount}</div>}
                </div>
            ),
        },
        {
            title: "เรตติ้ง",
            key: "rating",
            render: (_, s) => (
                <div>
                    <UseRate value={s.rating} disabled />
                    {s.note && <div className="text-gray-500 text-sm">{s.note}</div>}
                </div>
            ),
        },
        {
            title: "จัดการ",
            key: "actions",
            render: (_, s) => (
                <div className="flex gap-1">
                    <UseButton label="แก้ไข" type="link" size="small" onClick={() => setEditing(s)} />
                    <UsePopconfirm title="ยืนยันการลบ?" onConfirm={() => remove(s.id)}>
                        <UseButton label="ลบ" type="link" size="small" danger />
                    </UsePopconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">บริหารจัดการบุคลากร</h1>
                <UseButton label="เพิ่มบุคลากร" type="primary" onClick={() => setEditing({ type: "freelance", rateUnit: "day" })} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <div className="w-72">
                    <UseInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ค้นหาชื่อ ชื่อเล่น หรือเบอร์โทร"
                    />
                </div>
                <div className="w-48">
                    <UseSelect value={typeFilter} onChange={setTypeFilter} options={typeFilterOptions} />
                </div>
            </div>

            <UseTable columns={columns} dataSource={rows} />

            <UseModal
                title={editing?.id ? "แก้ไขบุคลากร" : "เพิ่มบุคลากร"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <h3 className="col-span-2 font-medium mb-2">ข้อมูลส่วนตัว</h3>
                        <UseFormItem name="firstName" label="ชื่อ" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="lastName" label="นามสกุล" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="nickname" label="ชื่อเล่น">
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="phone" label="เบอร์โทรศัพท์" required>
                            <UseInput placeholder="08x-xxx-xxxx" />
                        </UseFormItem>
                        <UseFormItem name="lineId" label="Line ID">
                            <UseInput />
                        </UseFormItem>
                        <div />

                        <h3 className="col-span-2 font-medium mb-2">ตำแหน่งและเรตค่าจ้าง</h3>
                        <UseFormItem name="type" label="ประเภท" required>
                            <UseSelect options={staffTypeOptions} />
                        </UseFormItem>
                        <UseFormItem name="roles" label="ประเภทงานถนัด/ตำแหน่ง">
                            <UseSelect options={roleOptions} mode="multiple" placeholder="เลือกได้หลายตำแหน่ง" />
                        </UseFormItem>
                        <UseFormItem name="rate" label="อัตราค่าจ้าง">
                            <UseInputNumber suffix="บาท" />
                        </UseFormItem>
                        <UseFormItem name="rateUnit" label="หน่วยค่าจ้าง">
                            <UseSelect options={rateUnitOptions} />
                        </UseFormItem>

                        <h3 className="col-span-2 font-medium mb-2">ข้อมูลธนาคาร</h3>
                        <UseFormItem name="bankName" label="ธนาคาร">
                            <UseSelect options={bankOptions} placeholder="เลือกธนาคาร" />
                        </UseFormItem>
                        <UseFormItem name="bankAccount" label="เลขที่บัญชี">
                            <UseInput placeholder="xxx-x-xxxxx-x" />
                        </UseFormItem>

                        <h3 className="col-span-2 font-medium mb-2">ประเมินประสิทธิภาพ</h3>
                        <div className="col-span-2">
                            <UseFormItem name="rating" label="เรตติ้ง">
                                <UseRate />
                            </UseFormItem>
                        </div>
                        <div className="col-span-2">
                            <UseFormItem name="note" label="บันทึกพฤติกรรม/ประเมิน">
                                <UseTextArea placeholder="เช่น ตรงต่อเวลา, ขยัน" />
                            </UseFormItem>
                        </div>
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

export default Page;
