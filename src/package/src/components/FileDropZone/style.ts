import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`;

export const FileInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
`;

export const FileLabel = styled.label`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #616161;
    background: white;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 3px dashed #9e9e9e;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
