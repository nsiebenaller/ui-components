import React from "react";

interface Props {
    children: React.ReactNode;
}
export default function Example({ children }: Props) {
    return <div className={"example-container"}>{children}</div>;
}
