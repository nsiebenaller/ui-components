import React from "react";
import { Select } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function SelectPage() {
    return (
        <div>
            <h1>Select Component</h1>
            <Select label={"Label"} value={"2 selected"} error={"error text"}>
                <div>children content here!</div>
            </Select>
            <Select
                label={"Select statuses"}
                value={""}
                placholder={"temp"}
                error={"disabled"}
                disabled
            >
                <div>Option 1</div>
                <div>Option 2</div>
                <div>Option 3</div>
            </Select>
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
