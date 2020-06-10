import React, { FormEventHandler, KeyboardEvent } from 'react'
import { Base, Input } from './style'

interface Props {

    /** *Required* - Current value of the input */
    value: string;

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

    /** *Optional* - Defines the input as a certain type (number, password) */
    type?: "password" | "number" | "text";

    /** *Optional* - Function to call when input changes */
    onChange?: FormEventHandler;

    /** *Optional* - Function to call when enter is pressed */
    onEnter?: Function;
}

export default function TextField(props: Props) {

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined
    }

    const handleEnter = (e: KeyboardEvent) => (props.onEnter && e.key === "Enter") && props.onEnter(e) 

    return (
        <Base>
            {props.label && <div>{props.label}</div>}
            <Input 
                defaultValue={props.value}
                placeholder={props.placeholder}
                onInput={props.onChange || undefined}
                onKeyPress={handleEnter}
                type={props.type || "text"}
                fullWidth={props.fullWidth}
                {...styles}
            />
        </Base>
    )
}
