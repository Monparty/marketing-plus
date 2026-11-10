import { Form } from "antd";
import React from "react";

function UseForm({ initialValues, onFinish, children }) {
    return (
        <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
            {children}
        </Form>
    );
}

export default UseForm;
