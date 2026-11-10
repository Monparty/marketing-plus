import { Alert } from "antd";
import React from "react";

function UseAlert({ type, title }) {
    return <Alert type={type} title={title} showIcon />;
}

export default UseAlert;
