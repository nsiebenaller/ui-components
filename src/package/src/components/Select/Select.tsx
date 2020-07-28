import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Base, Label, InputBase, Input, List, Error } from "./style";
import { Icon } from "../../index";
import useRefState from "../../helpers/RefState";

export interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - CSS to apply to the List component */
    styledCSSList?: string;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

    /** *Optional* - Flag to disable this input */
    disabled?: boolean;

    /** *Optional* - Value to display in the input while the list is not open */
    value?: string;

    /** *Optional* - Error text to display under the input */
    error?: string;

    /** *Optional* - Error outline to display around the input*/
    errorOutline?: boolean;

    /** *Optional* - Closes the option list when an option is clicked */
    autoClose?: boolean;

    /** *Optional* - Callback function called when the dropdown list is toggled */
    onToggle?: (value: boolean) => void;

    /** *Optional* - Forced state of open */
    open?: boolean;

    /** *Optional* - Placeholder to display in the input */
    placeholder?: string | undefined;

    /** *Optional* - Callback function to call when input is changed */
    onInput?: ((value: string) => void) | undefined;

    /** *Optional* - Allows input to be entered in the input & allows use of "onInput" prop */
    allowInput?: boolean;

    /** *Optional* - Disables constrained width of option list */
    noWrap?: boolean;

    /** *Optional* - Defines element as block style (width 100%) */
    fullWidth?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}

let lastPressTab: boolean = false;
export default function Select(props: Props) {
    const list = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);

    // Open state handler
    const open = props.open !== undefined ? props.open : false;
    const [openRef, setOpen] = useRefState<boolean>(open);

    // Disabled state handler
    const [disabledRef, setDisabled] = useRefState<boolean>(!!props.disabled);

    const toggleOpen = () => {
        if (disabledRef.current) return;
        updateDimensions(
            input.current,
            list.current,
            props.allowInput,
            props.noWrap
        );
        setOpen(true);
        if (props.onToggle) props.onToggle(true);
    };
    const toggleClose = () => {
        setOpen(false);
        if (props.onToggle) props.onToggle(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabledRef.current) return;
        if (props.onInput) props.onInput(e.currentTarget.value);
        if (props.autoClose) toggleClose();
    };

    useEffect(() => {
        if (disabledRef.current) return;
        if (props.open !== undefined) {
            if (props.open) toggleOpen();
            else toggleClose();
        }
        // eslint-disable-next-line
    }, [props.open]);

    useEffect(() => {
        setDisabled(!!props.disabled);
    }, [props.disabled]);

    useEffect(() => {
        updateDimensions(
            input.current,
            list.current,
            props.allowInput,
            props.noWrap
        );

        // Event handlers
        function handleKeyDown(e: KeyboardEvent) {
            const tabPressed = e.key === "Tab";
            lastPressTab = tabPressed;
            if (tabPressed && openRef.current) {
                setOpen(false);
            }
        }
        function handleClick(e: MouseEvent) {
            lastPressTab = false;
            const clickedInput = isEventContained(e, input.current);
            const clickedList = isEventContained(e, list.current);
            if (clickedInput || clickedList) {
                if (openRef.current && clickedList && props.autoClose) {
                    toggleClose();
                    return;
                }
                toggleOpen();
            } else {
                toggleClose();
            }
        }
        function handleResize() {
            if (openRef.current) {
                updateDimensions(
                    input.current,
                    list.current,
                    props.allowInput,
                    props.noWrap
                );
            }
        }

        document.addEventListener("keydown", handleKeyDown, true);
        document.addEventListener("click", handleClick, true);
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize, true);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("click", handleClick, true);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize, true);
        };
        // eslint-disable-next-line
    }, []);

    const tryFocus = () => {
        if (disabledRef.current) return;
        if (lastPressTab) {
            toggleOpen();
        }
    };

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    const labelText = props.label
        ? props.label
        : props.topPad
        ? "hidden"
        : undefined;
    const errorText = props.error
        ? props.error
        : props.botPad
        ? "hidden"
        : undefined;

    return (
        <Base {...styles} fullWidth={props.fullWidth}>
            <Label visible={!!props.label}>{labelText}</Label>
            <InputBase
                disabled={props.disabled}
                errorOutline={props.errorOutline}
                fullWidth={props.fullWidth}
            >
                <Input
                    ref={input}
                    open={openRef.current}
                    value={props.value || ""}
                    disabled={props.disabled}
                    errorOutline={props.errorOutline}
                    placeholder={props.placeholder}
                    allowInput={props.allowInput}
                    readOnly={!props.allowInput}
                    fullWidth={props.fullWidth}
                    onFocus={tryFocus}
                    onChange={handleChange}
                />
                {createPortal(
                    <List
                        ref={list}
                        open={openRef.current}
                        styledCSSList={props.styledCSSList}
                    >
                        {props.children}
                    </List>,
                    document.getElementsByTagName("BODY")[0]
                )}
                {!props.allowInput && (
                    <Icon
                        iconName={"ArrowDropDown"}
                        cursorPointer={!disabledRef.current}
                    />
                )}
            </InputBase>
            <Error visible={!!props.error}>{errorText}</Error>
        </Base>
    );
}

function updateDimensions(
    input: HTMLInputElement | null,
    list: HTMLDivElement | null,
    allowInput: boolean | undefined,
    noWrap: boolean | undefined
) {
    if (input === null || list === null) return;
    const domRect: DOMRect = input.getBoundingClientRect();
    const inputHeight = allowInput ? domRect.height : 0;
    const windowScrollY = window.scrollY || window.pageYOffset || 0;
    const windowScrollX = window.scrollX || window.pageXOffset || 0;

    list.style.top = `${inputHeight + domRect.top + windowScrollY}px`;
    list.style.left = `${domRect.left + windowScrollX}px`;
    list.style.width = noWrap ? "auto" : `${input.offsetWidth - 2}px`;
    if (noWrap) list.style.minWidth = `${input.offsetWidth - 2}px`;
}

function isEventContained(
    e: MouseEvent,
    ele: HTMLInputElement | HTMLDivElement | null
): boolean {
    if (!ele) return false;
    const domRect: DOMRect = ele.getBoundingClientRect();
    return (
        domRect.left <= e.clientX &&
        domRect.left + domRect.width >= e.clientX && // X contained
        domRect.top <= e.clientY &&
        domRect.top + domRect.height >= e.clientY // Y contained
    );
}
