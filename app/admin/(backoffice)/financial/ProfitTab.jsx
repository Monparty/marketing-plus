import UseTable from "@/app/admin/components/display/UseTable";
import { formatMoney, projects } from "@/app/admin/mock-data";

const sum = (list) => list.reduce((total, x) => total + (x.amount || 0), 0);

function ProfitTab({ invoices, expenses }) {
    const rows = projects.map((p) => {
        const revenue = sum(invoices.filter((x) => x.projectId === p.id));
        const cost = sum(expenses.filter((x) => x.projectId === p.id));
        return { id: p.id, name: p.name, revenue, cost, profit: revenue - cost };
    });

    const columns = [
        { title: "โปรเจกต์", dataIndex: "name" },
        { title: "รายรับ", dataIndex: "revenue", align: "right", render: (v) => formatMoney(v) },
        { title: "ต้นทุนรวม", dataIndex: "cost", align: "right", render: (v) => formatMoney(v) },
        {
            title: "กำไร",
            dataIndex: "profit",
            align: "right",
            render: (v) => (
                <span className={v < 0 ? "text-red-600" : v > 0 ? "text-green-600" : ""}>{formatMoney(v)}</span>
            ),
        },
        {
            title: "% กำไร",
            align: "right",
            render: (_, r) => (r.revenue ? `${((r.profit / r.revenue) * 100).toFixed(1)}%` : "-"),
        },
    ];

    return <UseTable columns={columns} dataSource={rows} />;
}

export default ProfitTab;
