"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import stageImage from "@/public/assets/img4.jpg";
import UseConfigProvider from "./components/UseConfigProvider";
import UseForm from "./components/inputs/UseForm";
import UseFormItem from "./components/inputs/UseFormItem";
import UseInput from "./components/inputs/UseInput";
import UseInputPassword from "./components/inputs/UseInputPassword";
import UseButton from "./components/inputs/UseButton";

// สีตาม DESIGN.md: ปุ่มหลักสีทอง ตัวอักษรกรมท่า, กรอบตอนโฟกัสสีน้ำเงิน, ช่องกรอกสูง 48px มุม 6px
const loginTheme = {
    token: {
        colorPrimary: "#2f5da8",
        borderRadius: 6,
        borderRadiusLG: 6,
        controlHeightLG: 48,
        fontFamily: 'var(--font-noto-thai), "Noto Sans Thai", sans-serif',
    },
    components: {
        Button: {
            colorPrimary: "#f0c85a",
            colorPrimaryHover: "#e8bb3f",
            colorPrimaryActive: "#e8bb3f",
            primaryColor: "#33456f",
            primaryShadow: "none",
            fontWeight: 500,
        },
    },
};

const modules = ["โปรเจกต์", "ทีมงาน", "อุปกรณ์", "การเงิน"];

function Page() {
    const router = useRouter();

    return (
        <div className="min-h-dvh lg:grid lg:grid-cols-[1.15fr_1fr]">
            {/* ฝั่งภาพ: งานจริงของทีม ใต้ม่านสีกรมท่า */}
            <section className="relative isolate flex min-h-80 flex-col justify-between gap-10 overflow-hidden bg-dark-page p-6 text-white sm:min-h-96 lg:min-h-dvh lg:p-12">
                <Image
                    src={stageImage}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="-z-10 object-cover motion-safe:animate-in motion-safe:zoom-in-110 motion-safe:duration-[2400ms]"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-dark-page via-dark-page/75 to-dark-page/55" />

                <Logo variant="white" className="h-7 w-auto" priority />

                <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
                    <p className="text-sm font-medium tracking-[0.12em] text-on-navy">
                        <span className="text-brand-accent">+</span> BACK OFFICE
                    </p>
                    <h1 className="mt-3 font-head text-4xl font-light leading-[1.2] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                        ทุกงานอีเวนต์
                        <br />
                        เริ่มที่<span className="text-brand-accent">หลังเวที</span>
                    </h1>
                    <p className="mt-4 hidden max-w-md font-serif text-[17px] leading-[1.7] text-on-navy sm:block">
                        ระบบหลังบ้านของทีม Marketing Plus วางแผนโปรเจกต์ จัดคิวทีมงาน คุมอุปกรณ์ และดูตัวเลขการเงิน
                        ได้ในที่เดียว
                    </p>
                </div>

                <ul className="hidden gap-6 text-sm text-on-navy lg:flex">
                    {modules.map((m) => (
                        <li key={m}>
                            <span className="text-brand-accent">+</span> {m}
                        </li>
                    ))}
                </ul>
            </section>

            {/* ฝั่งฟอร์ม */}
            <main className="flex items-center justify-center bg-surface px-5 py-10 lg:px-12">
                <div className="w-full max-w-[420px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700 motion-safe:delay-150 motion-safe:fill-mode-both">
                    <div className="rounded-[19px] border border-line bg-white p-7 shadow-[8px_3px_8px_rgba(0,0,0,0.1)] sm:p-9">
                        <p className="text-sm font-medium tracking-[0.04em] text-ink-muted">
                            <span className="text-brand-accent">+</span> เข้าสู่ระบบ
                        </p>
                        <h2 className="mt-2 font-head text-[30px] font-light leading-[1.3] tracking-[-0.02em] text-brand-navy">
                            ยินดีต้อนรับกลับ
                        </h2>
                        <p className="mb-7 mt-1 font-serif text-base leading-[1.7] text-ink-muted">
                            กรอกชื่อผู้ใช้และรหัสผ่านของคุณ
                        </p>

                        <p className="mb-7 mt-1 font-serif text-base leading-[1.7] text-black border p-2 rounded-lg bg-amber-200 text-center">
                            ตอนนี้เป็นระบบทดสอบ<br />ใส่ระหัสอะไรก็ได้ครับ แล้วกดเข้าสู่ระบบ
                        </p>

                        <UseConfigProvider theme={loginTheme}>
                            <UseForm onFinish={() => router.push("/admin/dashboard")}>
                                <UseFormItem name="username" label="ชื่อผู้ใช้" required>
                                    <UseInput placeholder="เช่น ton.pm" />
                                </UseFormItem>
                                <UseFormItem name="password" label="รหัสผ่าน" required>
                                    <UseInputPassword placeholder="รหัสผ่าน" />
                                </UseFormItem>
                                <div className="pt-2">
                                    <UseButton label="เข้าสู่ระบบ" type="primary" htmlType="submit" block />
                                </div>
                            </UseForm>
                        </UseConfigProvider>
                    </div>
                    <p className="mt-6 text-center text-[13px] text-ink-faint">สำหรับทีมงาน Marketing Plus เท่านั้น</p>
                </div>
            </main>
        </div>
    );
}

export default Page;
