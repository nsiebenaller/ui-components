import styled from "styled-components";
import colors from "../../colors/index";
const { grey } = colors;

interface Props {
    color: string;
    value?: boolean;
}
export const Base = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    > div:first-child {
        padding: 5px;
        border-radius: 50px;
        transition: all 0.2s ease-out;
        fill: ${(props: Props) => {
            if (props.value) return props.color;
            return grey[700];
        }};
    }
    > div:first-child:hover {
        background: ${grey[200]};
        fill: ${(props: Props) => {
            return props.color;
        }};
    }
`;

export const Label = styled.div`
    font-size: 1rem;
    padding-left: 5px;
`;
