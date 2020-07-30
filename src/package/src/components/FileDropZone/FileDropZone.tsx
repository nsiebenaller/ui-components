import React, { useState } from "react";
import { Container, FileInput, FileLabel } from "./style";
import uniqueId from "../../helpers/uniqueId";
import { colorOrDefault, toHex } from "../../colors";

function prevent(e: React.ChangeEvent | React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
}

interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

    /** *Optional* - Changes the cursor of the icon to pointer */
    cursorPointer?: boolean;

    /** *Optional* - Color to use for the background (default: white) */
    color?: string;

    /** *Optional* - Color to use for the hovered background (default: white) */
    hoverColor?: string;

    /** *Optional* - Allow multiple files to be selected (default: false) */
    multiple?: boolean;

    /** *Optional* - Callback function when files are selected */
    onChange?: (files: File | File[]) => void;
}
export default function FileDropZone(props: Props) {
    const [id] = useState(uniqueId("filedropzone"));

    const color = toHex(colorOrDefault(props.color, "white"));
    const hoverColor = toHex(colorOrDefault(props.hoverColor, "white"));

    const handleFiles = (e: React.ChangeEvent) => {
        prevent(e);
        const target = e.target as HTMLInputElement;
        if (!target.files) return;
        const files = Array.from(target.files);
        target.value = "";
        if (!props.onChange) return;
        if (!props.multiple) return props.onChange(files[0]);
        return props.onChange(files);
    };
    const handleDragEvent = (e: React.DragEvent) => {
        prevent(e);
        const files = Array.from(e.dataTransfer.files);
        if (!props.onChange) return;
        if (!props.multiple) return props.onChange(files[0]);
        return props.onChange(files);
    };

    const styles = {
        id: props.id || undefined,
        className: props.className || undefined,
    };

    return (
        <Container {...styles}>
            <FileInput
                id={id}
                type="file"
                multiple={props.multiple}
                onChange={handleFiles}
            />
            <FileLabel
                htmlFor={id}
                cursorPointer={props.cursorPointer}
                color={color}
                hoverColor={hoverColor}
                onDrop={handleDragEvent}
                onDragOver={prevent}
                onDragEnter={prevent}
                onDragLeave={prevent}
            >
                {props.children}
            </FileLabel>
        </Container>
    );
}
