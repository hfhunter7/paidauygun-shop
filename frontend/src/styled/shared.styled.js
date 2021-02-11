import styled from 'styled-components'

export const Text = styled.span`
  font-size: 16px;

  ${(props) => props.bold && `font-weight: bold;`}
  ${(props) => props.size && `font-size: ${props.size}px;`}
  ${(props) => props.color && `color: ${props.color};`}
`
