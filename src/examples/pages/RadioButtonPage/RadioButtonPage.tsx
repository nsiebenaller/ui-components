import React, { useState } from "react";
import { RadioButton } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function RadioButtonPage() {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(true);
    return (
        <div>
            <h1>RadioButton Component</h1>
            <RadioButton
                value={first}
                onChange={setFirst}
                label={"Is this a radio button?"}
            />
            <RadioButton
                value={second}
                onChange={setSecond}
                label={"Am I colored differently?"}
                color={"blue-500"}
            />
            <RadioButton
                value={third}
                onChange={setThird}
                label={"Am I selected by default?"}
            />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
