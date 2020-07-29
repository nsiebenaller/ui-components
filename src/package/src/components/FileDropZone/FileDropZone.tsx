import React, { useState } from "react";
import { Container, FileInput, FileLabel } from "./style";
import uniqueId from "../../helpers/uniqueId";

interface Props {
    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

    /** *Optional* - Changes the cursor of the icon to pointer */
    cursorPointer?: boolean;

    /** *Optional* - Color to use for the background (default: white) */
    color?: string;

    /** *Optional* - Color to use for the hovered background (default: white) */
    hoverColor?: string;
}
export default function FileDropZone(props: Props) {
    const [id] = useState(uniqueId("filedropzone"));
    return (
        <Container>
            <p>FileDropZone</p>
            <FileInput id={id} type="file" />
            <FileLabel htmlFor={id}>{props.children}</FileLabel>
        </Container>
    );
}
