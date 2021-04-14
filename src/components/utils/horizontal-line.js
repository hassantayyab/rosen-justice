import React from 'react'
import styled from 'styled-components'

const HorizontalLine = styled.div`
	width: ${({ width }) => (width ? width : '3rem')};
	background-color: ${({ color }) =>
		color ? color : 'var(--color-secondary)'};
	height: ${({ height }) => (height ? height : '1px')};
`

const HorizontalLineComponent = ({ height, color, width }) => {
	return (
		<HorizontalLine
			id='horizontal-line'
			className='horizontal-line'
			width={width}
			height={height}
			color={color}></HorizontalLine>
	)
}

export { HorizontalLineComponent as HorizontalLine }
