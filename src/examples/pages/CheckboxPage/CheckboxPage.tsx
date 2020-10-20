import React, { useState } from "react";
import { Checkbox } from "../../../package/dist";
import { properties, codeSample1 } from "./doc";
import Documentation from "../../Documentation/Documentation";
import Example from "../../Example/Example";
import Code from "../../Code/Code";

function RadioButtonPage() {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(true);
    return (
        <div>
            <h1>Checkbox Component</h1>
            <h2>Basic Checkbox</h2>
            <p>
                Checkboxes are GUI widgets that permit the user to make a binary
                choice, i.e. a choice between one of two possible mutually
                exclusive options.
            </p>
            <Example>
                <Checkbox
                    value={first}
                    onChange={setFirst}
                    label={"Is this a radio button?"}
                />
            </Example>
            <Code text={codeSample1} />
            <h2>Colored Checkbox</h2>
            <p>This component can be colored when selected and hovered.</p>
            <Example>
                <Checkbox
                    value={second}
                    onChange={setSecond}
                    label={"Am I colored differently?"}
                    color={"blue-500"}
                />
            </Example>
            <h2>Default Checkbox</h2>
            <p>This component can be configured to be selected by default.</p>
            <Example>
                <Checkbox
                    value={third}
                    onChange={setThird}
                    label={"Am I selected by default?"}
                />
            </Example>
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
RadioButtonPage.pageName = "Checkbox";
export default RadioButtonPage;
