import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Base, InputBase, Input, List, Error } from "./style";
import { Label } from "../sharedStyles";
import { Icon } from "../../index";
import useRefState from "../../helpers/RefState";
import GlobalState from "../../helpers/GlobalState";
import DomUtil from "../../helpers/DomUtil";
import { Props } from "./props";

let lastPressTab: boolean = false;
export default function Select(props: Props) {
    const open = props.open !== undefined ? props.open : false;

    const list = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const [propsRef, setPropsRef] = useRefState<Props | undefined>(props);
    const [openRef, _setOpen] = useRefState<boolean>(open);
    const [disabledRef, setDisabled] = useRefState<boolean>(!!props.disabled);

    // Save props in RefState for event listeners
    useEffect(() => {
        setPropsRef(props);
    }, [props]);

    // Open state handler
    const setOpen = (value: boolean) => {
        GlobalState.setOpen(value);
        GlobalState.setAutoClose(!!props.autoClose);
        _setOpen(value);
    };

    // Sync external open state
    if (props.open !== undefined && props.open !== openRef.current) {
        GlobalState.setOpen(props.open);
        GlobalState.setAutoClose(!!props.autoClose);
        openRef.current = props.open;
    }

    // Open handlers
    const toggleOpen = () => {
        if (disabledRef.current) return;
        DomUtil.positionElement(input.current, list.current, {
            positionBelow: props.allowInput,
            allowOverflow: props.noWrap,
        });
        setOpen(true);
        if (props.onToggle) props.onToggle(true);
    };
    const toggleClose = () => {
        setOpen(false);
        if (props.onToggle) props.onToggle(false);
    };
    useEffect(() => {
        if (disabledRef.current) return;
        if (props.open === undefined) return;
        if (props.open) toggleOpen();
        else toggleClose();
        // eslint-disable-next-line
    }, [props.open]);

    // Disabled handler
    useEffect(() => {
        setDisabled(!!props.disabled);
    }, [props.disabled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabledRef.current) return;
        if (props.onInput) props.onInput(e.currentTarget.value);
    };

    useEffect(() => {
        DomUtil.positionElement(input.current, list.current, {
            positionBelow: props.allowInput,
            allowOverflow: props.noWrap,
        });

        // Event handlers
        const keyDownListener = createKeyDownListener(openRef, setOpen);
        const clickListener = createClickListener(
            openRef,
            propsRef,
            list,
            input,
            toggleClose,
            toggleOpen
        );
        const resizeListener = createResizeListener(
            openRef,
            propsRef,
            list,
            input
        );

        document.addEventListener("keydown", keyDownListener, true);
        document.addEventListener("click", clickListener, true);
        window.addEventListener("resize", resizeListener);
        window.addEventListener("scroll", resizeListener, true);

        return () => {
            document.removeEventListener("keydown", keyDownListener, true);
            document.removeEventListener("click", clickListener, true);
            window.removeEventListener("resize", resizeListener);
            window.removeEventListener("scroll", resizeListener, true);
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
                    GlobalState.getModalRef()
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

function createKeyDownListener(
    openRef: React.MutableRefObject<boolean>,
    setOpen: (value: boolean) => void
) {
    function handleKeyDown(e: KeyboardEvent) {
        const tabPressed = e.key === "Tab";
        lastPressTab = tabPressed;
        if (tabPressed && openRef.current) {
            setOpen(false);
        }
    }
    return handleKeyDown;
}

function createClickListener(
    openRef: React.MutableRefObject<boolean>,
    propsRef: React.MutableRefObject<Props | undefined>,
    list: React.RefObject<HTMLDivElement>,
    input: React.RefObject<HTMLInputElement>,
    toggleClose: () => void,
    toggleOpen: () => void
) {
    function handleClick(e: MouseEvent) {
        lastPressTab = false;
        const { current: open } = openRef;
        const { current: props } = propsRef;

        if (!props) return;

        // Prevent overlapping of multiple selects
        if (!open && GlobalState.isOpen() && !GlobalState.isAutoClose()) {
            return;
        }

        // Prevent clicking "through" the datepicker's calendar
        if (GlobalState.calendarOverlaps(e)) {
            return;
        }

        // Check if click is within the input or list
        const clickedInput = DomUtil.eventContained(e, input.current);
        const clickedList = DomUtil.eventContained(e, list.current);

        // Auto close if applicable
        if (props.autoClose && openRef.current && clickedList) {
            toggleClose();
            return;
        }

        // Open if click event is within input
        if (!openRef.current && clickedInput) {
            toggleOpen();
            return;
        }

        // Close if clicked outside
        if (openRef.current && !clickedInput && !clickedList) {
            toggleClose();
            return;
        }
    }
    return handleClick;
}

function createResizeListener(
    openRef: React.MutableRefObject<boolean>,
    propsRef: React.MutableRefObject<Props | undefined>,
    list: React.RefObject<HTMLDivElement>,
    input: React.RefObject<HTMLInputElement>
) {
    function handleResize() {
        const { current: open } = openRef;
        const { current: props } = propsRef;
        if (!open || !props) return;
        DomUtil.positionElement(input.current, list.current, {
            positionBelow: props.allowInput,
            allowOverflow: props.noWrap,
        });
    }
    return handleResize;
}
