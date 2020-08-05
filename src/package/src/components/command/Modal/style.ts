import styled from "styled-components";

export const Container = styled.div`
    overflow: auto;
    z-index: 10;
    background-color: white;
    padding: 15px 15px;
    width: 400px;
    top: 200px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    outline: 0;
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
`;
