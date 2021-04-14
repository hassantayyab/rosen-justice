import React from 'react'
import { ArrowButton } from './arrow-button'

export const sliderSettings = {
	infinite: false,
	nextArrow: <ArrowButton direction='right' />,
	prevArrow: <ArrowButton direction='left' />,
	speed: 500,
	className: 'custom-slider',
	slidesToShow: 1,
	slidesToScroll: 1,
}
