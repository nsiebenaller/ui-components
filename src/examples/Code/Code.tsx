import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

interface Props {
    text: string;
}
export default function Code({ text }: Props) {
    return (
        <div className={"code-container"}>
            <CodeBlock text={text} language={"jsx"} theme={dracula} />
        </div>
    );
}
