import React, { useState, useRef } from "react";
import { Portal } from "../../../package/dist";

function PortalPage() {
    const [open, setOpen] = useState<boolean>(false);
    const container = useRef(null);

    return (
        <div>
            <h1>Portal Component</h1>
            <p>
                Portal is a simple wrapper around ReactDOM's createPortal
                function. It is useful for rendering components outside of the
                current DOM hierarchy. Portal is a component allowing it to be
                rendered more naturally alongside other DOM elements. If Portal
                is not given a container to render into then Portal will default
                to rendering into <code>{"<body>"}</code>.
            </p>
            <button onClick={() => setOpen(!open)}>Toggle</button>
            <div ref={container}>
                <div>I am a container: </div>
            </div>
            {open && (
                <Portal container={container.current || undefined}>
                    <b>Hello! I am from a portal!</b>
                </Portal>
            )}
        </div>
    );
}
PortalPage.pageName = "Portal";
export default PortalPage;
