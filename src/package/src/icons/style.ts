import styled from "styled-components";

interface Props {
    cursorPointer?: boolean;
    color?: string;
    topPad?: boolean;
    botPad?: boolean;
    rightPad?: boolean;
    leftPad?: boolean;
}
export const Base = styled.div`
    display: inline-flex;
    padding-top: ${(props: Props) => (props.topPad ? "5px" : "0px")};
    padding-bottom: ${(props: Props) => (props.botPad ? "5px" : "0px")};
    padding-right: ${(props: Props) => (props.rightPad ? "5px" : "0px")};
    padding-left: ${(props: Props) => (props.leftPad ? "5px" : "0px")};
    fill: ${(props: Props) => (props.color ? props.color : "black")};
    cursor: ${(props: Props) => (props.cursorPointer ? "pointer" : "default")};
`;
