import styled from 'styled-components'

interface Props {
    open?: boolean;
}
export const Base = styled.div`
    position: relative;
    display: inline-block;
`


export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding: 10px 14px;
    outline: 0;
    transition: all .2s ease-out;
    &:hover, &:focus {
        border: 1px solid black;
    }
    border: ${(props: Props) => props.open ? "1px solid black;" : "1px solid lightgrey;"}
`

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
    display: ${(props: Props) => props.open ? "block;" : "none;"}
`