import React, { KeyboardEvent, useRef } from "react";
import { Base, Input, Label, Error } from "./style";

interface Props {
    /** *Optional* - Current value of the input */
    value?: string | number | string[] | undefined;

    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Placeholder text to display */
    placeholder?: string;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - Defines element as block style (width 100%) */
    fullWidth?: boolean;

    /** *Optional* - Defines the input as a certain type (number, password) Default: "text" */
    type?: "password" | "number" | "text";

    /** *Optional* - Function to call when input changes */
    onChange?: ((value: string) => void) | undefined;

    /** *Optional* - Function to call when enter is pressed */
    onEnter?: Function;

    /** *Optional* - Error text to display under the input */
    error?: string;

    /** *Optional* - Flag to disable this input */
    disabled?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}

export default function TextField(props: Props) {
    const input = useRef<HTMLInputElement>(null);

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };
    const value = {
        value: props.onChange ? props.value : undefined,
        defaultValue: props.onChange ? undefined : props.value,
    };

    const handleEnter = (e: KeyboardEvent) =>
        props.onEnter && e.key === "Enter" && props.onEnter(e);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(input.current?.value || "");
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
        <Base fullWidth={props.fullWidth}>
            <Label visible={!!props.label}>{labelText}</Label>
            <Input
                placeholder={props.placeholder}
                onChange={handleInput}
                onKeyPress={handleEnter}
                type={props.type || "text"}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                ref={input}
                {...styles}
                {...value}
            />
            <Error visible={!!props.error}>{errorText}</Error>
        </Base>
    );
}
