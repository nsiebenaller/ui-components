import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import {
    Base,
    InputBase,
    Input,
    ButtonContainer,
    Label,
    Error,
    CalendarHook,
} from "./style";
import { Icon } from "../../index";

interface Props {
    /** *Optional* - Currently selected date */
    value?: Date;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - Callback function to call when the input changes to a valid input */
    onChange?: ((value: Date | null) => void) | undefined;

    /** *Optional* - Includes time in the input that allows the end user to change */
    includeTime?: boolean;
}
export default function Datepicker(props: Props) {
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const [dateString, setDateString] = useState("");
    const [valid, setValid] = useState(true);
    const [focused, setFocus] = useState(false);
    const handleFocus = () => setFocus(true);
    const [open, __setOpen] = useState(false);
    const openRef = useRef(open);
    const _setOpen = (value: boolean) => {
        openRef.current = value;
        __setOpen(value);
    };
    const toggleOpen = () => {
        const value = !open;
        if (value && calendarRef.current && inputRef.current) {
            updateDimensions(inputRef.current, calendarRef.current);
        }
        setFocus(value);
        _setOpen(value);
    };

    const validateDate = (): boolean => {
        if (dateString === "") {
            setValid(true);
            return true;
        }
        const date = new Date(dateString);
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            setValid(false);
            return false;
        }
        setValid(true);
        return true;
    };

    useEffect(() => {
        if (
            props.value &&
            props.value instanceof Date &&
            !isNaN(props.value.getTime())
        ) {
            if (props.includeTime) {
                setDateString(props.value.toLocaleString("en-US"));
                return;
            }
            setDateString(props.value.toLocaleDateString("en-US"));
        }
    }, [props.value]);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const opened = openRef.current;
            const clickedInput = isEventContained(e, inputRef.current);
            const clickedCalendar = isEventContained(e, calendarRef.current);
            if (opened && !clickedInput && !clickedCalendar) {
                _setOpen(false);
                setFocus(false);
            }
        }

        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, []);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setDateString(e.currentTarget.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateString(e.currentTarget.value);
    };

    const handleBlur = () => {
        setFocus(false);
        const validDate = validateDate();
        if (!validDate || dateString === "") {
            if (props.onChange) props.onChange(null);
            return;
        }
        const date = new Date(dateString);
        if (props.onChange) props.onChange(date);
        if (props.includeTime) {
            setDateString(date.toLocaleString("en-US"));
            return;
        }
        setDateString(date.toLocaleDateString("en-US"));
    };

    const handleCalendarChange = (e: Date | Date[]) => {
        if (e instanceof Date) {
            if (props.onChange) props.onChange(e);
            if (props.includeTime) {
                setDateString(e.toLocaleString("en-US"));
                //setOpen(false);
                return;
            }
            setDateString(e.toLocaleDateString("en-US"));
            //setOpen(false);
        }
    };

    let placeholder = "MM/DD/YYYY";
    if (props.includeTime) {
        placeholder = "MM/DD/YYYY, hh:mm:ss";
    }

    let currentDate = null;
    if (dateString !== "") {
        const date = new Date(dateString);
        if (date instanceof Date && !isNaN(date.getTime())) {
            currentDate = date;
        }
    }

    return (
        <Base>
            <Label visible={!!props.label}>{props.label}</Label>
            <InputBase ref={inputRef}>
                <Input
                    value={dateString}
                    placeholder={placeholder}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errorOutline={!valid}
                    focused={focused}
                />
                <ButtonContainer
                    focused={focused}
                    open={open}
                    errorOutline={!valid}
                    onClick={toggleOpen}
                >
                    <Icon iconName={"CalendarToday"} />
                </ButtonContainer>
            </InputBase>
            <Error visible={!valid}>Invalid Date</Error>
            <CalendarHook ref={calendarRef} open={open} />
            {CalendarPortal(calendarRef, handleCalendarChange, currentDate)}
        </Base>
    );
}

function CalendarPortal(
    calendarHook: React.RefObject<HTMLDivElement> | null,
    onChange: (e: Date | Date[]) => void,
    value: Date | null
) {
    if (!calendarHook || !calendarHook.current) return;
    return createPortal(
        <Calendar value={value} onChange={onChange} />,
        calendarHook.current
    );
}

function updateDimensions(
    input: HTMLDivElement | null,
    calendar: HTMLDivElement | null
) {
    if (input === null || calendar === null) return;
    const domRect: DOMRect = input.getBoundingClientRect();
    calendar.style.top = `${domRect.height + domRect.top + window.scrollY}px`;
    calendar.style.left = `${domRect.left + window.scrollX}px`;
}

function isEventContained(
    e: MouseEvent,
    ele: HTMLInputElement | HTMLDivElement | null
): boolean {
    if (!ele) return false;
    const domRect: DOMRect = ele.getBoundingClientRect();
    return (
        domRect.left <= e.clientX &&
        domRect.left + domRect.width >= e.clientX && // X contained
        domRect.top <= e.clientY &&
        domRect.top + domRect.height >= e.clientY // Y contained
    );
}