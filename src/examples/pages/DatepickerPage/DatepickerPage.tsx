import React from "react";
import { Datepicker, TextField } from "../../../package/dist";

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
            />
        </div>
    );
}
