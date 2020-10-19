import React from "react";
import { CalendarContainer, Week, Day } from "./style";
import * as Util from "./Util";
import { CalendarDay, CalendarWeeks, ClickEvent } from "./Types";
import DayHeader from "./DayHeader";
import NavHeader from "./NavHeader";

interface Props {
    value?: Date;
    onChange?: (date: Date) => void;
    showToday?: boolean;
}
export default function Calendar({ value, onChange, showToday }: Props) {
    const [today, _] = React.useState<Date>(new Date());
    const [current, setCurrent] = React.useState<Date>(value || new Date());
    const [calendarWeeks, setCalendarWeeks] = React.useState<CalendarWeeks>();

    React.useEffect(() => {
        const days = Util.getCalendarDays(current);
        const weeks = Util.chunk(days, 7);
        setCalendarWeeks(weeks);
    }, [current]);
    React.useEffect(() => {
        if (!value) return;
        setCurrent(value);
    }, [value]);
    if (!calendarWeeks) return null;

    const handleClick = (date: Date) => (_event: ClickEvent) => {
        if (onChange) onChange(date);
    };

    return (
        <CalendarContainer>
            <NavHeader current={current} setCurrent={setCurrent} />
            <DayHeader />
            {calendarWeeks.map(
                (calendarWeek: Array<CalendarDay>, weekIndex: number) => (
                    <Week key={`${weekIndex}`}>
                        {calendarWeek.map(
                            (calendarDay: CalendarDay, dayIndex: number) => {
                                const selected = Util.sameDay(
                                    value,
                                    calendarDay.date
                                );
                                const outlined = showToday
                                    ? Util.sameDay(calendarDay.date, today)
                                    : false;
                                return (
                                    <Day
                                        key={`${weekIndex}-${dayIndex}`}
                                        currentMonth={calendarDay.currentMonth}
                                        selected={selected}
                                        outlined={outlined}
                                        onClick={handleClick(calendarDay.date)}
                                    >
                                        {calendarDay.date.getDate()}
                                    </Day>
                                );
                            }
                        )}
                    </Week>
                )
            )}
        </CalendarContainer>
    );
}
