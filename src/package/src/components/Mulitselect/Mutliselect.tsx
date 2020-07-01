import React, { useState, useEffect, useRef } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";
import { Icon } from "../../index";
import {
    multiselectOption,
    allOption,
    multiselectList,
    stickyAll,
} from "./style";

interface Option {
    value: string;
    label?: string;
    [key: string]: any;
}
type OptionFormat = string | Option;

interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *Required* - Options to display that are currently selected */
    selected: Array<OptionFormat>;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?:
        | ((
              selected: Array<OptionFormat>,
              event: React.MouseEvent | KeyboardEvent
          ) => void)
        | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Selected input will recieve a background (similar to the Dropdown component) */
    fillSelected?: boolean;

    /** *Optional* - Sets the maximum number of options to be displayed. comma deliminated before the abbreviated text is displayed */
    rolloverLimit?: number;

    /** *Optional* - Includes an option called 'All' which will return all given options */
    includeAll?: boolean;

    /** *Optional* - Overwrites the default text for 'includeAll' property */
    allText?: string;

    /** *Optional* - Makes the 'Select All' all option sticky */
    stickyAll?: boolean;
}
let targetText: string = "";
const CHECKED = "CheckBox";
const UNCHECKED = "CheckBoxOutlineBlank";
const ROLLOVER_LIMIT = 3;
export default function Mutliselect(props: Props) {
    const [target, _setTarget] = useState<number | undefined>(undefined);
    const [open, _setOpen] = useState(false);
    const targetRef = useRef(target);
    const setTarget = (value: number | undefined) => {
        targetRef.current = value;
        _setTarget(value);
    };
    const openRef = useRef(open);
    const setOpen = (value: boolean) => {
        openRef.current = value;
        _setOpen(value);
    };

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        if (props.onChange !== undefined && !props.disabled) {
            if (isSelected(option, props.selected)) {
                const selected = props.selected.filter((x) => x !== option);
                props.onChange(selected, e);
            } else {
                const selected = props.selected.concat(option);
                props.onChange(selected, e);
            }
        }
    };

    const handleAllClick = (e: React.MouseEvent) => {
        if (props.onChange !== undefined && !props.disabled) {
            if (props.options.length === props.selected.length) {
                props.onChange([], e);
            } else {
                props.onChange(props.options, e);
            }
        }
    };

    useEffect(() => {
        // Event handlers
        function handleKeyDown(e: KeyboardEvent) {
            const isOpen = openRef.current;
            if (isOpen) {
                // Handle searching the options
                if (
                    (e.keyCode >= 48 && e.keyCode <= 57) ||
                    (e.keyCode >= 65 && e.keyCode <= 90) ||
                    e.keyCode === 32
                ) {
                    targetText += e.key;
                    const matchingIndex = findFirstMatchingIndex(props.options);
                    if (matchingIndex === undefined) targetText = "";
                    setTarget(matchingIndex);

                    return;
                }

                // Handle clicking of the targeted option
                if (e.key === "Enter") {
                    if (
                        targetRef.current !== undefined &&
                        props.onChange !== undefined &&
                        !props.disabled
                    ) {
                        // Form selected list
                        const option = props.options[targetRef.current];
                        if (isSelected(option, props.selected)) {
                            const selected = props.selected.filter(
                                (x) => x !== option
                            );
                            props.onChange(selected, e);
                        } else {
                            const selected = props.selected.concat(option);
                            props.onChange(selected, e);
                        }
                        setOpen(false);
                    }
                    return;
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
        // eslint-disable-next-line
    }, []);

    const allValue = props.allText || "All";
    let value = "";
    if (props.selected.length === props.options.length) {
        value = allValue;
    } else {
        value = getValue(props.selected, props.rolloverLimit);
    }

    return (
        <Select
            open={open}
            value={value}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            label={props.label}
            placholder={props.placholder}
            noWrap={props.noWrap}
            fullWidth={props.fullWidth}
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
                            props.options.length === props.selected.length
                                ? CHECKED
                                : UNCHECKED
                        }
                    />
                    <b>{allValue}</b>
                </Option>
            )}
            {props.options.map((option, idx) => {
                return (
                    <Option
                        key={`mutliselect-${idx}`}
                        selected={
                            props.fillSelected &&
                            isSelected(option, props.selected)
                        }
                        targeted={idx === target}
                        onClick={handleClick(option)}
                        centered={props.centered}
                        styledCSS={multiselectOption}
                    >
                        <Icon
                            cursorPointer
                            iconName={
                                isSelected(option, props.selected)
                                    ? CHECKED
                                    : UNCHECKED
                            }
                        />
                        <span>{valueOf(option)}</span>
                    </Option>
                );
            })}
        </Select>
    );
}

function valueOf(item: OptionFormat) {
    return typeof item === "string" ? item : item.label || item.value;
}

function isSelected(option: OptionFormat, selected: Array<OptionFormat>) {
    for (let i = 0; i < selected.length; i++) {
        const item = selected[i];
        const optionValue = valueOf(option);
        const itemValue = valueOf(item);
        if (optionValue === itemValue) return true;
    }
    return false;
}

function findFirstMatchingIndex(
    options: Array<OptionFormat>
): number | undefined {
    for (let i = 0; i < options.length; i++) {
        const option: OptionFormat = options[i];
        const optionValue = valueOf(option);
        if (optionValue.startsWith(targetText)) return i;
    }
    return undefined;
}

function getValue(
    selected: Array<OptionFormat>,
    rollover: number | undefined
): string {
    const rolloverLimit = rollover || ROLLOVER_LIMIT;
    if (selected.length > rolloverLimit) return `${selected.length} selected`;
    if (selected.length === 0) return "";
    const selectedLabels = selected.map((s) => valueOf(s));
    return selectedLabels.join(", ");
}
