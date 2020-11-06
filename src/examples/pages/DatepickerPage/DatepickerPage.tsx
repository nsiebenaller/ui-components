import React from "react";
import { Datepicker, Timestamp, Dropdown } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

const t = new Timestamp("11/6/2020 8:00 AM");
function DatepickerPage() {
    const [date, _setDate] = React.useState<Date | null>(t.toDate());
    const setDate = (e: Date | null) => {
        _setDate(e);
    };

    return (
        <div>
            <h1>Datepicker Component</h1>
            <h2>Basic Datepicker</h2>
            <Datepicker
                value={date || undefined}
                onChange={(d) => setDate(d)}
                includeTime
            />
            <Datepicker label={"Current Date"} value={new Date()} />
            <br />
            <h2>TimeZone</h2>
            <Datepicker
                label={"Current Timezone"}
                value={date || undefined}
                onChange={(d) => setDate(d)}
                includeTime
                includeSec
                showTimeHelper
            />
            <Datepicker
                label={"America/New_York"}
                value={date || undefined}
                timeZone={"America/New_York"}
                onChange={(d) => setDate(d)}
                includeTime
                includeSec
                showTimeHelper
            />
            <br />
            <h2>Disabled Datepicker</h2>
            <Datepicker
                label={"Disabled Datepicker"}
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
