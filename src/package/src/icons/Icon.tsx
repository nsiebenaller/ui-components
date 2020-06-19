import React from "react";
import { Base } from "./style";
import ArrowDropDown from "./ArrowDropDown";
import CalendarToday from "./CalendarToday";
import CheckBox from "./CheckBox";
import CheckBoxOutlineBlank from "./CheckBoxOutlineBlank";

const components = new Map();
components.set("ArrowDropDown", ArrowDropDown);
components.set("CalendarToday", CalendarToday);
components.set("CheckBox", CheckBox);
components.set("CheckBoxOutlineBlank", CheckBoxOutlineBlank);

interface Props {
    /** *Required* - Icon to display in Capital-Case (ex: "ArrowDropDown") */
    iconName: string;

    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Changes the cursor of the icon to pointer */
    cursorPointer?: boolean;

    /** *Optional* - Callback function to call when the base is clicked */
    onClick?:
        | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
        | undefined;
}
export default function Icon(props: Props) {
    const IconSVG = components.get(props.iconName || "ArrowDropDown");

    const handleMouseDown = (e: React.MouseEvent) => {
        // Disable text highlighting for nearby text when double clicking
        e.preventDefault();
        e.stopPropagation();
    };

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };
    return (
        <Base
            {...styles}
            onClick={props.onClick}
            onMouseDown={handleMouseDown}
            cursorPointer={props.cursorPointer}
        >
            <IconSVG />
        </Base>
    );
}
