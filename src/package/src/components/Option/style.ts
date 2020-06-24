import styled from "styled-components";
import colors from "../../colors";
const { grey } = colors;

interface Props {
    selected?: boolean;
    targeted?: boolean;
    centered?: boolean;
    disabled?: boolean;
    css?: string;
}
export const OptionBase = styled.div`
    position: relative;
    padding: 10px 14px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    display: flex;
    align-items: center;
    color: ${(props: Props) => (props.disabled ? grey[500] : "black")};
    cursor: ${(props: Props) => (props.disabled ? "default" : "pointer")};
    background: ${({ targeted, selected }: Props) =>
        targeted || selected ? "#e0e0e0" : "white"};
    text-align: ${(props: Props) => (props.centered ? "center" : "left")};
    justify-content: ${(props: Props) =>
        props.centered ? "center" : "flex-start"};
    &:hover {
        background: ${(props: Props) => (props.disabled ? "white" : "#eeeeee")};
    }
    ${(props: Props) => props.css}
`;
