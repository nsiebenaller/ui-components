import styled from 'styled-components'

interface Props {
    color: string;
    textColor: string;
    hoverColor: string;
    variant: "default" | "outlined" | "minimal";
}
export const Base = styled.div`
    position: relative;
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export const ButtonBase = styled.button`
    background: ${(props: Props) => {
        if(props.variant === "default") return props.color
        return "white"
    }};
    border: ${(props: Props) => {
        if(props.variant === "default") return "none"
        return `1px solid ${props.color}`
    }};
    color: ${(props: Props) => {
        if(props.variant === "default") return props.textColor
        return props.color
    }};
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 14px;
    margin: 0;
    min-height: 39px;
    font-weight: bold;
    letter-spacing: 0.5px;
    box-shadow: ${(props: Props) => {
        if(props.variant === "default") return "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        return "none"
    }};
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    &:hover {
        box-shadow: none;
        background: ${(props: Props) => {
            return props.hoverColor
        }};
    }
`

export const TopPad = styled.div`
    opacity: 0;
    cursor: default;
`

export const BotPad = styled.div`
    opacity: 0;
    font-size: 0.75rem;
    cursor: default;
`