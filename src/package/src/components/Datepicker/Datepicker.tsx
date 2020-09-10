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
import GlobalState from "../../helpers/GlobalState";
import DomUtil from "../../helpers/DomUtil";

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
        const { value, includeTime } = props;
        if (!value || !(value instanceof Date) || isNaN(value.getTime()))
            return;

        let dateString = "";
        if (includeTime) {
            dateString = value.toLocaleString("en-US");
        } else {
            dateString = value.toLocaleDateString("en-US");
        }
        setDateString(dateString);
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
                    onInput={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
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
                openRef,
                onViewChange,
                view
            )}
        </Base>
    );
}

function renderCalendar(
    onChange: (e: Date | Date[]) => void,
    value: Date | null,
    calendarRef: React.RefObject<HTMLDivElement>,
    openRef: React.MutableRefObject<boolean>,
    onViewChange: (p: any) => void,
    view: ViewType
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
                navigationLabel={NavigationLabel}
                onViewChange={onViewChange}
                view={view}
            />
        </CalendarHook>,
        GlobalState.getModalRef()
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

function cleanDateString(dateString: string | undefined | null): string {
    if (dateString === undefined || dateString === null) return "";
    return dateString.replace(/[^ -~]+/g, "");
}
