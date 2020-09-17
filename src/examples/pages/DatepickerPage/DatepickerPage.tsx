import React from "react";
import { Datepicker, Dropdown } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function DatepickerPage() {
    return (
        <div>
            <h1>Datepicker Component</h1>
            <Datepicker includeTime />
            <Datepicker label={"Current Date"} value={new Date()} />
            <Datepicker
                label={"Current Date Time+sec"}
                value={new Date()}
                includeTime
                includeSec
            />
            <Datepicker
                label={"Current DateTime"}
                value={new Date()}
                includeTime
                disabled
            />
            <Datepicker
                label={"Default hour for calendar"}
                defaultHour={17}
                includeTime
            />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
DatepickerPage.pageName = "Datepicker";
export default DatepickerPage;
