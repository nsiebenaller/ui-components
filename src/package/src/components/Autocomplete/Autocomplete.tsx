import React, { useState, useEffect } from "react";
import { Select, Option } from "../index";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";
import useRefState from "../../helpers/RefState";
import { Props } from "./props";

const MIN_LENGTH = 0;
const NO_MATCH_TEXT = "none";
export default function Autocomplete(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useRefState<string>("");
    const { current: text } = value;

    const minLength = props.minLength || MIN_LENGTH;
    const options = OptionUtil.filterStartsWith(text, props.options);

    const onToggle = (open: boolean) => {
        const { current: text } = value;
        const canOpen = text.length >= minLength;
        if (!canOpen) {
            setOpen(false);
            return;
        }
        setOpen(open);
    };

    useEffect(() => {
        setValue(OptionUtil.valueOf(props.selected));
    }, [props.selected]);

    const handleInput = (value: string) => {
        const { onChange, disabled } = props;
        if (!onChange || disabled) return;

        const canOpen = value.length >= minLength;
        if (!open && canOpen) {
            setOpen(true);
        } else if (open && !canOpen) {
            setOpen(false);
        }
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
            value={text}
            open={open}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            placeholder={props.placeholder}
            label={props.label}
            noWrap={props.noWrap}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            onInput={handleInput}
            onToggle={onToggle}
            allowInput
            autoClose
        >
            {options.length > 0 &&
                options.map((option, idx) => (
                    <Option
                        key={idx}
                        onClick={handleClick(option)}
                        centered={props.centered}
                        selected={OptionUtil.match(option, props.selected)}
                        targeted={OptionUtil.match(option, text)}
                    >
                        {OptionUtil.valueOf(option)}
                    </Option>
                ))}
            {options.length === 0 && (
                <Option centered={props.centered} disabled>
                    {props.noMatchText || NO_MATCH_TEXT}
                </Option>
            )}
        </Select>
    );
}
