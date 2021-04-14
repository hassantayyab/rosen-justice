import React from 'react'
import styled from 'styled-components'
import { ImgArrow } from '../../images'

const ArrowButton = styled.div`
	background-color: var(--color-light-200);
	width: 2.5rem;
	height: 2.5rem;
	position: relative;
	display: inline-block;
	cursor: pointer;

	img {
		position: absolute;
		top: 50%;
		transform: ${({ direction }) =>
			direction === 'left'
				? 'translateY(-50%) rotate(180deg)'
				: 'translateY(-50%) rotate(0)'};
		left: ${({ direction }) => (direction === 'left' ? '-35%' : 'auto')};
		right: ${({ direction }) => (direction === 'right' ? '-35%' : 'auto')};
	}

	:hover,
	:focus {
		background-color: var(--color-light-200);
	}
`

const ArrowButtonComponent = ({
	direction = 'right',
	onClick,
	currentSlide,
	slideCount,
	...props
}) => {
	return (
		<ArrowButton
			id='arrow-button'
			direction={direction}
			onClick={onClick}
			className={
				direction === 'right'
					? currentSlide === slideCount - 1
						? ' slick-disabled'
						: ''
					: currentSlide === 0
					? ' slick-disabled'
					: ''
			}
			aria-hidden='true'
			aria-disabled={
				direction === 'right'
					? currentSlide === slideCount - 1
						? true
						: false
					: currentSlide === 0
					? true
					: false
			}
			type='button'
			{...props}>
			<img src={ImgArrow} alt='navigational button' />
		</ArrowButton>
	)
}

export { ArrowButtonComponent as ArrowButton }
