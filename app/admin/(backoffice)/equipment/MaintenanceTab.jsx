"use client";
import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import UseTextArea from "@/app/admin/components/inputs/UseTextArea";
import { formatDate, formatMoney } from "@/app/admin/mock-data";
import { useState } from "react";
import RowActions from "@/app/admin/components/RowActions";

function MaintenanceTab({ logs, setLogs, equipmentOptions }) {
    const [editing, setEditing] = useState(null);
    const [equipmentId, setEquipmentId] = useState("all");

    const save = (values) => {
        if (editing.id) {
            setLogs(logs.map((x) => (x.id === editing.id ? { ...editing, ...values } : x)));
        } else {
            setLogs([...logs, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setLogs(logs.filter((x) => x.id !== id));

    const columns = [
        {
            title: "อุปกรณ์",
            dataIndex: "equipmentId",
            render: (v) => equipmentOptions.find((o) => o.value === v)?.label ?? "-",
        },
        { title: "วันที่ซ่อม", dataIndex: "date", render: (v) => formatDate(v) },
        { title: "อาการเสีย", dataIndex: "issue" },
        { title: "ค่าใช้จ่าย", dataIndex: "cost", align: "right", render: (v) => formatMoney(v) },
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
                <div className="w-72">
                    <UseSelect
                        value={equipmentId}
                        onChange={setEquipmentId}
                        options={[{ value: "all", label: "ทุกอุปกรณ์" }, ...equipmentOptions]}
                    />
                </div>
                <UseButton label="เพิ่มประวัติซ่อม" type="primary" onClick={() => setEditing({})} />
            </div>
            <UseTable
                columns={columns}
                dataSource={logs.filter((x) => equipmentId === "all" || x.equipmentId === equipmentId)}
            />

            <UseModal
                title={editing?.id ? "แก้ไขประวัติซ่อม" : "เพิ่มประวัติซ่อม"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="equipmentId" label="อุปกรณ์" required>
                            <UseSelect options={equipmentOptions} placeholder="เลือกอุปกรณ์" />
                        </UseFormItem>
                        <UseFormItem name="date" label="วันที่ซ่อม" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <div className="col-span-2">
                            <UseFormItem name="issue" label="อาการเสีย" required>
                                <UseTextArea rows={2} />
                            </UseFormItem>
                        </div>
                        <UseFormItem name="cost" label="ค่าใช้จ่าย" required>
                            <UseInputNumber suffix="บาท" />
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

export default MaintenanceTab;
