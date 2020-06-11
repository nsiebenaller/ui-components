import React from 'react'
import { Base, TextArea as Input, Label, Error } from './style'

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
}
export default function TextArea(props: Props) {

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
      };
    return (
        <Base>
            <Label visible={!!props.label}>{props.label ? props.label : 'hidden'}</Label>
            <Input defaultValue={props.value} cols={props.cols} rows={props.rows} disabled={props.disabled} {...styles} />
            <Error visible={!!props.error}>{props.error ? props.error : 'hidden'}</Error>
        </Base>
    )
}
