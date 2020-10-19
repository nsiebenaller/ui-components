import styled from "styled-components";
import { colors } from "../../colors";

interface Props {
    currentMonth: boolean;
    selected: boolean;
    outlined: boolean;
}

export const CalendarContainer = styled.div`
    width: 350px;
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    padding: 10px;
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export const Week = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Day = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    color: ${({ currentMonth, selected }: Props) => {
        if (selected) return "white";
        if (currentMonth) return colors["grey-900"];
        return colors["grey-500"];
    }};
    background: ${({ selected }: Props) => {
        if (selected) return colors["blue-500"];
        return "transparent";
    }};
    border: ${({ outlined }: Props) =>
        outlined ? `1px solid ${colors["blue-500"]}` : "1px solid transparent"};
    &:hover {
        background: ${({ selected }: Props) => {
            if (selected) return colors["blue-300"];
            return colors["grey-200"];
        }};
    }
`;
export const DayHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        flex: 1;
        text-align: center;
        font-weight: bold;
    }
`;

export const NavHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
export const NavLabel = styled.div`
    flex: 1;
    text-align: center;
`;
export const NavControl = styled.div`
    cursor: pointer;
    svg {
        fill: ${colors["grey-700"]};
    }
    &:hover {
        background: ${colors["grey-200"]};
        svg {
            fill: ${colors["grey-900"]};
        }
    }
`;
