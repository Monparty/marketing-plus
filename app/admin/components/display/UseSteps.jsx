import { Steps } from "antd";
import React from "react";

// items: [{ title }]
function UseSteps({ current, items }) {
    return <Steps size="small" titlePlacement="vertical" current={current} items={items} />;
}

export default UseSteps;
