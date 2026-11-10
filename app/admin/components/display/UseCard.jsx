import { Card } from "antd";
import React from "react";

function UseCard({ title, children }) {
    return <Card title={title}>{children}</Card>;
}

export default UseCard;
