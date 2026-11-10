"use client";
import UseCard from "@/app/admin/components/display/UseCard";
import UseProgress from "@/app/admin/components/display/UseProgress";
import UseStatistic from "@/app/admin/components/display/UseStatistic";
import UseTable from "@/app/admin/components/display/UseTable";
import UseTag from "@/app/admin/components/display/UseTag";
import {
    equipmentBookings,
    equipmentName,
    formatDate,
    formatMoney,
    invoices,
    projectName,
    projectStatusOptions,
    projects,
    revenueTarget,
    staffBookings,
    staffName,
    today,
} from "@/app/admin/mock-data";
import dayjs from "dayjs";
import { CalendarDays, CircleCheck, FolderKanban, Package, Receipt, UserRoundSearch, Wallet } from "lucide-react";

const daysFromToday = (date) => dayjs(date).diff(today, "day");
const byDate = (key) => (a, b) => a[key].localeCompare(b[key]);
const sumAmount = (list) => list.reduce((sum, x) => sum + x.amount, 0);

const monthRevenue = sumAmount(invoices.filter((x) => dayjs(x.issueDate).isSame(today, "month")));
const yearRevenue = sumAmount(invoices.filter((x) => dayjs(x.issueDate).isSame(today, "year")));

const isRunningToday = (p) => p.eventDate === today || p.status === "onsite";
const preparingCount = projects.filter((p) => ["brief", "planning", "preparing"].includes(p.status) && !isRunningToday(p)).length;
const runningCount = projects.filter(isRunningToday).length;
const doneCount = projects.filter((p) => p.status === "done" && dayjs(p.eventDate).isSame(today, "month")).length;

const todayEvents = projects.filter((p) => p.eventDate === today);

const todayColumns = [
    { title: "ชื่ออีเวนต์", dataIndex: "name" },
    { title: "สถานที่", dataIndex: "venue" },
    { title: "ผู้จัดการโปรเจกต์", dataIndex: "pmId", render: (id) => staffName(id) },
    {
        title: "สถานะ",
        dataIndex: "status",
        render: (value) => {
            const option = projectStatusOptions.find((o) => o.value === value);
            return <UseTag color={option?.color} label={option?.label} />;
        },
    },
];

const returnAlerts = equipmentBookings
    .filter((b) => daysFromToday(b.endDate) >= 0 && daysFromToday(b.endDate) <= 2)
    .sort(byDate("endDate"))
    .map((b) => {
        const days = daysFromToday(b.endDate);
        return {
            id: b.id,
            title: `${equipmentName(b.equipmentId)} × ${b.quantity}`,
            detail: `${projectName(b.projectId)} · คืน ${formatDate(b.endDate)}`,
            color: days === 0 ? "red" : "orange",
            label: days === 0 ? "คืนวันนี้" : `อีก ${days} วัน`,
        };
    });

const pendingAlerts = staffBookings
    .filter((b) => b.status === "pending" && daysFromToday(b.endDate) >= 0)
    .sort(byDate("startDate"))
    .map((b) => {
        const days = daysFromToday(b.startDate);
        return {
            id: b.id,
            title: staffName(b.staffId),
            detail: `${projectName(b.projectId)} · ${formatDate(b.startDate)}`,
            color: days <= 0 ? "red" : "gold",
            label: days <= 0 ? "งานวันนี้" : `อีก ${days} วัน`,
        };
    });

// บิลที่ยังจ่ายไม่ครบ และเลยกำหนดแล้วหรือจะครบกำหนดภายใน 7 วัน
const invoiceAlerts = invoices
    .filter((x) => x.status !== "paid" && daysFromToday(x.dueDate) <= 7)
    .sort(byDate("dueDate"))
    .map((x) => {
        const days = daysFromToday(x.dueDate);
        let label = `อีก ${days} วัน`;
        if (days === 0) label = "ครบกำหนดวันนี้";
        if (days < 0) label = `เกินกำหนด ${-days} วัน`;
        return {
            id: x.id,
            title: `${x.number} · ${formatMoney(x.amount)}`,
            detail: `${projectName(x.projectId)} · ครบกำหนด ${formatDate(x.dueDate)}`,
            color: days <= 0 ? "red" : "gold",
            label,
        };
    });

function CardTitle({ icon, text, count }) {
    return (
        <span className="flex items-center gap-2">
            {icon}
            {text}
            {count !== undefined && <UseTag color={count ? "red" : "green"} label={count} />}
        </span>
    );
}

function RevenueCard({ title, value, target }) {
    return (
        <UseCard title={<CardTitle icon={<Wallet size={18} />} text={title} />}>
            <UseStatistic value={value} suffix="บาท" />
            <UseProgress percent={Math.round((value / target) * 100)} />
            <div className="text-sm text-gray-500">
                เป้าหมาย {formatMoney(target)} ·{" "}
                {value >= target ? `เกินเป้า ${formatMoney(value - target)}` : `ขาดอีก ${formatMoney(target - value)}`}
            </div>
        </UseCard>
    );
}

function AlertCard({ icon, title, items, emptyText }) {
    return (
        <UseCard title={<CardTitle icon={icon} text={title} count={items.length} />}>
            {items.length === 0 ? (
                <div className="flex items-center gap-2 text-gray-500">
                    <CircleCheck size={18} className="text-green-600" />
                    {emptyText}
                </div>
            ) : (
                <div className="flex flex-col divide-y divide-gray-100">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-3 py-2 first:pt-0 last:pb-0">
                            <div className="min-w-0">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.detail}</div>
                            </div>
                            <UseTag color={item.color} label={item.label} />
                        </div>
                    ))}
                </div>
            )}
        </UseCard>
    );
}

function Page() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">สรุปภาพรวม</h1>
                <span className="text-gray-500">ข้อมูล ณ วันที่ {formatDate(today)}</span>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
                    <RevenueCard title="รายได้เดือนนี้" value={monthRevenue} target={revenueTarget.month} />
                    <RevenueCard title="รายได้ปีนี้" value={yearRevenue} target={revenueTarget.year} />
                    <div className="grid lg:col-span-2">
                        <UseCard title={<CardTitle icon={<FolderKanban size={18} />} text="สถานะโปรเจกต์" />}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <UseStatistic title="กำลังเตรียมงาน" value={preparingCount} suffix="งาน" />
                                <UseStatistic title="กำลังจัดอยู่ (วันนี้)" value={runningCount} suffix="งาน" />
                                <UseStatistic title="เสร็จสิ้นเดือนนี้" value={doneCount} suffix="งาน" />
                            </div>
                        </UseCard>
                    </div>
                </div>

                <UseCard title={<CardTitle icon={<CalendarDays size={18} />} text="ตารางงานวันนี้" />}>
                    {todayEvents.length === 0 ? (
                        <div className="text-gray-500">วันนี้ไม่มีอีเวนต์</div>
                    ) : (
                        <UseTable columns={todayColumns} dataSource={todayEvents} />
                    )}
                </UseCard>

                <div>
                    <h2 className="text-lg font-semibold mb-2">การแจ้งเตือนด่วน</h2>
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <AlertCard
                            icon={<Package size={18} />}
                            title="อุปกรณ์ใกล้กำหนดคืน"
                            items={returnAlerts}
                            emptyText="ไม่มีอุปกรณ์ที่ต้องคืนใน 2 วันนี้"
                        />
                        <AlertCard
                            icon={<UserRoundSearch size={18} />}
                            title="ฟรีแลนซ์ที่ยังไม่คอนเฟิร์มงาน"
                            items={pendingAlerts}
                            emptyText="ฟรีแลนซ์คอนเฟิร์มงานครบแล้ว"
                        />
                        <AlertCard
                            icon={<Receipt size={18} />}
                            title="บิลค้างชำระ"
                            items={invoiceAlerts}
                            emptyText="ไม่มีบิลค้างชำระที่ใกล้หรือเลยกำหนด"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
