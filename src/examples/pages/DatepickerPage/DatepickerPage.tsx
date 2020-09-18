import React from "react";
import { Datepicker } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function DatepickerPage() {
    const [date, setDate] = React.useState<Date | null>(null);

    return (
        <div>
            <h1>Datepicker Component</h1>
            <Datepicker
                value={date || undefined}
                onChange={(d) => setDate(d)}
                includeTime
            />
            <Datepicker label={"Current Date"} value={new Date()} />
            <br />
            <Datepicker
                label={"Current Date Time+sec"}
                value={new Date()}
                includeTime
                includeSec
            />
            <br />
            <Datepicker
                label={"Current DateTime"}
                value={new Date()}
                includeTime
                disabled
            />
            <br />
            <Datepicker
                label={"Default hour for calendar"}
                defaultHour={17}
                includeTime
            />
            <br />
            <Datepicker
                label={"Show time helper"}
                defaultHour={17}
                includeTime
                showTimeHelper
            />
            <br />
            <Datepicker
                label={"Show time helper w/ secs"}
                defaultHour={17}
                includeTime
                includeSec
                showTimeHelper
            />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
DatepickerPage.pageName = "Datepicker";
export default DatepickerPage;
