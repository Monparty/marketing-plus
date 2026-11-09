import { Button } from "antd";
import React from "react";

function UseButton({ label, type, onClick }) {
    return (
        <Button size="large" type={type} onClick={onClick}>
            {label}
        </Button>
    );
}

export default UseButton;
