import React from "react";
import { Container } from "./style";

interface Props {
    children: React.ReactNode | undefined;
}
export default function Modal(props: Props) {
    return <Container>{props.children}</Container>;
}
