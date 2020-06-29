import React from "react";
import { Base, ButtonBase, TopPad, BotPad } from "./style";
import {
    textColors,
    getHoverColor,
    colorOrDefault,
    standardizeColor,
} from "../../colors";
const textColorMap: any = textColors;

interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Button text to display */
    children?: React.ReactNode;

    /** *Optional* - Pads the top of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
    botPad?: boolean;

    /** *Optional* - Color to use for the button */
    color?: string;

    /** *Optional* - Disables the button preventing further clicks */
    disabled?: boolean;

    /** *Optional* - Variant of button to display */
    variant?: "default" | "outlined" | "minimal";

    /** *Optional* - Callback function to call when the button is clicked */
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}

export default function Button(props: Props) {
    const variant = props.variant || "default";
    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    const color = standardizeColor(props.color);
    const colorHex = colorOrDefault(props.color);
    const hoverColorHex = getHoverColor(
        color === "" ? "grey-500" : color,
        variant
    );

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!props.disabled && props.onClick) props.onClick(event);
    };

    return (
        <Base>
            {props.topPad && <TopPad>hidden</TopPad>}
            <ButtonBase
                color={colorHex}
                variant={variant}
                textColor={textColorMap[color]}
                hoverColor={hoverColorHex}
                onClick={handleClick}
                disabled={props.disabled}
                {...styles}
            >
                {props.children}
            </ButtonBase>
            {props.botPad && <BotPad>hidden</BotPad>}
        </Base>
    );
}
