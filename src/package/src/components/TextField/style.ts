import styled from 'styled-components'
import colors from '../../colors'
const { grey, red } = colors

interface Props {
    fullWidth?: boolean;
    visible?: boolean;
    disabled?: boolean;
}

export const Base = styled.div`
  position: relative;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export const Label = styled.div`
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
  cursor: ${(props: Props) => (props.visible ? "auto" : "default")};
`;

export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid ${grey[500]};
    padding: 10px 14px;
    outline: 0;
    transition: all .2s ease-out;
    background: ${(props: Props) => (props.disabled) ? grey[200] : "white"};
    &:hover, &:focus {
        border: ${(props: Props) => (props.disabled) ? `1px solid ${grey[500]}` : "1px solid black"};
    }
    width: ${(props: Props) => (props.fullWidth) ? "100%" : "auto"};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const Error = styled.div`
  font-size: 0.75rem;
  color: ${red[500]};
  opacity: ${(props: Props) => (props.visible ? "1" : "0")};
  cursor: ${(props: Props) => (props.visible ? "auto" : "default")};
`;