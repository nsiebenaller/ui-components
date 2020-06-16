import styled from "styled-components";
import { grey, red } from "../../colors/index.json";

interface Props {
  fullWidth?: boolean;
  visible?: boolean;
  disabled?: boolean;
}
export const Base = styled.div`
  position: relative;
  display: inline-block;
`;

export const InputBase = styled.div`
  border: 1px solid ${grey[500]};
  border-radius: 5px;
  padding: 0px 14px;
  display: flex;
  flex-direction: row;

  div {
    margin: 0px 5px;
    margin-top: 7px;
    margin-bottom: 7px;
  }
  input {
    padding: 2px;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    border: none;
    height: 100%;
    width: 2rem;
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  border-left: 1px solid ${grey[500]};
  margin: 0 !important;
`;

export const Label = styled.div`
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;

export const Error = styled.div`
  font-size: 0.75rem;
  color: ${red[500]};
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;
