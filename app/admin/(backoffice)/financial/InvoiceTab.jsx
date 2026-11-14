import UseModal from "@/app/admin/components/display/UseModal";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseCheckbox from "@/app/admin/components/inputs/UseCheckbox";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import { formatDate, formatMoney, paymentStatusOptions, projectName, projects } from "@/app/admin/mock-data";
import { useState } from "react";
import RowActions from "@/app/admin/components/RowActions";

const projectOptions = projects.map((p) => ({ value: p.id, label: p.name }));
const statusFilterOptions = [{ value: "all", label: "ทุกสถานะการชำระ" }, ...paymentStatusOptions];

function InvoiceTab({ invoices, setInvoices }) {
    const [editing, setEditing] = useState(null);
    const [status, setStatus] = useState("all");

    const save = (values) => {
        if (editing.id) {
            setInvoices(invoices.map((x) => (x.id === editing.id ? { ...editing, ...values } : x)));
        } else {
            setInvoices([...invoices, { id: Date.now(), ...values }]);
        }
        setEditing(null);
    };

    const remove = (id) => setInvoices(invoices.filter((x) => x.id !== id));

    const columns = [
        { title: "เลขที่เอกสาร", dataIndex: "number" },
        { title: "โปรเจกต์", dataIndex: "projectId", render: (v) => projectName(v) },
        { title: "ยอดเงินรวม", dataIndex: "amount", align: "right", render: (v) => formatMoney(v) },
        { title: "วันที่ออก", dataIndex: "issueDate", render: (v) => formatDate(v) },
        { title: "ครบกำหนด", dataIndex: "dueDate", render: (v) => formatDate(v) },
        {
            title: "สถานะการชำระ",
            dataIndex: "status",
            render: (v) => {
                const option = paymentStatusOptions.find((o) => o.value === v);
                return option ? <UseTag color={option.color} label={option.label} /> : "-";
            },
        },
        {
            title: "เอกสารภาษี",
            render: (_, r) => (
                <div className="flex flex-wrap gap-1">
                    {r.taxInvoiceIssued ? (
                        <UseTag color="green" label="ออกใบกำกับภาษีแล้ว" />
                    ) : (
                        <UseTag label="ยังไม่ออกใบกำกับ" />
                    )}
                    {r.withholdingTax && <UseTag color="blue" label="หัก ณ ที่จ่าย" />}
                </div>
            ),
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
            <div className="flex justify-between items-center mb-4">
                <div className="w-60">
                    <UseSelect value={status} onChange={setStatus} options={statusFilterOptions} />
                </div>
                <UseButton label="เพิ่มใบแจ้งหนี้" type="primary" onClick={() => setEditing({})} />
            </div>
            <UseTable columns={columns} dataSource={invoices.filter((x) => status === "all" || x.status === status)} />

            <UseModal
                title={editing?.id ? "แก้ไขใบแจ้งหนี้" : "เพิ่มใบแจ้งหนี้"}
                open={editing !== null}
                onCancel={() => setEditing(null)}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="number" label="เลขที่ใบเสนอราคา/ใบแจ้งหนี้" required>
                            <UseInput placeholder="เช่น INV-2026-005" />
                        </UseFormItem>
                        <UseFormItem name="projectId" label="โปรเจกต์" required>
                            <UseSelect options={projectOptions} placeholder="เลือกโปรเจกต์" />
                        </UseFormItem>
                        <UseFormItem name="amount" label="ยอดเงินรวม" required>
                            <UseInputNumber suffix="บาท" />
                        </UseFormItem>
                        <UseFormItem name="status" label="สถานะการชำระ" required>
                            <UseSelect options={paymentStatusOptions} placeholder="เลือกสถานะ" />
                        </UseFormItem>
                        <UseFormItem name="issueDate" label="วันที่ออก" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="dueDate" label="ครบกำหนด">
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="taxInvoiceIssued" label="ใบกำกับภาษี">
                            <UseCheckbox label="ออกใบกำกับภาษีแล้ว" />
                        </UseFormItem>
                        <UseFormItem name="withholdingTax" label="ภาษีหัก ณ ที่จ่าย">
                            <UseCheckbox label="มีการหัก ณ ที่จ่าย" />
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

export default InvoiceTab;
