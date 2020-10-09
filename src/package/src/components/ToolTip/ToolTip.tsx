import React from "react";
import { PopUp, Hook } from "./style";

interface Props {
    children: React.ReactNode;
    className?: string;
    content?: React.ReactNode;
    position?: PositionType;
}
export default function ToolTip({
    children,
    className,
    content,
    position,
}: Props) {
    const pos: PositionType = position || "top";

    const toolTipRef = React.useRef<HTMLDivElement>(null);
    const childrenRef = React.useRef<HTMLDivElement>(null);
    const [hoverToolTip, setHoverToolTip] = React.useState(false);
    const [hoverChildren, setHoverChildren] = React.useState(false);
    const onEnter = () => {
        positionElement(childrenRef.current, toolTipRef.current, {
            position: pos,
        });
    };
    const onEnterToolTip = () => {
        setHoverToolTip(true);
        onEnter();
    };
    const onLeaveToolTip = () => {
        setHoverToolTip(false);
    };
    const onEnterChildren = () => {
        setHoverChildren(true);
        onEnter();
    };
    const onLeaveChildren = () => {
        setHoverChildren(false);
    };

    return (
        <React.Fragment>
            <PopUp
                className={className || ""}
                ref={toolTipRef}
                onMouseEnter={onEnterToolTip}
                onMouseLeave={onLeaveToolTip}
                show={hoverToolTip || hoverChildren}
            >
                {content}
            </PopUp>
            <Hook
                ref={childrenRef}
                onMouseEnter={onEnterChildren}
                onMouseLeave={onLeaveChildren}
            >
                {children}
            </Hook>
        </React.Fragment>
    );
}

type PositionType =
    | "center"
    | "top"
    | "top-left"
    | "top-right"
    | "bot"
    | "bot-left"
    | "bot-right"
    | "left"
    | "right";
interface IOptions {
    position?: PositionType;
}
function positionElement(
    root: HTMLDivElement | HTMLSpanElement | null,
    element: HTMLDivElement | HTMLSpanElement | null,
    options: IOptions
) {
    const pos: PositionType = options.position || "center";
    if (!root || !element) return;
    const rootRect: DOMRect = root.getBoundingClientRect();
    const eleRect: DOMRect = element.getBoundingClientRect();

    const windowScrollY = window.scrollY || window.pageYOffset || 0;
    const windowScrollX = window.scrollX || window.pageXOffset || 0;
    const originTop = rootRect.top + windowScrollY;
    const originLeft = rootRect.left + windowScrollX;

    const rootCenterX = rootRect.width / 2;
    const rootCenterY = rootRect.height / 2;
    const eleCenterX = eleRect.width / 2;
    const eleCenterY = eleRect.height / 2;

    if (pos === "center") {
        element.style.top = `${originTop - eleCenterY + rootCenterY}px`;
        element.style.left = `${originLeft - eleCenterX + rootCenterX}px`;
    } else if (pos === "top") {
        element.style.top = `${originTop - eleRect.height}px`;
        element.style.left = `${originLeft - eleCenterX + rootCenterX}px`;
    } else if (pos === "top-left") {
        element.style.top = `${originTop - eleRect.height}px`;
        element.style.left = `${originLeft - eleRect.width}px`;
    } else if (pos === "top-right") {
        element.style.top = `${originTop - eleRect.height}px`;
        element.style.left = `${originLeft + rootRect.width}px`;
    } else if (pos === "bot") {
        element.style.top = `${originTop + rootRect.height}px`;
        element.style.left = `${originLeft - eleCenterX + rootCenterX}px`;
    } else if (pos === "bot-left") {
        element.style.top = `${originTop + rootRect.height}px`;
        element.style.left = `${originLeft - eleRect.width}px`;
    } else if (pos === "bot-right") {
        element.style.top = `${originTop + rootRect.height}px`;
        element.style.left = `${originLeft + rootRect.width}px`;
    } else if (pos === "right") {
        element.style.top = `${originTop - eleCenterY + rootCenterY}px`;
        element.style.left = `${originLeft + rootRect.width}px`;
    } else if (pos === "left") {
        element.style.top = `${originTop - eleCenterY + rootCenterY}px`;
        element.style.left = `${originLeft - eleRect.width}px`;
    }
}
