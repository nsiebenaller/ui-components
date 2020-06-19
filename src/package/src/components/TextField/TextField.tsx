import React, { FormEventHandler, KeyboardEvent, useRef } from 'react'
import { Base, Input, Label, Error } from './style'

interface Props {
    /** *Optional* - Current value of the input */
    value?: string | number | string[] | undefined

    /** *Optional* - Class to apply to the component */
    className?: string

    /** *Optional* - ID to apply to the component */
    id?: string

    /** *Optional* - Placeholder text to display */
    placeholder?: string

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode

    /** *Optional* - Defines element as block style (width 100%) */
    fullWidth?: boolean

    /** *Optional* - Defines the input as a certain type (number, password) Default: "text" */
    type?: 'password' | 'number' | 'text'

    /** *Optional* - Function to call when input changes */
    onChange?: ((value: string) => void) | undefined

    /** *Optional* - Function to call when enter is pressed */
    onEnter?: Function

    /** *Optional* - Error text to display under the input */
    error?: string

    /** *Optional* - Flag to disable this input */
    disabled?: boolean
}

export default function TextField(props: Props) {
    const input = useRef<HTMLInputElement>(null)

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    }

    const handleEnter = (e: KeyboardEvent) =>
        props.onEnter && e.key === 'Enter' && props.onEnter(e)

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(input.current?.value || '')
    }

    return (
        <Base>
            <Label visible={!!props.label}>
                {props.label ? props.label : 'hidden'}
            </Label>
            <Input
                defaultValue={props.value}
                placeholder={props.placeholder}
                onInput={handleInput}
                onKeyPress={handleEnter}
                type={props.type || 'text'}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
                ref={input}
                {...styles}
            />
            <Error visible={!!props.error}>
                {props.error ? props.error : 'hidden'}
            </Error>
        </Base>
    )
}