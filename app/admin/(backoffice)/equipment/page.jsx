"use client";
import UseTabs from "@/app/admin/components/display/UseTabs";
import { equipment, equipmentBookings, maintenanceLogs } from "@/app/admin/mock-data";
import { useState } from "react";
import BookingTab from "./BookingTab";
import EquipmentTab from "./EquipmentTab";
import MaintenanceTab from "./MaintenanceTab";

function Page() {
    const [items, setItems] = useState(equipment);
    const [bookings, setBookings] = useState(equipmentBookings);
    const [logs, setLogs] = useState(maintenanceLogs);

    const equipmentOptions = items.map((e) => ({ value: e.id, label: `${e.code} ${e.name}` }));

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">จัดการอุปกรณ์</h1>
            <UseTabs
                items={[
                    {
                        key: "equipment",
                        label: "รายการอุปกรณ์",
                        children: <EquipmentTab items={items} setItems={setItems} />,
                    },
                    {
                        key: "booking",
                        label: "ตารางการจอง",
                        children: (
                            <BookingTab
                                bookings={bookings}
                                setBookings={setBookings}
                                equipment={items}
                                equipmentOptions={equipmentOptions}
                            />
                        ),
                    },
                    {
                        key: "maintenance",
                        label: "ประวัติซ่อมบำรุง",
                        children: <MaintenanceTab logs={logs} setLogs={setLogs} equipmentOptions={equipmentOptions} />,
                    },
                ]}
            />
        </div>
    );
}

export default Page;
