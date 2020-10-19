import { CalendarDay } from "./Types";

export function chunk(
    arr: Array<CalendarDay>,
    size: number
): Array<Array<CalendarDay>> {
    var chunks = new Array<Array<CalendarDay>>();
    for (var i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        chunks.push(chunk);
    }
    return chunks;
}

export function getCalendarDays(date: Date): Array<CalendarDay> {
    const days = fetchMonth(date).map((d) => toCalendarDay(d, true));
    const start = getMonthStart(date).map((d) => toCalendarDay(d, false));
    const end = getMonthEnd(date).map((d) => toCalendarDay(d, false));
    return start.concat(days).concat(end);
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export function getMonthName(date: Date): string {
    return monthNames[date.getMonth()];
}

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export function getDayName(date: Date): string {
    return daysOfWeek[date.getDay()];
}

export function modifyDays(date: Date, days: number): Date {
    const [y, m, d] = splitDate(date);
    return new Date(y, m, d + days);
}

export function modifyMonths(date: Date, months: number): Date {
    const [y, m, d] = splitDate(date);
    return new Date(y, m + months, d);
}

export function modifyYears(date: Date, years: number): Date {
    const [y, m, d] = splitDate(date);
    return new Date(y + years, m, d);
}

export function splitDate(date: Date): [number, number, number] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return [year, month, day];
}

export function getFirstOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function getLastOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function daysInMonth(date: Date): number {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
}

export function fetchMonth(date: Date): Array<Date> {
    const days = new Array<Date>();

    const numDays = daysInMonth(date);
    let day = getFirstOfMonth(date);
    for (let i = 0; i < numDays; i++) {
        days.push(day);
        day = modifyDays(day, 1);
    }

    return days;
}

export function getMonthStart(date: Date): Array<Date> {
    const days = new Array<Date>();
    const first = getFirstOfMonth(date);
    const daysBefore = first.getDay();
    let day = getFirstOfMonth(first);
    for (let i = 0; i < daysBefore; i++) {
        day = modifyDays(day, -1);
        days.unshift(day);
    }
    return days;
}

export function getMonthEnd(date: Date): Array<Date> {
    const days = new Array<Date>();
    const last = getLastOfMonth(date);
    const daysAfter = 6 - last.getDay();
    let day = getLastOfMonth(last);
    for (let i = 0; i < daysAfter; i++) {
        day = modifyDays(day, 1);
        days.push(day);
    }
    return days;
}

export function toCalendarDay(date: Date, currentMonth: boolean): CalendarDay {
    return { date, currentMonth };
}

export function sameDay(a: Date | undefined, b: Date | undefined): boolean {
    if (!a || !b) return false;
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
