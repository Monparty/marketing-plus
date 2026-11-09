"use client";
import React from "react";
import InputText from "./components/inputs/InputText";
import UseButton from "./components/inputs/UseButton";
import Link from "next/link";

function Page() {
    return (
        <div className="flex h-dvh">
            <div className="bg-amber-100 flex-2"></div>
            <div className="bg-amber-200 flex-1 flex justify-center items-center">
                <div className="border p-4 grid gap-4 bg-white rounded-lg">
                    <h2 className="text-lg font-semibold">เข้าสู่ระบบ Marketing Plus</h2>
                    <InputText label="Username" />
                    <InputText label="Password" />
                    <Link href="/admin/dashboard">
                        <UseButton label="เข้าสู่ระบบ" type="primary" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
