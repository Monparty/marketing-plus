import UseModal from "@/app/admin/components/display/UseModal";
import UsePopconfirm from "@/app/admin/components/display/UsePopconfirm";
import UseTable from "@/app/admin/components/display/UseTable";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import { expenseCategoryOptions, formatDate, formatMoney, projectName, projects } from "@/app/admin/mock-data";
import { useState } from "react";

const projectOptions = projects.map((p) => ({ value: p.id, label: p.name }));
const projectFilterOptions = [{ value: "all", label: "ทุกโปรเจกต์" }, ...projectOptions];
const categoryFilterOptions = [{ value: "all", label: "ทุกหมวด" }, ...expenseCategoryOptions];

function ExpenseTab({ expenses, setExpenses }) {
    const [editing, setEditing] = useState(null);
    const [projectId, setProjectId] = useState("all");
    const [category, setCategory] = useState("all");

    const save = (values) => {
        if (editing.id) {
            setExpenses(expenses.map((x) => (x.id === editing.id ? { ...editing, ...values } : x)));
        } else {
            setExpenses([...expenses, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setExpenses(expenses.filter((x) => x.id !== id));

    const columns = [
        { title: "วันที่", dataIndex: "date", render: (v) => formatDate(v) },
        { title: "โปรเจกต์", dataIndex: "projectId", render: (v) => projectName(v) },
        {
            title: "หมวด",
            dataIndex: "category",
            render: (v) => expenseCategoryOptions.find((o) => o.value === v)?.label ?? "-",
        },
        { title: "รายละเอียด", dataIndex: "description" },
        { title: "จำนวนเงิน", dataIndex: "amount", align: "right", render: (v) => formatMoney(v) },
        {
            title: "จัดการ",
            render: (_, r) => (
                <div className="flex">
                    <UseButton label="แก้ไข" type="link" size="small" onClick={() => setEditing(r)} />
                    <UsePopconfirm title="ยืนยันการลบ?" onConfirm={() => remove(r.id)}>
                        <UseButton label="ลบ" type="link" size="small" danger />
                    </UsePopconfirm>
                </div>
            ),
        },
    ];

    const filtered = expenses.filter(
        (x) => (projectId === "all" || x.projectId === projectId) && (category === "all" || x.category === category),
    );

    return (
        <div>
            <div className="flex justify-between items-center gap-4 mb-4">
                <div className="flex gap-2">
                    <div className="w-72">
                        <UseSelect value={projectId} onChange={setProjectId} options={projectFilterOptions} />
                    </div>
                    <div className="w-48">
                        <UseSelect value={category} onChange={setCategory} options={categoryFilterOptions} />
                    </div>
                </div>
                <UseButton label="เพิ่มรายจ่าย" type="primary" onClick={() => setEditing({})} />
            </div>
            <UseTable columns={columns} dataSource={filtered} />

            <UseModal
                title={editing?.id ? "แก้ไขรายจ่าย" : "เพิ่มรายจ่าย"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="date" label="วันที่" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="projectId" label="โปรเจกต์" required>
                            <UseSelect options={projectOptions} placeholder="เลือกโปรเจกต์" />
                        </UseFormItem>
                        <UseFormItem name="category" label="หมวด" required>
                            <UseSelect options={expenseCategoryOptions} placeholder="เลือกหมวด" />
                        </UseFormItem>
                        <UseFormItem name="amount" label="จำนวนเงิน" required>
                            <UseInputNumber suffix="บาท" />
                        </UseFormItem>
                        <div className="col-span-2">
                            <UseFormItem name="description" label="รายละเอียด" required>
                                <UseInput placeholder="เช่น ค่าเช่าจอ LED" />
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

export default ExpenseTab;
