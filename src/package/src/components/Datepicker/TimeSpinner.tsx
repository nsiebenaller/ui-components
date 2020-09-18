import React from "react";
import { Icon } from "../../index";
import { Spinner } from "./style";

interface TimerSpinnerProps {
    value: string;
    onIncrement: () => void;
    onDecrement: () => void;
}
export default function TimeSpinner({
    value,
    onIncrement,
    onDecrement,
}: TimerSpinnerProps) {
    return (
        <Spinner>
            <Icon
                iconName={"ArrowDropUp"}
                onClick={onIncrement}
                cursorPointer
            />
            <div>{value}</div>
            <Icon
                iconName={"ArrowDropDown"}
                onClick={onDecrement}
                cursorPointer
            />
        </Spinner>
    );
}
