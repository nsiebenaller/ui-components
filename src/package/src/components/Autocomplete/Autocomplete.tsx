import React, { useState, useEffect } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";

type onChangeType = (
    selected: OptionFormat,
    event: React.MouseEvent | KeyboardEvent | undefined
) => void;
interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *optional* - Options to display that are selected */
    selected?: OptionFormat;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: onChangeType | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Minimum length of input string before options appear */
    minLength?: number;

    /** *Optional* - Text to display if there are no matching options */
    noMatchText?: string;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}

export default function Autocomplete(props: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const minLength = props.minLength || 0;
    const displayOptions = value.length >= minLength;
    const isOpen = minLength === 0 ? open : displayOptions;

    const options = filterOptions(value, props.options);

    useEffect(() => {
        const value = OptionUtil.valueOf(props.selected);
        setValue(value);
    }, [props.selected]);

    const handleInput = (value: string) => {
        const { onChange, disabled } = props;
        if (!onChange || disabled) return;
        onChange(value, undefined);
        setValue(value);
    };

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        const { onChange, disabled } = props;
        if (!onChange || disabled) return;
        onChange(option, e);
        setValue(OptionUtil.valueOf(option));
        setOpen(false);
    };

    return (
        <Select
            value={value}
            onInput={handleInput}
            open={isOpen}
            onToggle={setOpen}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            placeholder={props.placeholder}
            label={props.label}
            noWrap={props.noWrap}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            allowInput
        >
            {displayOptions &&
                options.length > 0 &&
                options.map((option, idx) => (
                    <Option
                        key={idx}
                        onClick={handleClick(option)}
                        centered={props.centered}
                    >
                        {OptionUtil.valueOf(option)}
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
    const filterValue = OptionUtil.valueOf(value).toLowerCase();
    const optionValues = options.map((x) =>
        OptionUtil.valueOf(x).toLowerCase()
    );
    return OptionUtil.filter(filterValue, optionValues);
}
