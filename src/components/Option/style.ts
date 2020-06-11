import styled from "styled-components";

interface Props {
  selected?: boolean;
  targeted?: boolean;
  centered?: boolean;
}
export const OptionBase = styled.div`
  position: relative;
  padding: 10px 14px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  cursor: pointer;
  background: ${({ targeted, selected }: Props) =>
    targeted || selected ? "#e0e0e0" : "white"};
  text-align: ${(props: Props) => (props.centered ? "center" : "left")};
  &:hover {
    background: #eeeeee;
  }
`;
