import React from "react";
import Icon from "../../icons/Icon";
import * as Util from "./Util";
import { NavHeaderContainer, NavLabel, NavControl } from "./style";

interface Props {
    current: Date;
    setCurrent: (date: Date) => void;
}
export default function NavHeader({ current, setCurrent }: Props) {
    const label = `${Util.getMonthName(current)} ${current.getFullYear()}`;

    const decrementYear = () => {
        setCurrent(Util.modifyYears(current, -1));
    };
    const decrementMonth = () => {
        setCurrent(Util.modifyMonths(current, -1));
    };
    const incrementMonth = () => {
        setCurrent(Util.modifyMonths(current, 1));
    };
    const incrementYear = () => {
        setCurrent(Util.modifyYears(current, 1));
    };

    return (
        <NavHeaderContainer>
            <NavControl onClick={decrementYear}>
                <Icon iconName={"FirstPage"} cursorPointer />
            </NavControl>
            <NavControl onClick={decrementMonth}>
                <Icon iconName={"ChevronLeft"} cursorPointer />
            </NavControl>
            <NavLabel>{label}</NavLabel>
            <NavControl onClick={incrementMonth}>
                <Icon iconName={"ChevronRight"} cursorPointer />
            </NavControl>
            <NavControl onClick={incrementYear}>
                <Icon iconName={"LastPage"} cursorPointer />
            </NavControl>
        </NavHeaderContainer>
    );
}
