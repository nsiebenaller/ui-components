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
import useRefState from "../../helpers/RefState";

interface Props {
    /** *Optional* - Currently selected date */
    value?: Date;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - Callback function to call when the input changes to a valid input */
    onChange?: ((value: Date | null) => void) | undefined;

    /** *Optional* - Includes time in the input that allows the end user to change */
    includeTime?: boolean;

    /** *Optional* - Disables the component, preventing any input */
    disabled?: boolean;
}
export default function Datepicker(props: Props) {
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const [dateString, setDateString] = useState<string>("");
    const [valid, setValid] = useState(true);
    const [focused, setFocus] = useState(false);
    const handleFocus = () => setFocus(true);
    const [openRef, setOpen] = useRefState<boolean>(false);

    const toggleOpen = () => {
        if (props.disabled) return;
        const value = !openRef.current;
        if (value && calendarRef.current && inputRef.current) {
            updateDimensions(inputRef.current, calendarRef.current);
        }
        validateDate();
        setFocus(value);
        setOpen(value);
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
            const reactCalendar = calendarRef.current?.children[0];
            const clickedCalendar = isEventContained(e, reactCalendar);

            if (opened && !clickedInput && !clickedCalendar) {
                setOpen(false);
                setFocus(false);
            }
        }

        function handleResize() {
            if (openRef.current) {
                updateDimensions(inputRef.current, calendarRef.current);
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

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setDateString(cleanDateString(e.currentTarget.value));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                return;
            }
            setDateString(e.toLocaleDateString("en-US"));
        }
    };

    let placeholder = "MM/DD/YYYY";
    if (props.includeTime) {
        placeholder = "MM/DD/YYYY, hh:mm:ss";
    }

    let currentDate = null;
    if (dateString !== "") {
        const date = new Date(cleanDateString(dateString));
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
                    disabled={props.disabled}
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
            {renderCalendar(
                handleCalendarChange,
                currentDate,
                calendarRef,
                openRef
            )}
        </Base>
    );
}

function renderCalendar(
    onChange: (e: Date | Date[]) => void,
    value: Date | null,
    calendarRef: React.RefObject<HTMLDivElement>,
    openRef: React.MutableRefObject<boolean>
) {
    return createPortal(
        <CalendarHook ref={calendarRef} open={openRef.current}>
            <Calendar
                value={value}
                onChange={onChange}
                prev2Label={String.fromCharCode(171)} // «
                prevLabel={String.fromCharCode(8249)} // ‹
                next2Label={String.fromCharCode(187)} // »
                nextLabel={String.fromCharCode(8250)} // ›
                navigationLabel={(props) => (
                    <span>
                        {props.view.charAt(0).toUpperCase() +
                            props.view.slice(1)}
                    </span>
                )}
            />
        </CalendarHook>,
        document.getElementsByTagName("BODY")[0]
    );
}

function updateDimensions(
    input: HTMLDivElement | null,
    calendar: HTMLDivElement | null
) {
    if (input === null || calendar === null) return;
    const domRect: DOMRect = input.getBoundingClientRect();
    const windowScrollY = window.scrollY || window.pageYOffset || 0;
    const windowScrollX = window.scrollX || window.pageXOffset || 0;
    calendar.style.top = `${domRect.height + domRect.top + windowScrollY}px`;
    calendar.style.left = `${domRect.left + windowScrollX}px`;
}

function isEventContained(
    e: MouseEvent,
    ele: Element | HTMLInputElement | HTMLDivElement | null | undefined
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

function cleanDateString(dateString: string | undefined | null): string {
    if (dateString === undefined || dateString === null) return "";
    return dateString.replace(/[^ -~]+/g, "");
}
