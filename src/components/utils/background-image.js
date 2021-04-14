import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

const BackgroundImage = styled.div`
	position: absolute;
	z-index: -5;
	top: 0;
	left: ${({ align }) => (align === 'right' ? 'unset' : '0')};
	right: ${({ align }) => (align === 'left' ? 'unset' : '0')};
	bottom: 0;
	overflow: hidden;
	height: 100%;
	width: ${({ width }) => width && `${width}`};

	.gatsby-image-wrapper {
		height: 100%;
	}
`

/* Align has following values: 'left', 'right' */
const BackgroundImageComponent = ({
	image,
	alt,
	width,
	align,
	loading = 'lazy',
}) => {
	return (
		<BackgroundImage id='background-image' width={width} align={align}>
			{image && <GatsbyImage image={image} alt={alt} loading={loading} />}
		</BackgroundImage>
	)
}

export { BackgroundImageComponent as BackgroundImage }
