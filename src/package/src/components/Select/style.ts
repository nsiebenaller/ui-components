import styled from "styled-components";
import { colors } from "../../colors";

interface Props {
    open?: boolean;
    disabled?: boolean;
    errorOutline?: boolean;
    visible?: boolean;
    allowInput?: boolean;
    fullWidth?: boolean;
    styledCSSList?: string;
}
export const Base = styled.div`
    position: relative;
    display: ${(props: Props) => (props.fullWidth ? "block" : "inline-block")};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export const Label = styled.div`
    opacity: ${(props: Props) => (props.visible ? "1" : "0")};
    cursor: ${(props: Props) => (props.visible ? "auto" : "default")};
`;

export const InputBase = styled.div`
    position: relative;
    display: ${(props: Props) => (props.fullWidth ? "block" : "inline-block")};
    width: ${(props: Props) => (props.fullWidth ? "100%" : "auto")};
    > div {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: ${colors["grey-500"]};
        transition: all 0.2s ease-out;
    }
    &:hover > div {
        fill: ${(props: Props) => {
            if (props.errorOutline) return `1px solid ${colors["red-500"]}`;
            if (props.disabled) return `${colors["grey-500"]}`;
            return "black";
        }};
    }
    &:hover > input {
        border: ${(props: Props) => {
            if (props.errorOutline) return `1px solid ${colors["red-500"]}`;
            if (props.disabled) return `1px solid ${colors["grey-500"]}`;
            return "1px solid black";
        }};
    }
`;

export const Input = styled.input`
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #9e9e9e;
    padding: 10px 14px;
    outline: 0;
    transition: all 0.2s ease-out;
    width: 100%;
    text-overflow: ellipsis;
    width: ${(props: Props) => (props.fullWidth ? "100%" : "auto")};
    height: 39px;
    cursor: ${(props: Props) => {
        if (props.disabled) return "default";
        if (props.allowInput) return "auto";
        return "pointer";
    }};
    background: ${(props: Props) =>
        props.disabled ? colors["grey-200"] : "white"};
    &:hover,
    &:focus {
        border: ${(props: Props) => {
            if (props.errorOutline) return `1px solid ${colors["red-500"]}`;
            if (props.disabled) return `1px solid ${colors["grey-500"]}`;
            return "1px solid black";
        }};
    }
    border: ${(props: Props) => {
        if (props.errorOutline) return `1px solid ${colors["red-500"]}`;
        if (props.open) return "1px solid black;";
        return "1px solid #9e9e9e";
    }};
`;

export const List = styled.div`
    margin: 1px;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    z-index: 10;
    background-color: white;
    padding: 10px 0px;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    outline: 0;
    display: ${(props: Props) => (props.open ? "block;" : "none;")};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${(props: Props) => props.styledCSSList}
`;

export const Error = styled.div`
    font-size: 0.75rem;
    color: ${colors["red-500"]};
    opacity: ${(props: Props) => (props.visible ? "1" : "0")};
    cursor: ${(props: Props) => (props.visible ? "auto" : "default")};
`;
