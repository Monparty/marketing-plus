"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import UseButton from "@/app/admin/components/inputs/UseButton";
import UseInput from "@/app/admin/components/inputs/UseInput";
import UseInputNumber from "@/app/admin/components/inputs/UseInputNumber";
import UseSelect from "@/app/admin/components/inputs/UseSelect";
import UseDatePicker from "@/app/admin/components/inputs/UseDatePicker";
import UseForm from "@/app/admin/components/inputs/UseForm";
import UseFormItem from "@/app/admin/components/inputs/UseFormItem";
import UseFormList from "@/app/admin/components/inputs/UseFormList";
import UseModal from "@/app/admin/components/display/UseModal";
import UsePopconfirm from "@/app/admin/components/display/UsePopconfirm";
import { calendarProjects, staffList, equipment, staffName } from "@/app/admin/mock-data";

// ปฏิทินอิงวันที่ของเครื่องที่เปิดดู แต่หน้านี้ถูก prerender ตอน build
// จึงให้ render ฝั่งเบราว์เซอร์อย่างเดียว ไม่งั้นวันที่จากเซิร์ฟเวอร์กับเบราว์เซอร์จะไม่ตรงกัน
const UseCalendar = dynamic(() => import("@/app/admin/components/display/UseCalendar"), { ssr: false });

const managerOptions = staffList.map((s) => ({ value: s.id, label: staffName(s.id) }));
const staffOptions = staffList.filter((s) => s.type === "freelance").map((s) => ({ value: s.id, label: staffName(s.id) }));
const equipmentOptions = equipment.map((e) => ({ value: e.id, label: `${e.code} ${e.name} (มี ${e.total} ชิ้น)` }));

const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-orange-100 text-orange-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
];

// ให้แต่ละโปรเจกต์อยู่แถวเดิมทุกวัน แถบจึงต่อกันเป็นเส้นตรง — โปรเจกต์ที่วันซ้อนกันจะได้คนละแถว
const assignLanes = (list) => {
    const laneEnds = []; // วันสุดท้ายของงานล่าสุดในแต่ละแถว
    return [...list]
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .map((p) => {
            let lane = laneEnds.findIndex((end) => end < p.startDate);
            if (lane === -1) lane = laneEnds.length;
            laneEnds[lane] = p.endDate;
            return { ...p, lane };
        });
};

function Page() {
    const [list, setList] = useState(calendarProjects);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");

    const close = () => {
        setEditing(null);
        setError("");
    };

    const save = (values) => {
        if (values.endDate < values.startDate) {
            setError("วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่ม");
            return;
        }
        if (editing.id) {
            setList(list.map((p) => (p.id === editing.id ? { ...editing, ...values } : p)));
        } else {
            setList([...list, { id: Date.now(), ...values }]);
        }
        close();
    };

    const remove = () => {
        setList(list.filter((p) => p.id !== editing.id));
        close();
    };

    const placed = assignLanes(list);

    const dateCellRender = (date, isToday) => {
        const dayProjects = placed.filter((p) => p.startDate <= date && date <= p.endDate);
        const laneCount = Math.max(0, ...dayProjects.map((p) => p.lane + 1));
        const isSunday = new Date(date).getUTCDay() === 0; // วันแรกของสัปดาห์ในปฏิทิน

        return (
            <div className={`min-h-28 border-t-2 pb-1 hover:bg-gray-50 ${isToday ? "border-blue-500" : "border-gray-100"}`}>
                <div className={`px-2 py-1 ${isToday ? "font-semibold text-blue-600" : ""}`}>{date.slice(8)}</div>
                {Array.from({ length: laneCount }, (_, lane) => {
                    const p = dayProjects.find((x) => x.lane === lane);
                    if (!p) return <div key={lane} className="h-6" />;
                    const isStart = p.startDate === date;
                    const isEnd = p.endDate === date;
                    return (
                        <div key={lane} className={`h-6 py-0.5 ${isStart ? "pl-1" : ""} ${isEnd ? "pr-1" : ""}`}>
                            <button
                                type="button"
                                title={p.name}
                                className={`block h-full w-full truncate px-1 text-left text-xs cursor-pointer ${colors[p.id % colors.length]} ${isStart ? "rounded-l" : ""} ${isEnd ? "rounded-r" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditing(p);
                                }}
                            >
                                {/* ชื่อแสดงวันแรกของงาน และต้นสัปดาห์ถ้างานยาวข้ามสัปดาห์ */}
                                {isStart || isSunday ? p.name : ""}
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-semibold">ปฏิทินและกิจกรรม</h1>
                <UseButton label="เพิ่มโปรเจกต์" type="primary" onClick={() => setEditing({})} />
            </div>
            <p className="text-sm text-gray-500 mb-4">กดที่วันเพื่อเพิ่มโปรเจกต์ หรือกดที่ชื่อโปรเจกต์เพื่อแก้ไข/ลบ</p>

            <UseCalendar
                dateCellRender={dateCellRender}
                onSelectDate={(date) => setEditing({ startDate: date, endDate: date })}
            />

            <UseModal title={editing?.id ? "แก้ไขโปรเจกต์" : "เพิ่มโปรเจกต์"} open={editing !== null} onCancel={close} width={720}>
                <UseForm initialValues={editing} onFinish={save}>
                    <UseFormItem name="name" label="ชื่อโปรเจกต์" required>
                        <UseInput placeholder="เช่น งานเปิดตัวโครงการ" />
                    </UseFormItem>
                    <div className="grid grid-cols-2 gap-x-4">
                        <UseFormItem name="startDate" label="วันที่เริ่ม" required>
                            <UseDatePicker />
                        </UseFormItem>
                        <UseFormItem name="endDate" label="ถึงวันที่" required>
                            <UseDatePicker />
                        </UseFormItem>
                    </div>
                    <UseFormItem name="managerIds" label="ผู้ดูแลโครงการ">
                        <UseSelect mode="multiple" options={managerOptions} placeholder="เลือกได้หลายคน" />
                    </UseFormItem>
                    <UseFormItem name="staffIds" label="Staff">
                        <UseSelect mode="multiple" options={staffOptions} placeholder="เพิ่ม staff" />
                    </UseFormItem>
                    <UseFormItem label="อุปกรณ์ที่ใช้">
                        <UseFormList name="equipment">
                            {(fields, { add, remove }) => (
                                <div className="flex flex-col gap-2">
                                    {fields.map(({ key, name }) => (
                                        <div key={key} className="flex gap-2">
                                            <div className="flex-1">
                                                <UseFormItem name={[name, "equipmentId"]} label="อุปกรณ์" required noStyle>
                                                    <UseSelect options={equipmentOptions} placeholder="เลือกอุปกรณ์" />
                                                </UseFormItem>
                                            </div>
                                            <div className="w-36">
                                                <UseFormItem name={[name, "quantity"]} label="จำนวน" required noStyle>
                                                    <UseInputNumber min={1} suffix="ชิ้น" />
                                                </UseFormItem>
                                            </div>
                                            <UseButton type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                        </div>
                                    ))}
                                    <UseButton
                                        label="เพิ่มอุปกรณ์"
                                        type="dashed"
                                        icon={<Plus size={16} />}
                                        onClick={() => add({ quantity: 1 })}
                                    />
                                </div>
                            )}
                        </UseFormList>
                    </UseFormItem>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-between">
                        <div>
                            {editing?.id && (
                                <UsePopconfirm title="ยืนยันการลบ?" onConfirm={remove}>
                                    <UseButton label="ลบโปรเจกต์" danger />
                                </UsePopconfirm>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <UseButton label="ยกเลิก" onClick={close} />
                            <UseButton label="บันทึก" type="primary" htmlType="submit" />
                        </div>
                    </div>
                </UseForm>
            </UseModal>
        </div>
    );
}

export default Page;
