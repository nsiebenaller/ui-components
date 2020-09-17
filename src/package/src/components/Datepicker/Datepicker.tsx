import React, { useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { Base, InputBase, Input, ButtonContainer, Label, Error } from "./style";
import { Icon } from "../../index";
import useRefState from "../../helpers/RefState";
import GlobalState from "../../helpers/GlobalState";
import DomUtil from "../../helpers/DomUtil";
import Calendar from "./Calendar";

interface Props {
    /** *Optional* - Currently selected date */
    value?: Date;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - Callback function to call when the input changes to a valid input */
    onChange?: ((value: Date | null) => void) | undefined;

    /** *Optional* - Disables the component, preventing any input */
    disabled?: boolean;

    /** *Optional* - Includes time in the input that allows the end user to change */
    includeTime?: boolean;

    /** *Optional* - Includes seconds to the input if 'includeTime' is also set to true */
    includeSec?: boolean;

    /** *Optional* - Sets a default time when selecting a date from the calendar */
    defaultHour?: number;

    /** *Optional* - Sets a default time when selecting a date from the calendar */
    defaultMin?: number;

    /** *Optional* - Sets a default time when selecting a date from the calendar */
    defaultSec?: number;

    /** *Optional* - Placeholder for the input */
    placeholder?: string;
}
type ViewType = "month" | "century" | "decade" | "year" | undefined;
export default function Datepicker(props: Props) {
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const [dateString, setDateString] = useState<string>("");
    const [valid, setValid] = useState(true);
    const [focused, setFocus] = useState(false);
    const handleFocus = () => setFocus(true);
    const [openRef, setOpen] = useRefState<boolean>(false);
    const [view, setView] = useState<ViewType>("month");
    const onViewChange = (p: any) => {
        if (p.view === "century") return;
        setView(p.view);
    };

    const toggleOpen = () => {
        if (props.disabled) return;
        DomUtil.positionElement(inputRef.current, calendarRef.current, {
            positionBelow: true,
        });
        validateDate();
        const { current: open } = openRef;
        GlobalState.setCalendarRef(!open ? calendarRef : undefined);
        setFocus(!open);
        setOpen(!open);
    };

    const validateDate = (): boolean => {
        if (dateString === "") {
            setValid(true);
            return true;
        }
        const date = new Date(cleanDateString(dateString));
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            setValid(false);
            return false;
        }
        setValid(true);
        return true;
    };

    useEffect(() => {
        const { value, includeTime, includeSec } = props;
        if (!value || !(value instanceof Date) || isNaN(value.getTime()))
            return;

        setDateString(formatDate(value, includeTime, includeSec));
    }, [props.value]);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const opened = openRef.current;
            const clickedInput = DomUtil.eventContained(e, inputRef.current);
            const reactCalendar = calendarRef.current?.children[0];
            const clickedCalendar = DomUtil.eventContained(e, reactCalendar);

            if (opened && !clickedInput && !clickedCalendar) {
                setOpen(false);
                setFocus(false);
            }
        }

        function handleResize() {
            if (openRef.current) {
                DomUtil.positionElement(inputRef.current, calendarRef.current, {
                    positionBelow: true,
                });
            }
        }

        document.addEventListener("click", handleClick, true);
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize, true);
        };
    }, []);

    const handleInputChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        setDateString(cleanDateString(e.currentTarget.value));
    };

    const handleBlur = () => {
        setFocus(false);
        const validDate = validateDate();
        if (!validDate || dateString === "") {
            if (props.onChange) props.onChange(null);
            return;
        }
        const date = new Date(cleanDateString(dateString));
        if (props.onChange) props.onChange(date);
        setDateString(formatDate(date, props.includeTime, props.includeSec));
    };

    const handleCalendarChange = (e: Date | Date[]) => {
        if (e instanceof Date) {
            if (props.defaultHour) e.setHours(props.defaultHour);
            if (props.defaultMin) e.setMinutes(props.defaultMin);
            if (props.defaultSec) e.setSeconds(props.defaultSec);

            if (props.onChange) props.onChange(e);
            setDateString(formatDate(e, props.includeTime, props.includeSec));
        }
    };

    const placeholder =
        props.placeholder ||
        getPlaceholder(props.includeTime, props.includeSec);

    const currentDate = getCurrentDate(dateString);

    return (
        <Base>
            <Label visible={!!props.label}>{props.label}</Label>
            <InputBase ref={inputRef}>
                <Input
                    value={dateString}
                    errorOutline={!valid}
                    focused={focused}
                    placeholder={placeholder}
                    disabled={props.disabled}
                    onInput={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                />
                <ButtonContainer
                    focused={focused}
                    open={openRef.current}
                    errorOutline={!valid}
                    onClick={toggleOpen}
                    disabled={props.disabled}
                >
                    <Icon
                        cursorPointer={!props.disabled}
                        iconName={"CalendarToday"}
                    />
                </ButtonContainer>
            </InputBase>
            <Error visible={!valid}>Invalid Date</Error>

            {/* MODALS */}
            <Calendar
                onChange={handleCalendarChange}
                value={currentDate}
                calendarRef={calendarRef}
                openRef={openRef}
                onViewChange={onViewChange}
                view={view}
            />
        </Base>
    );
}

function cleanDateString(dateString: string | undefined | null): string {
    if (dateString === undefined || dateString === null) return "";
    return dateString.replace(/[^ -~]+/g, "");
}

const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};
const Formatter = new Intl.DateTimeFormat("en-us", options);

function formatDate(
    date: Date,
    includeTime?: boolean,
    includeSec?: boolean
): string {
    if (includeTime) {
        if (includeSec) {
            return date.toLocaleString("en-US");
        }
        return Formatter.format(date);
    }
    return date.toLocaleDateString("en-US");
}

function getPlaceholder(includeTime?: boolean, includeSec?: boolean): string {
    if (!includeTime) return "MM/DD/YYYY";
    if (includeSec) return "MM/DD/YYYY, hh:mm:ss";
    return "MM/DD/YYYY, hh:mm";
}

function getCurrentDate(dateString: string): Date | null {
    if (dateString === "") return null;
    const date = new Date(cleanDateString(dateString));
    if (date instanceof Date && !isNaN(date.getTime())) {
        return date;
    }
    return null;
}
