import React, { useState, useEffect, useRef } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";

interface Option {
    value: string;
    label?: string;
    [key: string]: any;
}
type OptionFormat = string | Option;

interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *optional* - Options to display that are selected */
    selected?: OptionFormat;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?:
        | ((
              selected: OptionFormat,
              event: React.MouseEvent | KeyboardEvent | undefined
          ) => void)
        | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Minimum length of input string before options appear */
    minLength?: number;

    /** *Optional* - Text to display if there are no matching options */
    noMatchText?: string;
}

export default function Autocomplete(props: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const minLength = props.minLength || 0;
    const displayOptions = value.length >= minLength;

    const options = filterOptions(value, props.options);

    const handleInput = (value: string) => {
        if (props.onChange !== undefined && !props.disabled) {
            props.onChange(value, undefined);
            setValue(value);
        }
    };

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        if (props.onChange !== undefined && !props.disabled) {
            props.onChange(option, e);
            setValue(valueOf(option));
            setOpen(false);
        }
    };

    return (
        <Select
            value={value}
            onInput={handleInput}
            allowInput
            open={open && displayOptions}
            onToggle={setOpen}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            placholder={props.placholder}
            label={props.label}
            noWrap={props.noWrap}
        >
            {displayOptions &&
                options.length > 0 &&
                options.map((option, idx) => (
                    <Option
                        key={idx}
                        onClick={handleClick(option)}
                        centered={props.centered}
                    >
                        {valueOf(option)}
                    </Option>
                ))}
            {displayOptions && options.length === 0 && (
                <Option centered={props.centered} disabled>
                    {props.noMatchText || "none"}
                </Option>
            )}
        </Select>
    );
}

function filterOptions(
    value: OptionFormat,
    options: Array<OptionFormat>
): Array<OptionFormat> {
    return options.filter((option) => {
        return valueOf(option)
            .toLowerCase()
            .includes(valueOf(value).toLowerCase());
    });
}

function valueOf(item: OptionFormat) {
    return typeof item === "string" ? item : item.label || item.value;
}
