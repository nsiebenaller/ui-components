import React from "react";
import { createPortal } from "react-dom";
import Calendar from "../Calendar/Calendar";
import { CalendarHook } from "./style";
import GlobalState from "../../helpers/GlobalState";

interface Props {
    onChange: (e: Date | Date[]) => void;
    value: Date | null;
    calendarRef: React.RefObject<HTMLDivElement>;
    openRef: React.MutableRefObject<boolean>;
}
export default function CalendarModal({
    onChange,
    value,
    calendarRef,
    openRef,
}: Props) {
    return createPortal(
        <CalendarHook ref={calendarRef} open={openRef.current}>
            <Calendar
                value={value || undefined}
                onChange={onChange}
                showToday
            />
        </CalendarHook>,
        GlobalState.getModalHook()
    );
}
