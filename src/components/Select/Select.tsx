import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Base, Input, List } from './style'

interface Props {

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

    /** *Optional* - Flag to disable this input */
    disabled?: boolean;
}

export default function Select(props: Props) {
    
    const list = useRef<HTMLDivElement>(null)
    const base = useRef<HTMLInputElement>(null)
    const [open, _setOpen] = useState<boolean>(false)
    const openRef = useRef(open)
    const setOpen = (value: boolean) => {
        openRef.current = value
        _setOpen(value)
    }

    // Event handlers
    function handleKeyDown(e: KeyboardEvent) {
        if(e.key === "Tab" && openRef.current) {
            setOpen(false)
        }
    }
    function handleClick(e: MouseEvent) {
        setOpen(isEventContained(e, base.current))
    }

    useEffect(() => {
        updateDimensions(base.current, list.current)

        document.addEventListener("keydown", handleKeyDown, true)
        document.addEventListener("click", handleClick, true)
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true)
            document.removeEventListener("click", handleClick, true)
        }
    }, [handleKeyDown, handleClick])

    const toggleOpen = () => {
        updateDimensions(base.current, list.current)
        setOpen(true)
    }   
    
    return (
        <Base>
            {props.label && <div>{props.label}</div>}
            <Input 
                ref={base}
                disabled={!!props.disabled}
                open={open}
                onClick={toggleOpen}
                onFocus={toggleOpen}
                readOnly
            />
            {
                createPortal(
                    <List 
                        ref={list} 
                        open={open}
                    >{props.children}</List>, 
                document.getElementsByTagName("BODY")[0])
            }
        </Base>
    )
}

function updateDimensions(base: HTMLInputElement | null, list: HTMLDivElement | null) {
    if(base === null || list === null) return

    const domRect: DOMRect = base.getBoundingClientRect();
    list.style.top = `${domRect.top + window.scrollY}px`
    list.style.left = `${domRect.left + window.scrollX}px`
    list.style.width = `${base.offsetWidth - 2}px`
}




function isEventContained(e: MouseEvent, ele: HTMLInputElement | HTMLDivElement | null) : boolean {
    if (!ele) return false
	const domRect: DOMRect = ele.getBoundingClientRect()
    return (
        (domRect.left <= e.clientX && domRect.left + domRect.width >= e.clientX) // X contained
        && (domRect.top <= e.clientY && domRect.top + domRect.height >= e.clientY) // Y contained
    )
}


