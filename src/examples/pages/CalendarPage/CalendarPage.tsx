import React from "react";
import { Calendar } from "../../../package";

function CalendarPage() {
    const [date, setDate] = React.useState(new Date());
    const handleDate = (date: Date) => setDate(date);

    return (
        <div>
            <h1>Calendar Component</h1>
            <Calendar value={date} onChange={handleDate} showToday />
        </div>
    );
}
CalendarPage.pageName = "Calendar";
export default CalendarPage;
