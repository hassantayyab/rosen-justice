import { navigate } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { ImgDownArrow } from '../../images'
import scrollTo from 'gatsby-plugin-smoothscroll'

const ButtonFab = styled.button`
	position: relative;
	display: inline-flex;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	line-height: 1;
	border: none;
	color: var(--color-light);
	outline: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
	background-color: ${({ bgColor }) =>
		bgColor ? bgColor : 'var(--color-light)'};

	:hover,
	:focus {
		filter: brightness(90%);
	}

	img {
		position: absolute;
		top: 50%;
		bottom: 50%;
		left: 0;
		right: 0;
		width: 1rem;
		height: 1rem;
		margin: auto;
	}
`

const ButtonFabComponent = ({ bgColor, link, scrollRef }) => {
	const scrollToRef = () => scrollTo(scrollRef)

	return (
		<ButtonFab
			id='button-fab'
			bgColor={bgColor}
			onClick={() => (scrollRef ? scrollToRef() : navigate(link))}>
			<img src={ImgDownArrow} alt='arrow' />
		</ButtonFab>
	)
}

export { ButtonFabComponent as ButtonFab }
