import React, { useState } from "react";
import { Checkbox } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function RadioButtonPage() {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(true);
    return (
        <div>
            <h1>Checkbox Component</h1>
            <Checkbox
                value={first}
                onChange={setFirst}
                label={"Is this a radio button?"}
            />
            <Checkbox
                value={second}
                onChange={setSecond}
                label={"Am I colored differently?"}
                color={"blue-500"}
            />
            <Checkbox
                value={third}
                onChange={setThird}
                label={"Am I selected by default?"}
            />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
RadioButtonPage.pageName = "Checkbox";
export default RadioButtonPage;
