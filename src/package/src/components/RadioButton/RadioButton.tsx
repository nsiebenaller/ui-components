import React from "react";
import { Base, Label } from "./style";
import { Icon } from "../../index";
import colors from "../../colors";
import { ColorType } from "../../colors/types";

interface Props {
    /** *Required* - Currently selected value of the radio button */
    value: boolean;

    /** *Optional* - Callback function to call when the radio button is toggled */
    onChange?: ((value: boolean) => void) | undefined;

    /** *Optional* - Label to display associated with the input */
    label?: string;

    /** *Optional* - Color to use for the icon */
    color?: ColorType;

    /** *Optional* - Color value (shade, hue) to use for the icon */
    colorHue?: string;
}
export default function RadioButton(props: Props) {
    const handleClick = () => {
        if (props.onChange) props.onChange(!props.value);
    };

    const colorType: ColorType = props.color || "grey";
    const colorHue = props.colorHue || "900";
    const color = colors[colorType][colorHue];

    return (
        <Base color={color} value={props.value}>
            <Icon
                iconName={props.value ? "CheckBox" : "CheckBoxOutlineBlank"}
                onClick={handleClick}
                cursorPointer
            />
            {props.label && <Label onClick={handleClick}>{props.label}</Label>}
        </Base>
    );
}
