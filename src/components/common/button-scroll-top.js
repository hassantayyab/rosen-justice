import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { ImgDownArrow } from '../../images'
import { useEffect } from 'react'
import { useState } from 'react'
import { zoomIn } from 'react-animations'
import scrollTo from 'gatsby-plugin-smoothscroll'

const zoomInAnimation = keyframes`${zoomIn}`

const ButtonScrollTop = styled.button`
	position: fixed;
	z-index: 3;
	bottom: 5%;
	right: 5%;
	display: none;
	width: 3.75rem;
	height: 3.75rem;
	border-radius: 50%;
	line-height: 1;
	border: none;
	color: var(--color-light);
	outline: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
	background-color: var(--color-secondary);

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
		filter: brightness(0%) invert(100%);
		transform: rotate(180deg);
	}

	@media ${device.sm} {
		display: inline-flex;
		animation: 0.5s ${zoomInAnimation};
	}
`

const isBrowser = typeof window !== 'undefined'

const ButtonScrollTopComponent = () => {
	const [visible, setvisible] = useState(false)

	useEffect(() => {
		if (isBrowser) {
			document.addEventListener('scroll', () => {
				window.scrollY > 560 ? setvisible(true) : setvisible(false)
			})
		}
		return () => {
			setvisible(false)
		}
	}, [])

	return (
		<>
			{visible && (
				<ButtonScrollTop
					id='button-scroll-top'
					onClick={() => scrollTo('#hero', 'end')}>
					<img src={ImgDownArrow} alt='arrow' />
				</ButtonScrollTop>
			)}
		</>
	)
}

export { ButtonScrollTopComponent as ButtonScrollTop }
