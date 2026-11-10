"use client";
import UseCard from "@/app/admin/components/display/UseCard";
import UseStatistic from "@/app/admin/components/display/UseStatistic";
import UseTabs from "@/app/admin/components/display/UseTabs";
import { expenses, invoices } from "@/app/admin/mock-data";
import { useState } from "react";
import ExpenseTab from "./ExpenseTab";
import InvoiceTab from "./InvoiceTab";
import ProfitTab from "./ProfitTab";

const sum = (list) => list.reduce((total, x) => total + (x.amount || 0), 0);

function Page() {
    const [invoiceList, setInvoiceList] = useState(invoices);
    const [expenseList, setExpenseList] = useState(expenses);

    const revenue = sum(invoiceList);
    const cost = sum(expenseList);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">ระบบบัญชีและการเงิน</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <UseCard>
                    <UseStatistic title="รายรับรวม" value={revenue} suffix="บาท" />
                </UseCard>
                <UseCard>
                    <UseStatistic title="รายจ่ายรวม" value={cost} suffix="บาท" />
                </UseCard>
                <UseCard>
                    <UseStatistic title="กำไรสุทธิ" value={revenue - cost} suffix="บาท" />
                </UseCard>
            </div>

            <UseTabs
                items={[
                    {
                        key: "invoices",
                        label: "รายรับ (ใบเสนอราคา/ใบแจ้งหนี้)",
                        children: <InvoiceTab invoices={invoiceList} setInvoices={setInvoiceList} />,
                    },
                    {
                        key: "expenses",
                        label: "รายจ่าย",
                        children: <ExpenseTab expenses={expenseList} setExpenses={setExpenseList} />,
                    },
                    {
                        key: "profit",
                        label: "กำไรต่อโปรเจกต์ (P&L)",
                        children: <ProfitTab invoices={invoiceList} expenses={expenseList} />,
                    },
                ]}
            />
        </div>
    );
}

export default Page;
