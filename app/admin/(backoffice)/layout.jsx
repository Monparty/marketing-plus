"use client";
import { Logo } from "@/components/logo";
import { Tooltip } from "antd";
import { ChartColumn, LogOut, NotebookPen, Package, PiggyBank, UserRound, UserRoundGroup } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const menuList = [
    {
        ico: <ChartColumn size={22} />,
        title: "Dashboard",
        path: "dashboard",
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
        title: "ระบบบัญชีและ การเงิน",
        path: "financial ",
    },
];
function Layout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const lastSegment = pathname.split("/").pop();

    const NavMenu = ({ ico, title, path }) => {
        return (
            <Tooltip placement="right" title={title}>
                <div
                    className={`p-2 rounded-lg border cursor-pointer hover:bg-gray-100 ${lastSegment === path ? "bg-gray-100" : ""}`}
                    onClick={() => router.push(path)}
                >
                    {ico}
                </div>
            </Tooltip>
        );
    };

    return (
        <div className="p-2 h-dvh bg-gray-100">
            <div className="h-16 border-2 border-b-0 rounded-tl-lg rounded-tr-lg bg-white flex justify-between items-center p-4">
                <Logo className="h-6 w-auto" />
                <Tooltip placement="left" title="ออกจากระบบ">
                    <div
                        className="p-2 rounded-full border cursor-pointer hover:bg-gray-100"
                        onClick={() => router.push("/admin")}
                    >
                        <LogOut size={18} />
                    </div>
                </Tooltip>
            </div>
            <div className="flex h-[calc(100%-4rem)]">
                <div className="w-18 h-full border-2 border-r-0 rounded-bl-lg bg-white flex flex-col justify-start items-center py-4 gap-4">
                    {menuList.map((item, index) => (
                        <NavMenu key={index} ico={item.ico} title={item.title} path={item.path} />
                    ))}
                </div>
                <div className="w-full h-full border-2 rounded-br-lg bg-white p-4">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
