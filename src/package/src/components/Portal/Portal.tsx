import React from "react";
import ReactDOM from "react-dom";

interface Props {
    children: React.ReactNode;
    container?: Element;
}
export default function Portal({ children, container }: Props) {
    return ReactDOM.createPortal(
        children,
        container || document.getElementsByTagName("BODY")[0]
    );
}
