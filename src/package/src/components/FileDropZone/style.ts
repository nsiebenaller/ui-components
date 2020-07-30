import styled from "styled-components";

interface Props {
    cursorPointer?: boolean;
    color?: string;
    hoverColor?: string;
}

export const Container = styled.div`
    position: relative;
    display: inline-block;
`;

export const FileInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    box-sizing: border-box;
`;

export const FileLabel = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #616161;
    background: white;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 3px dashed #9e9e9e;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: ${(props: Props) => (props.cursorPointer ? "pointer" : "default")};
    background: ${(props: Props) => (props.color ? props.color : "white")};
    &:hover {
        background: ${(props: Props) =>
            props.hoverColor ? props.hoverColor : "white"};
    }
`;
