import { Table } from "antd";
import React from "react";

// ทุกแถวต้องมี field "id"
function UseTable({ columns, dataSource }) {
    return <Table rowKey="id" columns={columns} dataSource={dataSource} scroll={{ x: "max-content" }} />;
}

export default UseTable;
