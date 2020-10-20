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

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type ColorString = string | undefined;
export default function Button(props: Props) {
    const variant = props.variant || "default";
    const [color, setColor] = React.useState<ColorString>();
    const [hoverColor, setHoverColor] = React.useState<ColorString>();
    const [textColor, setTextColor] = React.useState<ColorString>();

    // Validate color & colorHex prop
    if (props.color && props.colorHex) {
        console.warn(
            "Properties `color` and `colorHex` were provided. `colorHex` will be used. Remove one of the unnecessary properties."
        );
    }

    React.useEffect(() => {
        // TODO: Create color generators for hex values
        if (props.colorHex) {
            setColor(props.colorHex);
            setHoverColor(props.hoverHex || "white");
            setTextColor(props.textHex || "black");
        } else {
            const color = colorOrDefault(props.color);
            const hoverColor = parseHoverColor(color, variant);
            const textColor = getTextColor(color);
            setColor(toHex(color));
            setHoverColor(toHex(hoverColor));
            setTextColor(textColor);
        }
    }, [props]);

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    const handleClick = (event: ClickEvent) => {
        const { disabled, onClick } = props;
        if (disabled || !onClick) return;
        onClick(event);
    };

    if (!color || !hoverColor || !textColor) return null;
    return (
        <Base {...styles}>
            {props.topPad && <TopPad>hidden</TopPad>}
            <ButtonBase
                variant={variant}
                color={color}
                textColor={textColor}
                hoverColor={hoverColor}
                onClick={handleClick}
                disabled={props.disabled}
                disabledElevation={props.disabledElevation}
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
