import React from "react";
import { Calendar } from "../../../package";
import Example from "../../Example/Example";

function CalendarPage() {
    const [date, setDate] = React.useState(new Date());
    const handleDate = (date: Date) => setDate(date);

    return (
        <div>
            <h1>Calendar Component</h1>
            <h2>Calendar</h2>
            <p>
                For internal use for the Datepicker component. External use is a
                Work-In-Progress
            </p>
            <Example>
                <Calendar value={date} onChange={handleDate} showToday />
            </Example>
        </div>
    );
}
CalendarPage.pageName = "Calendar";
export default CalendarPage;
