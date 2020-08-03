import React from "react";
import { Base } from "./style";
import { colorOrDefault, toHex } from "../colors";
import { IconType, castIconType } from "./types";

import ArrowBack from "./ArrowBack";
import ArrowDropDown from "./ArrowDropDown";
import ArrowDropUp from "./ArrowDropUp";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import Autorenew from "./Autorenew";
import CalendarToday from "./CalendarToday";
import CheckBox from "./CheckBox";
import CheckBoxOutlineBlank from "./CheckBoxOutlineBlank";

const components = new Map<IconType, () => JSX.Element>();
components.set("ArrowBack", ArrowBack);
components.set("ArrowDropDown", ArrowDropDown);
components.set("ArrowDropUp", ArrowDropUp);
components.set("ArrowLeft", ArrowLeft);
components.set("ArrowRight", ArrowRight);
components.set("Autorenew", Autorenew);
components.set("CalendarToday", CalendarToday);
components.set("CheckBox", CheckBox);
components.set("CheckBoxOutlineBlank", CheckBoxOutlineBlank);

interface Props {
    /** *Required* - Icon to display in Capital-Case (ex: "ArrowDropDown") */
    iconName: string | IconType;

    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Changes the cursor of the icon to pointer */
    cursorPointer?: boolean;

    /** *Optional* - Color of the icon */
    color?: string;

    /** *Optional* - Pads the top of the icon */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the icon */
    botPad?: boolean;

    /** *Optional* - Pads the right side of the icon */
    rightPad?: boolean;

    /** *Optional* - Pads the left side of the icon */
    leftPad?: boolean;

    /** *Optional* - Callback function to call when the base is clicked */
    onClick?:
        | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
        | undefined;
}
export default function Icon(props: Props) {
    const iconName = castIconType(props.iconName);
    if (!iconName) return null;
    const IconSVG = components.get(iconName);
    if (!IconSVG) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        // Disable text highlighting for nearby text when double clicking
        e.preventDefault();
        e.stopPropagation();
    };

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };
    const colorHex = toHex(colorOrDefault(props.color, "black"));
    return (
        <Base
            onMouseDown={handleMouseDown}
            onClick={props.onClick}
            cursorPointer={props.cursorPointer}
            topPad={props.topPad}
            botPad={props.botPad}
            rightPad={props.rightPad}
            leftPad={props.leftPad}
            color={colorHex}
            {...styles}
        >
            <IconSVG />
        </Base>
    );
}
