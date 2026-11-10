"use client";
import UseModal from "@/app/admin/components/display/UseModal";
import UsePopconfirm from "@/app/admin/components/display/UsePopconfirm";
import UseProgress from "@/app/admin/components/display/UseProgress";
import UseSteps from "@/app/admin/components/display/UseSteps";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseCheckbox from "@/app/admin/components/inputs/UseCheckbox";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import { formatDate, projects, projectStatusOptions, staffList, staffName } from "@/app/admin/mock-data";
import { useState } from "react";

const pmOptions = staffList
    .filter((s) => s.roles.includes("Project Manager"))
    .map((s) => ({ value: s.id, label: staffName(s.id) }));

const statusFilterOptions = [{ value: "all", label: "ทุกสถานะ" }, ...projectStatusOptions];

const stepItems = projectStatusOptions.map((o) => ({ title: o.label }));

const progressOf = (tasks) => (tasks.length ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0);

function Page() {
    const [list, setList] = useState(projects);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [editing, setEditing] = useState(null);
    const [dateError, setDateError] = useState("");
    const [checklistId, setChecklistId] = useState(null);
    const [newTask, setNewTask] = useState("");

    const keyword = search.trim().toLowerCase();
    const filtered = list.filter(
        (p) =>
            `${p.name} ${p.client}`.toLowerCase().includes(keyword) &&
            (statusFilter === "all" || p.status === statusFilter),
    );

    const checklistProject = list.find((p) => p.id === checklistId);

    const closeEditing = () => {
        setEditing(null);
        setDateError("");
    };

    const save = (values) => {
        if (values.prepDate > values.eventDate || values.eventDate > values.teardownDate) {
            setDateError("วันที่ไม่ถูกต้อง: ต้องเรียงตามลำดับ วันเริ่มเตรียมงาน ≤ วันจัดงานจริง ≤ วันรื้อถอน");
            return;
        }
        if (editing.id) {
            setList(list.map((p) => (p.id === editing.id ? { ...editing, ...values } : p)));
        } else {
            setList([...list, { id: Date.now(), ...values, tasks: [] }]);
        }
        closeEditing();
    };

    const remove = (id) => setList(list.filter((p) => p.id !== id));

    const updateTasks = (change) =>
        setList(list.map((p) => (p.id === checklistId ? { ...p, tasks: change(p.tasks) } : p)));

    const addTask = () => {
        const title = newTask.trim();
        if (!title) return;
        updateTasks((tasks) => [...tasks, { id: Date.now(), title, done: false }]);
        setNewTask("");
    };

    const closeChecklist = () => {
        setChecklistId(null);
        setNewTask("");
    };

    const columns = [
        {
            title: "ชื่ออีเวนต์",
            key: "name",
            render: (_, r) => (
                <div>
                    <div>{r.name}</div>
                    <div className="text-xs text-gray-500">{r.client}</div>
                </div>
            ),
        },
        { title: "สถานที่", dataIndex: "venue" },
        { title: "PM", dataIndex: "pmId", render: (id) => staffName(id) },
        {
            title: "ไทม์ไลน์",
            key: "timeline",
            render: (_, r) => (
                <div className="text-sm">
                    <div>
                        <span className="text-gray-500">เตรียม:</span> {formatDate(r.prepDate)}
                    </div>
                    <div>
                        <span className="text-gray-500">จัดงาน:</span> {formatDate(r.eventDate)}
                    </div>
                    <div>
                        <span className="text-gray-500">รื้อถอน:</span> {formatDate(r.teardownDate)}
                    </div>
                </div>
            ),
        },
        {
            title: "สถานะ",
            dataIndex: "status",
            render: (value) => {
                const option = projectStatusOptions.find((o) => o.value === value);
                return <UseTag color={option?.color} label={option?.label} />;
            },
        },
        {
            title: "ความคืบหน้า",
            key: "progress",
            render: (_, r) => (
                <div className="w-40">
                    <UseProgress percent={progressOf(r.tasks)} />
                </div>
            ),
        },
        {
            title: "จัดการ",
            key: "actions",
            render: (_, r) => (
                <div className="flex">
                    <UseButton label="เช็กลิสต์" type="link" size="small" onClick={() => setChecklistId(r.id)} />
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
                <h1 className="text-xl font-semibold">บริหารโปรเจกต์</h1>
                <UseButton label="เพิ่มโปรเจกต์" type="primary" onClick={() => setEditing({ status: "brief" })} />
            </div>

            <div className="flex gap-2 mb-4">
                <div className="w-72">
                    <UseInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ค้นหาชื่ออีเวนต์หรือลูกค้า"
                    />
                </div>
                <div className="w-56">
                    <UseSelect value={statusFilter} onChange={setStatusFilter} options={statusFilterOptions} />
                </div>
            </div>

            <UseTable columns={columns} dataSource={filtered} />

            <UseModal
                title={editing?.id ? "แก้ไขโปรเจกต์" : "เพิ่มโปรเจกต์"}
                open={editing !== null}
                onCancel={closeEditing}
                width={720}
            >
                <UseForm initialValues={editing} onFinish={save}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="name" label="ชื่ออีเวนต์/ชื่อโครงการ" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="client" label="ลูกค้า (โครงการอสังหาฯ)" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="venue" label="สถานจัดงาน" required>
                            <UseInput />
                        </UseFormItem>
                        <UseFormItem name="pmId" label="ผู้รับผิดชอบหลัก (PM)" required>
                            <UseSelect options={pmOptions} placeholder="เลือก PM" />
                        </UseFormItem>
                        <UseFormItem name="prepDate" label="วันเริ่มเตรียมงาน" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="eventDate" label="วันจัดงานจริง" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="teardownDate" label="วันรื้อถอน" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="status" label="สถานะงาน" required>
                            <UseSelect options={projectStatusOptions} />
                        </UseFormItem>
                    </div>
                    {dateError && <div className="text-red-500 mb-4">{dateError}</div>}
                    <div className="flex justify-end gap-2">
                        <UseButton label="ยกเลิก" onClick={closeEditing} />
                        <UseButton label="บันทึก" type="primary" htmlType="submit" />
                    </div>
                </UseForm>
            </UseModal>

            <UseModal
                title={checklistProject && `เช็กลิสต์: ${checklistProject.name}`}
                open={checklistId !== null}
                onCancel={closeChecklist}
                width={720}
            >
                {checklistProject && (
                    <div className="flex flex-col gap-6">
                        <UseSteps
                            current={
                                checklistProject.status === "done"
                                    ? stepItems.length
                                    : projectStatusOptions.findIndex((o) => o.value === checklistProject.status)
                            }
                            items={stepItems}
                        />
                        <div className="flex flex-col gap-2">
                            {checklistProject.tasks.length === 0 && <div className="text-gray-500">ยังไม่มีรายการ</div>}
                            {checklistProject.tasks.map((t) => (
                                <div key={t.id} className="flex justify-between items-center">
                                    <UseCheckbox
                                        value={t.done}
                                        label={t.title}
                                        onChange={(done) =>
                                            updateTasks((tasks) => tasks.map((x) => (x.id === t.id ? { ...x, done } : x)))
                                        }
                                    />
                                    <UseButton
                                        label="ลบ"
                                        type="link"
                                        size="small"
                                        danger
                                        onClick={() => updateTasks((tasks) => tasks.filter((x) => x.id !== t.id))}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <UseInput
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="เพิ่มรายการ เช่น สั่งทำ Backdrop"
                            />
                            <UseButton label="เพิ่ม" type="primary" onClick={addTask} />
                        </div>
                    </div>
                )}
            </UseModal>
        </div>
    );
}

export default Page;
