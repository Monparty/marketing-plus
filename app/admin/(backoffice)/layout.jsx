"use client";
import { useState } from "react";
import { Logo } from "@/components/logo";
import UseDrawer from "@/app/admin/components/display/UseDrawer";
import UseTooltip from "@/app/admin/components/display/UseTooltip";
import {
    CalendarDays,
    ChartColumn,
    LogOut,
    Menu,
    NotebookPen,
    Package,
    PiggyBank,
    UserRound,
    UserRoundGroup,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const menuList = [
    {
        ico: <ChartColumn size={22} />,
        title: "Dashboard",
        path: "dashboard",
    },
    {
        ico: <CalendarDays size={22} />,
        title: "ปฏิทินและกิจกรรม",
        path: "calendar",
    },
    {
        ico: <UserRound size={22} />,
        title: "บริหารจัดการบุคลากร",
        path: "personnel",
    },
    {
        ico: <UserRoundGroup size={22} />,
        title: "จัดตารางงาน Staff",
        path: "staff",
    },
    {
        ico: <Package size={22} />,
        title: "จัดการอุปกรณ์",
        path: "equipment",
    },
    {
        ico: <NotebookPen size={22} />,
        title: "บริหารโปรเจกต์",
        path: "projects",
    },
    {
        ico: <PiggyBank size={22} />,
        title: "รายรับรายจ่ายโปรเจกต์",
        path: "financial",
    },
];

function Layout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const lastSegment = pathname.split("/").pop();
    const [menuOpen, setMenuOpen] = useState(false);

    const go = (path) => {
        setMenuOpen(false);
        router.push(path);
    };

    return (
        <div className="p-2 h-dvh bg-gray-100">
            <div className="h-16 border-2 border-b-0 rounded-tl-lg rounded-tr-lg bg-white flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                    {/* มือถือ: ใช้ปุ่มนี้เปิดเมนูแบบ Drawer แทนแถบไอคอนด้านซ้าย */}
                    <button
                        type="button"
                        aria-label="เปิดเมนู"
                        className="md:hidden p-2 rounded-lg border cursor-pointer hover:bg-gray-100"
                        onClick={() => setMenuOpen(true)}
                    >
                        <Menu size={18} />
                    </button>
                    <Logo className="h-6 w-auto" />
                </div>
                <UseTooltip placement="left" title="ออกจากระบบ">
                    <button
                        type="button"
                        aria-label="ออกจากระบบ"
                        className="p-2 rounded-full border cursor-pointer hover:bg-gray-100"
                        onClick={() => router.push("/admin")}
                    >
                        <LogOut size={18} />
                    </button>
                </UseTooltip>
            </div>
            <div className="flex h-[calc(100%-4rem)]">
                <nav className="hidden md:flex w-18 h-full border-2 border-r-0 rounded-bl-lg bg-white flex-col justify-start items-center py-4 gap-4">
                    {menuList.map((item) => (
                        <UseTooltip key={item.path} placement="right" title={item.title}>
                            <button
                                type="button"
                                aria-label={item.title}
                                className={`p-2 rounded-lg border cursor-pointer hover:bg-gray-100 ${lastSegment === item.path ? "bg-gray-100" : ""}`}
                                onClick={() => go(item.path)}
                            >
                                {item.ico}
                            </button>
                        </UseTooltip>
                    ))}
                </nav>
                <div className="w-full h-full border-2 rounded-b-lg md:rounded-bl-none bg-white p-4 overflow-auto min-w-0">
                    {children}
                </div>
            </div>

            <UseDrawer title={<Logo className="h-6 w-auto" />} open={menuOpen} onClose={() => setMenuOpen(false)}>
                <nav className="flex flex-col gap-1">
                    {menuList.map((item) => (
                        <button
                            key={item.path}
                            type="button"
                            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left cursor-pointer hover:bg-gray-100 ${lastSegment === item.path ? "bg-gray-100 font-medium" : ""}`}
                            onClick={() => go(item.path)}
                        >
                            {item.ico}
                            {item.title}
                        </button>
                    ))}
                </nav>
            </UseDrawer>
        </div>
    );
}

export default Layout;
