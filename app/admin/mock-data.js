// ข้อมูลตัวอย่างของระบบหลังบ้าน (ยังไม่มี backend)
// แต่ละหน้าเอาไปตั้งเป็น state เริ่มต้น — การเพิ่ม/แก้/ลบจึงอยู่แค่ในหน้านั้นจนกว่าจะรีเฟรช
// "วันนี้" ของข้อมูลตัวอย่างล็อกไว้เป็นวันที่คงที่ — หน้า admin ถูก prerender ตอน build
// ถ้าใช้วันที่จริง HTML จากเซิร์ฟเวอร์กับในเบราว์เซอร์จะไม่ตรงกัน (hydration error)
import dayjs from "dayjs";

const MOCK_TODAY = "2026-11-11";
const day = (offset) => dayjs(MOCK_TODAY).add(offset, "day").format("YYYY-MM-DD");

export const today = day(0);

export const formatDate = (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "-");
export const formatMoney = (value) => `${Number(value || 0).toLocaleString("th-TH")} บาท`;

// ---------- บุคลากร ----------

export const staffTypeOptions = [
    { value: "fulltime", label: "พนักงานประจำ" },
    { value: "freelance", label: "ฟรีแลนซ์" },
];

export const roleOptions = [
    { value: "สตาฟหน้างาน", label: "สตาฟหน้างาน" },
    { value: "พิธีกร", label: "พิธีกร" },
    { value: "รันคิว", label: "รันคิว" },
    { value: "ช่างภาพ", label: "ช่างภาพ" },
    { value: "สตาฟลงทะเบียน", label: "สตาฟลงทะเบียน" },
    { value: "Project Manager", label: "Project Manager" },
];

export const rateUnitOptions = [
    { value: "day", label: "บาท/วัน" },
    { value: "hour", label: "บาท/ชั่วโมง" },
];

export const bankOptions = ["กสิกรไทย", "ไทยพาณิชย์", "กรุงเทพ", "กรุงไทย", "กรุงศรีอยุธยา", "ทหารไทยธนชาต"].map((b) => ({
    value: b,
    label: b,
}));

export const staffList = [
    {
        id: 1,
        firstName: "ธนพล",
        lastName: "ศรีสุข",
        nickname: "ต้น",
        phone: "081-234-5678",
        lineId: "ton.pm",
        type: "fulltime",
        roles: ["Project Manager"],
        rate: 0,
        rateUnit: "day",
        bankName: "กสิกรไทย",
        bankAccount: "123-4-56789-0",
        note: "PM หลัก ดูแลงานเปิดตัวโครงการ",
    },
    {
        id: 2,
        firstName: "พิมพ์ชนก",
        lastName: "วงศ์ใหญ่",
        nickname: "แพร",
        phone: "089-111-2233",
        lineId: "prae.pm",
        type: "fulltime",
        roles: ["Project Manager", "รันคิว"],
        rate: 0,
        rateUnit: "day",
        bankName: "ไทยพาณิชย์",
        bankAccount: "234-5-67890-1",
        note: "",
    },
    {
        id: 3,
        firstName: "กิตติพัฒน์",
        lastName: "มณีรัตน์",
        nickname: "บอส",
        phone: "086-555-7788",
        lineId: "boss.mc",
        type: "freelance",
        roles: ["พิธีกร"],
        rate: 3500,
        rateUnit: "day",
        bankName: "กรุงเทพ",
        bankAccount: "345-6-78901-2",
        note: "พูดเก่ง ตรงต่อเวลา",
    },
    {
        id: 4,
        firstName: "ณัฐธิดา",
        lastName: "แก้วประเสริฐ",
        nickname: "มิ้นท์",
        phone: "092-333-4455",
        lineId: "mint.nt",
        type: "freelance",
        roles: ["สตาฟลงทะเบียน", "สตาฟหน้างาน"],
        rate: 800,
        rateUnit: "day",
        bankName: "กรุงไทย",
        bankAccount: "456-7-89012-3",
        note: "ขยัน",
    },
    {
        id: 5,
        firstName: "วรากร",
        lastName: "ทองดี",
        nickname: "เจ",
        phone: "095-666-7788",
        lineId: "j.photo",
        type: "freelance",
        roles: ["ช่างภาพ"],
        rate: 600,
        rateUnit: "hour",
        bankName: "กสิกรไทย",
        bankAccount: "567-8-90123-4",
        note: "มีกล้องและเลนส์เอง",
    },
    {
        id: 6,
        firstName: "ศุภชัย",
        lastName: "บุญมา",
        nickname: "เบียร์",
        phone: "083-777-8899",
        lineId: "beer.staff",
        type: "freelance",
        roles: ["สตาฟหน้างาน"],
        rate: 700,
        rateUnit: "day",
        bankName: "กรุงศรีอยุธยา",
        bankAccount: "678-9-01234-5",
        note: "มาสายบ้าง",
    },
    {
        id: 7,
        firstName: "อรอุมา",
        lastName: "จันทร์เพ็ญ",
        nickname: "ฝน",
        phone: "087-888-9900",
        lineId: "fon.cue",
        type: "freelance",
        roles: ["รันคิว", "สตาฟหน้างาน"],
        rate: 1200,
        rateUnit: "day",
        bankName: "ทหารไทยธนชาต",
        bankAccount: "789-0-12345-6",
        note: "",
    },
];

export const staffName = (id) => {
    const s = staffList.find((x) => x.id === id);
    return s ? `${s.firstName} ${s.lastName} (${s.nickname})` : "-";
};

// ---------- โปรเจกต์ ----------

export const projectStatusOptions = [
    { value: "brief", label: "บรีฟงาน", color: "default" },
    { value: "planning", label: "ออกแบบ/วางแผน", color: "blue" },
    { value: "preparing", label: "เตรียมอุปกรณ์/ทีมงาน", color: "gold" },
    { value: "onsite", label: "หน้างานจริง", color: "red" },
    { value: "done", label: "ส่งมอบงานเสร็จสิ้น", color: "green" },
];

export const projects = [
    {
        id: 1,
        name: "งานเปิดตัวโครงการ The Garden Ville",
        client: "บริษัท การ์เด้น พร็อพเพอร์ตี้ จำกัด",
        venue: "Sales Gallery The Garden Ville บางนา",
        pmId: 1,
        prepDate: day(-3),
        eventDate: day(0),
        teardownDate: day(1),
        status: "onsite",
        tasks: [
            { id: 1, title: "สั่งทำ Backdrop", done: true },
            { id: 2, title: "ประสานงานบูทอาหาร", done: true },
            { id: 3, title: "ขออนุญาตนิติบุคคลหมู่บ้าน", done: true },
            { id: 4, title: "ซ้อมคิวพิธีกร", done: false },
        ],
    },
    {
        id: 2,
        name: "Family Day หมู่บ้านพฤกษา",
        client: "นิติบุคคลหมู่บ้านพฤกษา 12",
        venue: "สโมสรหมู่บ้านพฤกษา 12",
        pmId: 2,
        prepDate: day(-1),
        eventDate: day(0),
        teardownDate: day(0),
        status: "onsite",
        tasks: [
            { id: 1, title: "จองเครื่องเล่นเด็ก", done: true },
            { id: 2, title: "ประสานงานบูทอาหาร", done: false },
        ],
    },
    {
        id: 3,
        name: "Open House คอนโด Skyline",
        client: "บริษัท สกายไลน์ เรสซิเดนซ์ จำกัด",
        venue: "Skyline Condo พระราม 9",
        pmId: 1,
        prepDate: day(5),
        eventDate: day(9),
        teardownDate: day(10),
        status: "preparing",
        tasks: [
            { id: 1, title: "สั่งทำ Backdrop", done: true },
            { id: 2, title: "จองเครื่องเสียง", done: false },
            { id: 3, title: "หาช่างภาพ", done: false },
        ],
    },
    {
        id: 4,
        name: "งานลอยกระทงโครงการบ้านสวน",
        client: "บริษัท บ้านสวน ดีเวลลอปเม้นท์ จำกัด",
        venue: "สวนกลางโครงการบ้านสวน รังสิต",
        pmId: 2,
        prepDate: day(14),
        eventDate: day(18),
        teardownDate: day(19),
        status: "planning",
        tasks: [{ id: 1, title: "ออกแบบเวที", done: false }],
    },
    {
        id: 5,
        name: "สัมมนาลูกบ้านโครงการ Lake View",
        client: "บริษัท เลควิว แลนด์ จำกัด",
        venue: "โรงแรมเซ็นทารา แจ้งวัฒนะ",
        pmId: 1,
        prepDate: day(30),
        eventDate: day(35),
        teardownDate: day(35),
        status: "brief",
        tasks: [],
    },
    {
        id: 6,
        name: "งานเปิดตัว Sales Gallery Nova Town",
        client: "บริษัท โนวา ทาวน์ จำกัด",
        venue: "Nova Town ราชพฤกษ์",
        pmId: 2,
        prepDate: day(-12),
        eventDate: day(-8),
        teardownDate: day(-7),
        status: "done",
        tasks: [
            { id: 1, title: "สั่งทำ Backdrop", done: true },
            { id: 2, title: "ขออนุญาตนิติบุคคลหมู่บ้าน", done: true },
        ],
    },
];

export const projectName = (id) => projects.find((p) => p.id === id)?.name ?? "-";

// ---------- จองฟรีแลนซ์ ----------

export const bookingStatusOptions = [
    { value: "pending", label: "รอดำเนินการ", color: "gold" },
    { value: "confirmed", label: "ยืนยันแล้ว", color: "green" },
    { value: "cancelled", label: "ยกเลิก", color: "red" },
];

export const shiftOptions = [
    { value: "06:00-12:00", label: "เช้า 06:00-12:00" },
    { value: "12:00-18:00", label: "บ่าย 12:00-18:00" },
    { value: "08:00-17:00", label: "เต็มวัน 08:00-17:00" },
    { value: "17:00-22:00", label: "เย็น 17:00-22:00" },
];

export const staffBookings = [
    { id: 1, staffId: 3, projectId: 1, startDate: day(0), endDate: day(0), shift: "08:00-17:00", status: "confirmed", note: "ใส่สูทสีกรม" },
    { id: 2, staffId: 4, projectId: 1, startDate: day(0), endDate: day(0), shift: "06:00-12:00", status: "confirmed", note: "ประจำโต๊ะลงทะเบียน" },
    { id: 3, staffId: 5, projectId: 1, startDate: day(0), endDate: day(0), shift: "08:00-17:00", status: "confirmed", note: "" },
    { id: 4, staffId: 6, projectId: 2, startDate: day(0), endDate: day(0), shift: "08:00-17:00", status: "pending", note: "เสื้อโปโลสีขาว" },
    { id: 5, staffId: 7, projectId: 3, startDate: day(9), endDate: day(9), shift: "08:00-17:00", status: "pending", note: "รันคิวเวที" },
    { id: 6, staffId: 3, projectId: 3, startDate: day(9), endDate: day(9), shift: "12:00-18:00", status: "pending", note: "" },
    { id: 7, staffId: 4, projectId: 4, startDate: day(18), endDate: day(18), shift: "17:00-22:00", status: "cancelled", note: "ติดธุระ" },
];

// ---------- อุปกรณ์ ----------

export const equipmentCategoryOptions = [
    { value: "structure", label: "โครงสร้าง" },
    { value: "light-sound", label: "แสงสีเสียง" },
    { value: "furniture", label: "เฟอร์นิเจอร์" },
    { value: "other", label: "อื่น ๆ" },
];

export const equipmentStatusOptions = [
    { value: "available", label: "พร้อมใช้งาน", color: "green" },
    { value: "in-use", label: "กำลังใช้งานนอกสถานที่", color: "blue" },
    { value: "maintenance", label: "ส่งซ่อม", color: "red" },
];

export const equipment = [
    { id: 1, code: "ST-001", name: "โครงทรัส 3 เมตร", category: "structure", total: 20, status: "in-use" },
    { id: 2, code: "ST-002", name: "เวทีสำเร็จรูป 1.2x2.4 ม.", category: "structure", total: 12, status: "available" },
    { id: 3, code: "LS-001", name: "ลำโพง JBL PRX815", category: "light-sound", total: 6, status: "in-use" },
    { id: 4, code: "LS-002", name: "ไมค์ลอย Shure", category: "light-sound", total: 8, status: "available" },
    { id: 5, code: "LS-003", name: "ไฟพาร์ LED", category: "light-sound", total: 16, status: "maintenance" },
    { id: 6, code: "FN-001", name: "เก้าอี้เบาะผ้า", category: "furniture", total: 200, status: "in-use" },
    { id: 7, code: "FN-002", name: "โต๊ะพับ 180 ซม.", category: "furniture", total: 40, status: "available" },
    { id: 8, code: "OT-001", name: "เต็นท์ 4x4 ม.", category: "other", total: 10, status: "available" },
];

export const equipmentName = (id) => {
    const e = equipment.find((x) => x.id === id);
    return e ? `${e.code} ${e.name}` : "-";
};

// endDate = วันกำหนดคืน
export const equipmentBookings = [
    { id: 1, equipmentId: 1, projectId: 1, quantity: 10, startDate: day(-3), endDate: day(1) },
    { id: 2, equipmentId: 3, projectId: 1, quantity: 4, startDate: day(-1), endDate: day(1) },
    { id: 3, equipmentId: 6, projectId: 2, quantity: 120, startDate: day(-1), endDate: day(0) },
    { id: 4, equipmentId: 2, projectId: 3, quantity: 6, startDate: day(5), endDate: day(10) },
    { id: 5, equipmentId: 4, projectId: 3, quantity: 4, startDate: day(5), endDate: day(10) },
];

export const maintenanceLogs = [
    { id: 1, equipmentId: 5, date: day(-2), issue: "หลอด LED เสีย 3 ดวง", cost: 4500 },
    { id: 2, equipmentId: 3, date: day(-40), issue: "ดอกลำโพงขาด", cost: 7800 },
    { id: 3, equipmentId: 1, date: day(-90), issue: "ข้อต่อหลวม เชื่อมใหม่", cost: 1200 },
];

// ---------- บัญชีและการเงิน ----------

export const paymentStatusOptions = [
    { value: "unpaid", label: "ยังไม่จ่าย", color: "red" },
    { value: "deposit", label: "มัดจำแล้ว", color: "gold" },
    { value: "paid", label: "จ่ายครบแล้ว", color: "green" },
];

export const expenseCategoryOptions = [
    { value: "equipment", label: "ค่าอุปกรณ์" },
    { value: "freelance", label: "ค่าจ้างฟรีแลนซ์" },
    { value: "travel", label: "ค่าเดินทาง" },
    { value: "food", label: "ค่าอาหาร" },
    { value: "other", label: "อื่น ๆ" },
];

export const invoices = [
    { id: 1, number: "INV-2026-001", projectId: 6, amount: 450000, status: "paid", issueDate: day(-20), dueDate: day(-5), taxInvoiceIssued: true, withholdingTax: true },
    { id: 2, number: "INV-2026-002", projectId: 1, amount: 680000, status: "deposit", issueDate: day(-15), dueDate: day(7), taxInvoiceIssued: false, withholdingTax: true },
    { id: 3, number: "INV-2026-003", projectId: 2, amount: 120000, status: "unpaid", issueDate: day(-10), dueDate: day(-1), taxInvoiceIssued: false, withholdingTax: false },
    { id: 4, number: "INV-2026-004", projectId: 3, amount: 350000, status: "unpaid", issueDate: day(-3), dueDate: day(20), taxInvoiceIssued: false, withholdingTax: false },
];

export const expenses = [
    { id: 1, projectId: 6, category: "equipment", description: "ค่าเช่าจอ LED", amount: 85000, date: day(-9) },
    { id: 2, projectId: 6, category: "freelance", description: "ค่าจ้างพิธีกรและสตาฟ", amount: 42000, date: day(-8) },
    { id: 3, projectId: 6, category: "food", description: "อาหารทีมงาน", amount: 9500, date: day(-8) },
    { id: 4, projectId: 1, category: "equipment", description: "Backdrop และป้าย", amount: 65000, date: day(-4) },
    { id: 5, projectId: 1, category: "freelance", description: "ค่าจ้างฟรีแลนซ์", amount: 28000, date: day(0) },
    { id: 6, projectId: 1, category: "travel", description: "ค่ารถขนของ", amount: 12000, date: day(-3) },
    { id: 7, projectId: 2, category: "food", description: "อาหารว่างสตาฟ", amount: 4500, date: day(0) },
];

// เป้ารายได้ (บาท)
export const revenueTarget = { month: 1500000, year: 15000000 };

// ---------- ปฏิทินโปรเจกต์ ----------
// ตั้งต้นจากข้อมูลหน้าอื่น: ช่วงวันที่จาก projects, ผู้ดูแล = PM (personnel),
// staff = คนที่จองไว้ในหน้า staff, อุปกรณ์ = ที่จองไว้ในหน้า equipment
export const calendarProjects = projects.map((p) => ({
    id: p.id,
    name: p.name,
    startDate: p.prepDate,
    endDate: p.teardownDate,
    managerIds: [p.pmId],
    staffIds: [...new Set(staffBookings.filter((b) => b.projectId === p.id && b.status !== "cancelled").map((b) => b.staffId))],
    equipment: equipmentBookings
        .filter((b) => b.projectId === p.id)
        .map((b) => ({ equipmentId: b.equipmentId, quantity: b.quantity })),
}));
