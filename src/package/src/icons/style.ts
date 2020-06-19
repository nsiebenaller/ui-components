import styled from "styled-components";

interface Props {
    cursorPointer?: boolean;
}
export const Base = styled.div`
    display: inline-flex;
    cursor: ${(props: Props) => (props.cursorPointer ? "pointer" : "default")};
`;
