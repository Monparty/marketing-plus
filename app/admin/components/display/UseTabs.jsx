import { Tabs } from "antd";
import React from "react";

// items: [{ key, label, children }]
function UseTabs({ items }) {
    return <Tabs items={items} />;
}

export default UseTabs;
