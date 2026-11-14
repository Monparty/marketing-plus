import { Calendar } from "antd";
import React from "react";

// ส่งวันที่เป็นสตริง "YYYY-MM-DD" ให้หน้าที่ใช้ เหมือน UseDatePicker
// dateCellRender(date, isToday): วาดทั้งช่องของวันเอง (fullCellRender) แถบที่อยู่ติดกันจึงต่อเป็นเส้นเดียวข้ามวันได้
// onSelectDate: กดเลือกวัน (ไม่นับการเปลี่ยนเดือน/ปี)
function UseCalendar({ dateCellRender, onSelectDate }) {
    return (
        <Calendar
            fullCellRender={(date, info) =>
                info.type === "date"
                    ? dateCellRender(date.format("YYYY-MM-DD"), date.isSame(info.today, "day"))
                    : info.originNode
            }
            onSelect={(date, info) => info.source === "date" && onSelectDate(date.format("YYYY-MM-DD"))}
        />
    );
}

export default UseCalendar;
