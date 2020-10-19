import React, { useState } from "react";
import { Dropdown } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

const options = [
    {
        value: "Option 1",
        label: "Option 1",
    },
    {
        value: "Option 2",
        label: "Option 2",
    },
    {
        value: "Option 3",
        label: "Option 3",
    },
    {
        value: "Option 11",
        label: "Option 11",
    },
    {
        value: "Option 21",
        label: "Option 21",
    },
    {
        value: "Option 31",
        label: "Option 31",
    },
    {
        value: "Option 12",
        label: "Option 12",
    },
    {
        value: "Option 22",
        label: "Option 22",
    },
    {
        value: "Option 32",
        label: "Option 32",
    },
];

function DropdownPage() {
    const [selected, setSelected] = useState(undefined);
    const [disabled, setDisabled] = useState(false);

    return (
        <div>
            <h1>Dropdown Component</h1>
            <Dropdown
                label={"dropdown with placeholder"}
                options={options}
                selected={selected}
                onChange={(e: any) => setSelected(e)}
                placeholder={"I am a placeholder"}
                fullWidth
                disabled={disabled}
            />
            <button onClick={() => setDisabled(!disabled)}>disable</button>
            <br />
            <Dropdown
                topPad
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
            />
            <Dropdown
                label={"dropdown label"}
                botPad
                options={["Option 1", "Option 2", "Option 3"]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
                disabled
            />
            <Dropdown
                label={"No Wrap"}
                error={"error"}
                options={[
                    "Option 1",
                    "Very Long option name that will be too long for one line",
                    "Option 3",
                ]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
                noWrap
            />
            <br />
            <h4>No Options Text</h4>
            <Dropdown label={"Default No options"} options={[]} botPad />
            <Dropdown
                noOptionsText={"No Options!"}
                label={"Custom No options"}
                options={[]}
                botPad
            />
            <Documentation title={"Properties"} properties={properties} />
            <Documentation
                title={"Implied Properties"}
                properties={impliedProperties}
            />
        </div>
    );
}
DropdownPage.pageName = "Dropdown";
export default DropdownPage;
