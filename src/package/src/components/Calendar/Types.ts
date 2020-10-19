export type CalendarWeeks = Array<Array<CalendarDay>> | undefined;
export type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export interface CalendarDay {
    date: Date;
    currentMonth: boolean;
}
