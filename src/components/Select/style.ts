import styled from 'styled-components'

export const Base = styled.div`
    position: relative;
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
`