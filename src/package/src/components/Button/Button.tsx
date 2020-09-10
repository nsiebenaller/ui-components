import React from "react";
import { Base, ButtonBase, TopPad, BotPad } from "./style";
import {
    getHoverColor,
    getTextColor,
    colorOrDefault,
    stdHue,
    toHex,
} from "../../colors";
import { Props, ButtonVariant } from "./props";

export default function Button(props: Props) {
    const variant = props.variant || "default";
    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    const color = colorOrDefault(props.color);
    const hoverColor = parseHoverColor(color, variant);
    const textColor = getTextColor(color);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const { disabled, onClick } = props;
        if (disabled || !onClick) return;
        onClick(event);
    };

    return (
        <Base>
            {props.topPad && <TopPad>hidden</TopPad>}
            <ButtonBase
                color={toHex(color)}
                variant={variant}
                textColor={textColor}
                hoverColor={toHex(hoverColor)}
                onClick={handleClick}
                disabled={props.disabled}
                disabledElevation={props.disabledElevation}
                {...styles}
            >
                {props.children}
            </ButtonBase>
            {props.botPad && <BotPad>hidden</BotPad>}
        </Base>
    );
}

function parseHoverColor(
    color: string,
    variant: ButtonVariant = "default"
): string {
    if (variant !== "default" && variant !== "outlined") {
        return "white";
    }
    if (variant === "outlined") {
        const hue = stdHue(color);
        return `${hue || "grey"}-50`;
    }
    return getHoverColor(color);
}
