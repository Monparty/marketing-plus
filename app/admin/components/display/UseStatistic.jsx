import { Statistic } from "antd";
import React from "react";

function UseStatistic({ title, value, suffix }) {
    return <Statistic title={title} value={value} suffix={suffix} />;
}

export default UseStatistic;
