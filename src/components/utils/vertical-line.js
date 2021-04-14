import React from 'react'
import styled from 'styled-components'

const VerticalLine = styled.div`
	width: ${({ width }) => (width ? width : '1px')};
	background-color: ${({ color }) =>
		color ? color : 'var(--color-secondary)'};
	height: ${({ height }) => (height ? height : '3rem')};
`

const VerticalLineComponent = ({ height, color, width }) => {
	return (
		<VerticalLine
			id='vertical-line'
			width={width}
			height={height}
			color={color}></VerticalLine>
	)
}

export { VerticalLineComponent as VerticalLine }
