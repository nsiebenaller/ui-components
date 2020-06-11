import styled from 'styled-components'
import { grey, red } from '../../colors/index.json'

interface Props {
    fullWidth?: boolean;
    visible?: boolean;
    disabled?: boolean;
}

export const Base = styled.div`
  position: relative;
  display: inline-flex;
    flex-direction: column;
`;

export const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid ${grey[500]};
    padding: 10px 14px;
    outline: 0;
    transition: border .2s ease-out;
    background: ${(props: Props) => (props.disabled) ? grey[200] : "white"};
    min-height: 17px;
    &:hover, &:focus {
        border: ${(props: Props) => (props.disabled) ? `1px solid ${grey[500]}` : "1px solid black"};
    }
    width: ${(props: Props) => (props.fullWidth) ? "100%;" : "auto;"};
`;

export const Label = styled.div`
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;

export const Error = styled.div`
  font-size: 0.75rem;
  color: ${red[500]};
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;

