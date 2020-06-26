import React from "react";
import { Datepicker } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function DatepickerPage() {
    return (
        <div>
            <h1>Datepicker Component</h1>
            <Datepicker includeTime />
            <Datepicker label={"Current Date"} value={new Date()} />
            <Datepicker
                label={"Current DateTime"}
                value={new Date()}
                includeTime
                disabled
            />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
