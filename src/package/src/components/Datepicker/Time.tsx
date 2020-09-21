import React from "react";
import { createPortal } from "react-dom";
import GlobalState from "../../helpers/GlobalState";
import { TimeHook, TimeContainer, Spinner } from "./style";
import TimeSpinner from "./TimeSpinner";

interface Props {
    timeRef: React.RefObject<HTMLDivElement>;
    openRef: React.MutableRefObject<boolean>;
    value: Date | null;
    includeSec?: Boolean;
    handleTimeChange: (date: Date) => void;
}
export default function Time({
    timeRef,
    openRef,
    value,
    includeSec,
    handleTimeChange,
}: Props) {
    const currentDate = getValidDate(value);

    const hour = getHour(currentDate);
    const mins = getMin(currentDate);
    const secs = getSec(currentDate);
    const ampm = getAMPM(currentDate);

    const incrementHours = () => {
        const hours = currentDate.getHours();
        if (hours + 1 === 24) currentDate.setHours(0);
        else currentDate.setHours(hours + 1);
        handleTimeChange(currentDate);
    };
    const decrementHours = () => {
        const hours = currentDate.getHours();
        if (hours - 1 < 0) currentDate.setHours(23);
        else currentDate.setHours(hours - 1);
        handleTimeChange(currentDate);
    };
    const incrementMinutes = () => {
        const mins = currentDate.getMinutes();
        if (mins + 1 >= 60) currentDate.setMinutes(0);
        else currentDate.setMinutes(mins + 1);
        handleTimeChange(currentDate);
    };
    const decrementMinutes = () => {
        const mins = currentDate.getMinutes();
        if (mins - 1 < 0) currentDate.setMinutes(59);
        else currentDate.setMinutes(mins - 1);
        handleTimeChange(currentDate);
    };
    const incrementSeconds = () => {
        const secs = currentDate.getSeconds();
        if (secs + 1 >= 60) currentDate.setSeconds(0);
        else currentDate.setSeconds(secs + 1);
        handleTimeChange(currentDate);
    };
    const decrementSeconds = () => {
        const secs = currentDate.getSeconds();
        if (secs - 1 < 0) currentDate.setSeconds(59);
        else currentDate.setSeconds(secs - 1);
        handleTimeChange(currentDate);
    };
    const toggleAMPM = () => {
        const hours = currentDate.getHours();
        if (hours >= 12) {
            currentDate.setHours(hours - 12);
        } else {
            currentDate.setHours(hours + 12);
        }
        handleTimeChange(currentDate);
    };

    return createPortal(
        <TimeHook ref={timeRef} open={openRef.current}>
            <TimeContainer>
                <TimeSpinner
                    onIncrement={incrementHours}
                    onDecrement={decrementHours}
                    value={hour}
                />
                <Spinner>
                    <div>:</div>
                </Spinner>
                <TimeSpinner
                    onIncrement={incrementMinutes}
                    onDecrement={decrementMinutes}
                    value={mins}
                />
                {includeSec && (
                    <Spinner>
                        <div>:</div>
                    </Spinner>
                )}
                {includeSec && (
                    <TimeSpinner
                        onIncrement={incrementSeconds}
                        onDecrement={decrementSeconds}
                        value={secs}
                    />
                )}
                <TimeSpinner
                    onIncrement={toggleAMPM}
                    onDecrement={toggleAMPM}
                    value={ampm}
                />
            </TimeContainer>
        </TimeHook>,
        GlobalState.getModalHook()
    );
}

function getValidDate(value: Date | null): Date {
    if (!value || !(value instanceof Date) || isNaN(value.getTime())) {
        return new Date();
    }
    return new Date(value);
}

function getHour(date: Date): string {
    const hour = date.getHours();
    if (hour === 0) return "12";
    const normalized = hour > 12 ? hour - 12 : hour;
    if (normalized < 10) return `0${normalized}`;
    return normalized.toString();
}

function getMin(date: Date): string {
    const min = date.getMinutes();
    if (min < 10) return `0${min}`;
    return min.toString();
}

function getSec(date: Date): string {
    const sec = date.getSeconds();
    if (sec < 10) return `0${sec}`;
    return sec.toString();
}

function getAMPM(date: Date): string {
    const hour = date.getHours();
    return hour >= 12 ? "PM" : "AM";
}
