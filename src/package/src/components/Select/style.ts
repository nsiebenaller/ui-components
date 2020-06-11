import styled from "styled-components";

interface Props {
  open?: boolean;
  disabled?: boolean;
  errorOutline?: boolean;
  visible?: boolean;
}
export const Base = styled.div`
  position: relative;
  display: inline-block;
`;

export const Label = styled.div`
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;

export const InputBase = styled.div`
  position: relative;
  display: inline-block;
  > div {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: #9e9e9e;
    transition: all 0.2s ease-out;
  }
  &:hover > div {
    cursor: pointer;
    fill: ${(props: Props) => {
      if (props.errorOutline) return "1px solid #f44336";
      if (props.disabled) return "#9e9e9e";
      return "black";
    }};
  }
  &:hover > input {
    border: ${(props: Props) => {
      if (props.errorOutline) return "1px solid #f44336";
      if (props.disabled) return "1px solid #9e9e9e";
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
  cursor: ${(props: Props) => (props.disabled ? "default" : "pointer")};
  &:hover,
  &:focus {
    border: ${(props: Props) => {
      if (props.errorOutline) return "1px solid #f44336";
      if (props.disabled) return "1px solid #9e9e9e";
      return "1px solid black";
    }};
  }
  border: ${(props: Props) => {
    if (props.errorOutline) return "1px solid #f44336";
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
`;

export const Error = styled.div`
  font-size: 0.75rem;
  color: #f44336;
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
`;
