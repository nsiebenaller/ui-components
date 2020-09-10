import React, { useEffect } from "react";
import { Select, Option } from "../index";
import { Icon } from "../../index";
import {
    multiselectOption,
    allOption,
    multiselectList,
    stickyAll,
} from "./style";
import useRefState from "../../helpers/RefState";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";
import DomUtil from "../../helpers/DomUtil";
import { Props } from "./props";

let targetText: string = "";
const CHECKED = "CheckBox";
const UNCHECKED = "CheckBoxOutlineBlank";
const ROLLOVER_LIMIT = 3;
const ALL_TEXT = "All";
export default function Mutliselect(props: Props) {
    const [targetRef, setTarget] = useRefState<number | undefined>(undefined);
    const [openRef, setOpen] = useRefState<boolean>(false);
    const [propsRef, setPropsRef] = useRefState<Props | undefined>(props);

    // Save props in RefState for event listeners
    useEffect(() => {
        setPropsRef(props);
    }, [props]);

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        const { onChange, disabled, selected } = props;
        if (!onChange || disabled) return;

        let newSelections = new Array<OptionFormat>();
        if (OptionUtil.includes(option, selected)) {
            newSelections = OptionUtil.filter(option, selected);
        } else {
            newSelections = selected.concat(option);
        }
        onChange(newSelections, e);
    };

    const handleAllClick = (e: React.MouseEvent) => {
        const { onChange, disabled, options, selected } = props;

        if (!onChange || disabled) return;

        if (options.length !== selected.length) {
            onChange(options, e);
            return;
        }
        onChange(new Array<OptionFormat>(), e);
    };

    // Keyboard Event handler
    useEffect(() => {
        const listener = createKeyboardEventListener(
            openRef,
            targetRef,
            propsRef,
            setTarget,
            setOpen
        );
        document.addEventListener("keydown", listener, true);
        return () => {
            document.removeEventListener("keydown", listener, true);
        };
        // eslint-disable-next-line
    }, []);

    const { value, options, selected, allText, rolloverLimit } = props;
    const allValue = allText || ALL_TEXT;
    const limit = rolloverLimit || ROLLOVER_LIMIT;
    const showValue = getShowValue(value, options, selected, allValue, limit);

    return (
        <Select
            open={openRef.current}
            value={showValue}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            label={props.label}
            placeholder={props.placeholder}
            noWrap={props.noWrap}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            onToggle={setOpen}
            styledCSSList={multiselectList}
        >
            {props.includeAll && (
                <Option
                    styledCSS={allOption + (props.stickyAll ? stickyAll : "")}
                    onClick={handleAllClick}
                >
                    <Icon
                        cursorPointer
                        iconName={
                            options.length === selected.length
                                ? CHECKED
                                : UNCHECKED
                        }
                    />
                    <b>{allValue}</b>
                </Option>
            )}
            {options.map((option, idx) => {
                return (
                    <Option
                        key={`mutliselect-${idx}`}
                        selected={
                            props.fillSelected &&
                            OptionUtil.includes(option, selected)
                        }
                        targeted={idx === targetRef.current}
                        onClick={handleClick(option)}
                        centered={props.centered}
                        styledCSS={multiselectOption}
                    >
                        <Icon
                            cursorPointer
                            iconName={
                                OptionUtil.includes(option, selected)
                                    ? CHECKED
                                    : UNCHECKED
                            }
                        />
                        <span>{OptionUtil.valueOf(option)}</span>
                    </Option>
                );
            })}
        </Select>
    );
}

function getShowValue(
    value: string | undefined,
    options: Array<OptionFormat>,
    selected: Array<OptionFormat>,
    allValue: string,
    rolloverLimit: number
): string {
    if (value) return value;
    if (selected.length === 0) return "";
    if (options.length === selected.length) return allValue;
    if (selected.length > rolloverLimit) return `${selected.length} selected`;
    return selected.map((s) => OptionUtil.valueOf(s)).join(", ");
}

// Keyboard Event Listener
function createKeyboardEventListener(
    openRef: React.MutableRefObject<boolean>,
    targetRef: React.MutableRefObject<number | undefined>,
    propsRef: React.MutableRefObject<Props | undefined>,
    setTarget: (value: number | undefined) => void,
    setOpen: (value: boolean) => void
) {
    function handleKeyDown(e: KeyboardEvent) {
        const { current: open } = openRef;
        const { current: props } = propsRef;
        if (!open || !props) return;

        // Handle searching the options
        if (DomUtil.isLetter(e) || DomUtil.isNumber(e) || DomUtil.isSpace(e)) {
            targetText += e.key;
            const matchingIndex = OptionUtil.startsWith(
                targetText,
                props.options
            );
            if (matchingIndex === undefined) targetText = "";
            setTarget(matchingIndex);
            return;
        }

        // Handle clicking of the targeted option
        if (e.key === "Enter") {
            const { current: targetIdx } = targetRef;
            const { onChange, disabled } = props;

            if (targetIdx === undefined) return;
            if (onChange === undefined) return;
            if (disabled) return;

            // Form selected list
            const option = props.options[targetIdx];
            let newSelections = new Array<OptionFormat>();
            if (OptionUtil.includes(option, props.selected)) {
                newSelections = props.selected.filter((x) => x !== option);
            } else {
                newSelections = props.selected.concat(option);
            }
            onChange(newSelections, e);
            setOpen(false);
            return;
        }
    }
    return handleKeyDown;
}
