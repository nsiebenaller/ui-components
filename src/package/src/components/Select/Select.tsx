import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Base, InputBase, Input, List, Error } from "./style";
import { Label } from "../sharedStyles";
import { Icon } from "../../index";
import useRefState from "../../helpers/RefState";
import GlobalState from "../../helpers/GlobalState";
import DomUtil from "../../helpers/DomUtil";
import { Props } from "./props";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
let listenerId: string | undefined = undefined;
export default function Select(props: Props) {
    const open = props.open !== undefined ? props.open : false;

    const list = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const tabPressRef = useRef<boolean>(false);
    const [propsRef, setPropsRef] = useRefState<Props>(props);
    const [openRef, setOpen] = useRefState<boolean>(open);
    const [disabledRef, setDisabled] = useRefState<boolean>(!!props.disabled);

    // Save props in RefState for event listeners
    useEffect(() => {
        setPropsRef(props);
    }, [props]);

    // Sync external open state
    if (props.open !== undefined && props.open !== openRef.current) {
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

        // Register Event Handler
        const selectProperties = {
            tabPressRef,
            openRef,
            propsRef,
            listRef: list,
            inputRef: input,
            toggleClose,
            toggleOpen,
        };
        listenerId = GlobalState.registerListener(selectProperties);

        return () => {
            GlobalState.removeListener(listenerId);
        };
        // eslint-disable-next-line
    }, []);

    const tryFocus = () => {
        if (disabledRef.current) return;
        if (tabPressRef.current) {
            toggleOpen();
        }
    };

    const handleClick = () => {
        console.log("try open", props);
        if (disabledRef.current) return;
        if (openRef.current) {
            console.log("is open");
            if (props.autoClose) {
                return toggleClose();
            }
        }
        if (!openRef.current) {
            console.log("is closed");
            return toggleOpen();
        }
    };

    const containEvent = (event: ClickEvent) => {
        event.preventDefault();
        event.stopPropagation();
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
                onClick={handleClick}
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
                        onClick={containEvent}
                    >
                        {props.children}
                    </List>,
                    GlobalState.getModalHook()
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
