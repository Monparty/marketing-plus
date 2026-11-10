import { Tag } from "antd";
import React from "react";

function UseTag({ color, label }) {
    return <Tag color={color}>{label}</Tag>;
}

export default UseTag;
