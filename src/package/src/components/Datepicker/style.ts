import styled from "styled-components";
import { colors } from "../../colors/index";

interface Props {
    visible?: boolean;
    focused?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    errorOutline?: boolean;
    open?: boolean;
    showTimeHelper?: boolean;
}
export const Base = styled.div`
    position: relative;
    display: inline-block;
`;

export const ButtonContainer = styled.div`
    transition: all 0.2s ease-out;
    border: ${(props: Props) => {
        if (props.disabled) return `1px solid ${colors["grey-500"]} !important`;
        if (props.errorOutline)
            return `1px solid ${colors["red-500"]} !important`;
        if (props.focused) return `1px solid black`;
        return `1px solid ${colors["grey-500"]}`;
    }};
    background: ${(props: Props) => {
        if (props.disabled) return colors["grey-300"];
        return "white";
    }};
    border-left: 1px solid transparent !important;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 0;
    display: flex;
    align-items: center;
    cursor: ${(props: Props) => (props.disabled ? "default" : "pointer")};
    padding-left: 2px;
    padding-right: 2px;
`;

export const CalendarButton = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: ${(props: Props) => (props.showTimeHelper ? "5px" : "0px")};
    svg {
        transition: all 0.2s ease-out;
        fill: ${(props: Props) => {
            if (props.open) return "black";
            return colors["grey-500"];
        }};
    }
    &:hover svg {
        fill: ${(props: Props) =>
            props.disabled ? colors["grey-500"] : "black"};
    }
`;

export const TimeButton = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    svg {
        transition: all 0.2s ease-out;
        fill: ${(props: Props) => {
            if (props.open) return "black";
            return colors["grey-500"];
        }};
    }
    &:hover svg {
        fill: ${(props: Props) =>
            props.disabled ? colors["grey-500"] : "black"};
    }
`;

export const Input = styled.input`
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: ${(props: Props) => {
        if (props.disabled) return `1px solid ${colors["grey-500"]} !important`;
        if (props.errorOutline)
            return `1px solid ${colors["red-500"]} !important`;
        if (props.focused) return `1px solid black`;
        return `1px solid ${colors["grey-500"]}`;
    }};
    padding: 10px 14px;
    margin: 0;
    outline: 0;
    transition: all 0.2s ease-out;
    background: ${(props: Props) => {
        return props.disabled ? colors["grey-300"] : "white";
    }};
    &:hover,
    &:focus {
        border: ${(props: Props) => {
            if (props.disabled) return `1px solid ${colors["grey-500"]}`;
            return "1px solid black";
        }};
    }
    width: ${(props: Props) => (props.fullWidth ? "100%" : "auto")};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export const InputBase = styled.div`
    border-radius: 5px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    transition: all 0.2s ease-out;

    &:hover > ${ButtonContainer} {
        border: 1px solid black;
        border-left: 1px solid transparent;
    }
    &:hover > ${Input} {
        border: 1px solid black;
    }
`;

export const Error = styled.div`
    font-size: 0.75rem;
    color: ${colors["red-500"]};
    opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;

export const CalendarHook = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    user-select: none;
    pointer-events: none;
    display: ${(props: Props) => (props.open ? "inline-block" : "none")};
    > * {
        display: inline-table !important;
        pointer-events: all !important;
        border-radius: 5px !important;
        border: 1px solid transparent !important;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22) !important;
    }
    .react-calendar__tile--now {
        border: 1px solid #006edc;
        background: white;
        color: black;
        &:hover {
            background: #e6e6e6;
        }
    }
    .react-calendar__month-view__days__day--weekend {
        color: black;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575 !important;
    }
    .react-calendar__tile--active {
        background: #006edc !important;
        color: white !important;
    }
`;

export const TimeHook = styled.div`
    display: ${(props: Props) => (props.open ? "inline-block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    user-select: none;
    pointer-events: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background: white;
    border-radius: 5px;
    padding: 5px;
`;

export const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all !important;
`;

export const Spinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    margin-left: 5px;
    margin-right: 5px;
    > div {
        font-size: 2em;
    }
    svg {
        fill: ${colors["grey-500"]};
        &:hover {
            fill: black !important;
        }
    }
`;
