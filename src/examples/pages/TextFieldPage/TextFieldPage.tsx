import React, { useState } from "react";
import { TextField } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function TextFieldPage() {
    const [text, setText] = useState("Tim");

    return (
        <div>
            <h1>TextField Component</h1>
            <TextField
                className={"custom class"}
                value={text}
                onChange={setText}
                label={"label"}
            />
            <TextField
                value={""}
                placeholder={"placeholder text"}
                error={"error text"}
            />
            <TextField disabled placeholder={"placeholder"} />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
