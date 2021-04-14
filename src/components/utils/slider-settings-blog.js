import React from 'react'
import { size } from '../../globalStyles'
import { ArrowButton } from './arrow-button'

export const sliderSettingsBlog = {
	infinite: true,
	nextArrow: <ArrowButton direction='right' />,
	prevArrow: <ArrowButton direction='left' />,
	speed: 500,
	className: 'custom-slider',
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: false,
	variableWidth: true,
	responsive: [
		{
			breakpoint: size.md,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: size.sm,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: size.xs,
			settings: {
				slidesToShow: 1,
			},
		},
	],
}
