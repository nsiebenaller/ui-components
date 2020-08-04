import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import uniqueId from "../../helpers/uniqueId";
import Alert from "./Alert";
import { HookStyle } from "./style";

let hookRef: HTMLDivElement;
export default function alert() {
    const hook = document.createElement("div");
    hook.innerHTML = "poopy hook";
    hook.id = uniqueId("alert");
    hook.setAttribute("style", HookStyle);
    document.getElementsByTagName("BODY")[0].appendChild(hook);
    hookRef = hook;

    const handleClose = () => {
        hookRef.remove();
    };

    ReactDOM.render(<Alert close={handleClose} />, hook);
}
