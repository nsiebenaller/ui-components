import React, { useRef, useEffect } from "react";
import { Base, TextArea as Input, Label, Error } from "./style";

interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Text to be displayed in the text area */
    value?: string;

    /** *Optional* - Specifies the visible width of a text area */
    cols?: number;

    /** *Optional* - Specifies the visible number of lines in a text area */
    rows?: number;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - Error text to display under the input */
    error?: string;

    /** *Optional* - Flag to disable this input */
    disabled?: boolean;

    /** *Optional* - Flag to prevent resizing of the input */
    noResize?: boolean;

    /** *Optional* - Callback function to run when input has changed */
    onChange?: ((input: string, event: React.FormEvent) => void) | undefined;
}
export default function TextArea(props: Props) {
    const input = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.FormEvent) => {
        resize(input.current);
        if (props.onChange) props.onChange(input.current?.value || "", e);
    };

    const resize = (textArea: HTMLTextAreaElement | null) => {
        if (textArea === null) return;
        textArea.style.height = "17px";
        textArea.style.height = `${textArea.scrollHeight}px`;
    };

    useEffect(() => {
        resize(input.current);
    }, []);

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    const value = {
        value: props.onChange ? props.value : undefined,
        defaultValue: props.onChange ? undefined : props.value,
    };
    return (
        <Base>
            <Label visible={!!props.label}>
                {props.label ? props.label : "hidden"}
            </Label>
            <Input
                cols={props.cols}
                rows={props.rows}
                disabled={props.disabled}
                noResize={props.noResize}
                onInput={handleInput}
                onChange={handleInput}
                ref={input}
                {...styles}
                {...value}
            />
            <Error visible={!!props.error}>
                {props.error ? props.error : "hidden"}
            </Error>
        </Base>
    );
}
