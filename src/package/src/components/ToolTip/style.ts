import styled from "styled-components";

interface Props {
    show?: boolean;
}
export const PopUp = styled.div`
    position: fixed;
    background: #212121;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    ${({ show }: Props) => {
        if (show) {
            return `
                visibility: visible;
            `;
        } else {
            return `
                visibility: hidden;
                user-select: none;
            `;
        }
    }}
`;

export const Hook = styled.div`
    display: inline-flex;
`;
