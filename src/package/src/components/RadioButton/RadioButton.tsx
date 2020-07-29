import React from "react";
import { Base, Label } from "./style";
import { Icon } from "../../index";
import { textColors, colorOrDefault, toHex } from "../../colors";
const textColorMap: any = textColors;

interface Props {
    /** *Required* - Currently selected value of the radio button */
    value: boolean;

    /** *Optional* - Callback function to call when the radio button is toggled */
    onChange?: ((value: boolean) => void) | undefined;

    /** *Optional* - Label to display associated with the input */
    label?: string;

    /** *Optional* - Color to use for the icon */
    color?: string;
}
export default function RadioButton(props: Props) {
    const handleClick = () => {
        if (props.onChange) props.onChange(!props.value);
    };

    const colorHex = toHex(colorOrDefault(props.color, "grey-900"));

    return (
        <Base color={colorHex} value={props.value}>
            <Icon
                iconName={props.value ? "CheckBox" : "CheckBoxOutlineBlank"}
                onClick={handleClick}
                cursorPointer
            />
            {props.label && <Label onClick={handleClick}>{props.label}</Label>}
        </Base>
    );
}
