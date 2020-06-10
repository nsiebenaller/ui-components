import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { Base, Input } from './style'

interface Props {

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

}

export default function Select(props: Props) {
    
    const list = useRef(null)

    console.log("list", list)

    return (
        <Base>
            {props.label && <div>{props.label}</div>}
            <Input></Input>
            {
                createPortal(<div ref={list}>{props.children}</div>, 
                document.getElementsByTagName("BODY")[0])
            }
        </Base>
    )
}

