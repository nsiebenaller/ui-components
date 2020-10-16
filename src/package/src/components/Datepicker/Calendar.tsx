import React from "react";
import { createPortal } from "react-dom";
import Calendar from "react-calendar";
import { CalendarHook } from "./style";
import GlobalState from "../../helpers/GlobalState";

const weekFormat = (locale: string, date: Date): string => {
    switch (date.getDay()) {
        case 0:
            return "SUN";
        case 1:
            return "MON";
        case 2:
            return "TUE";
        case 3:
            return "WED";
        case 4:
            return "THU";
        case 5:
            return "FRI";
        case 6:
            return "SAT";
    }
    return "";
};
type ViewType = "month" | "century" | "decade" | "year" | undefined;
interface Props {
    onChange: (e: Date | Date[]) => void;
    value: Date | null;
    calendarRef: React.RefObject<HTMLDivElement>;
    openRef: React.MutableRefObject<boolean>;
    onViewChange: (p: any) => void;
    view: ViewType;
}
export default function CalendarModal({
    onChange,
    value,
    calendarRef,
    openRef,
    onViewChange,
    view,
}: Props) {
    return createPortal(
        <CalendarHook ref={calendarRef} open={openRef.current}>
            <Calendar
                value={value}
                onChange={onChange}
                prev2Label={String.fromCharCode(171)} // «
                prevLabel={String.fromCharCode(8249)} // ‹
                next2Label={String.fromCharCode(187)} // »
                nextLabel={String.fromCharCode(8250)} // ›
                navigationLabel={NavigationLabel}
                onViewChange={onViewChange}
                formatShortWeekday={weekFormat}
                view={view}
            />
        </CalendarHook>,
        GlobalState.getModalHook()
    );
}

interface NavLabelType {
    date: Date;
    view: "century" | "decade" | "year" | "month";
    label: string;
}
function NavigationLabel(p: NavLabelType) {
    if (p.view === "century" || p.view === "decade") {
        return (
            p.label.substring(0, 4) +
            " to " +
            p.label.substring(p.label.length - 4, p.label.length)
        );
    }
    return p.label;
}
