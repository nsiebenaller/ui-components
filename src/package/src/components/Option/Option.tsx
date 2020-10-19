import React from "react";
import { OptionBase } from "./style";

interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Styled Component CSS to apply to the component */
    styledCSS?: string;

    /** *Optional* - Callback function to call when the container is clicked */
    onClick?: ((event: React.MouseEvent) => void) | undefined;

    /** *Optional* - What to render in the container */
    children?: React.ReactNode;

    /** *Optional* - Whether or not this option is selected */
    selected?: boolean;

    /** *Optional* - Whether or not this option is targeted */
    targeted?: boolean;

    /** *Optional* - Centers the option horizontally */
    centered?: boolean;

    /** *Optional* - Disables this option, adding additonal styles & preventing click handlers */
    disabled?: boolean;

    /** *Optional* - Ref of the option */
    innerRef?:
        | ((instance: HTMLDivElement | null) => void)
        | React.RefObject<HTMLDivElement>
        | null
        | undefined;
}
export default function Option(props: Props) {
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!props.disabled && props.onClick) props.onClick(event);
    };

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    return (
        <OptionBase
            disabled={props.disabled}
            selected={props.selected}
            targeted={props.targeted}
            centered={props.centered}
            css={props.styledCSS}
            onClick={handleClick}
            ref={props.innerRef}
            {...styles}
        >
            {props.children}
        </OptionBase>
    );
}
