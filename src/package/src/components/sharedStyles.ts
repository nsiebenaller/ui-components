import styled from "styled-components";

interface LabelProps {
    visible: boolean;
}
export const Label = styled.div`
    opacity: ${({ visible }: LabelProps) => (visible ? "1" : "0")};
    cursor: ${({ visible }: LabelProps) => (visible ? "auto" : "default")};
`;
