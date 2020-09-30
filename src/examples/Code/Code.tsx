import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

interface Props {
    openId: number;
    text: string;
    toggleVisibility: (id: number) => void;
}
export default function Code({ openId, text, toggleVisibility }: Props) {
    const [id, setId] = React.useState<number>(Math.random() * 100);
    const onClick = () => toggleVisibility(id);

    if (openId !== id) {
        return (
            <div>
                <span className={"link"} onClick={onClick}>
                    Show Code
                </span>
            </div>
        );
    }

    return (
        <div>
            <div>
                <span className={"link"} onClick={onClick}>
                    Hide Code
                </span>
            </div>
            <CodeBlock text={text} language={"jsx"} theme={dracula} />
        </div>
    );
}
