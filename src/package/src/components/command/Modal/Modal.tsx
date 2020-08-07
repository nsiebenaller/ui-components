import React from "react";
import { Container } from "./style";
import { renderChildren } from "../utils";

interface Props {
    children: React.ReactNode | undefined;
    drop?: () => void;
    className?: string;
    style?: string;
}
export default function Modal({ children, drop, className, style }: Props) {
    return (
        <Container className={className} css={style}>
            {renderChildren(children, { drop })}
        </Container>
    );
}
