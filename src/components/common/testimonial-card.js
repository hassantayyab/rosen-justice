import React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { HorizontalLine } from '../utils'

const TestimonialCard = styled.div`
	height: 19rem;
	padding: 2rem 8rem;
	background-color: var(--color-secondary);
	color: var(--color-light-200);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.text-wrapper {
		text-align: center;
		max-height: 11rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
	}

	#horizontal-line {
		margin: 1.25rem auto;
	}

	@media ${device.sm} {
		padding: 3rem 2rem;
		height: 22rem;
	}
`

const TestimonialCardComponent = ({ author, review }) => {
	return (
		<TestimonialCard>
			<div className='text-wrapper'>
				<h6>{review}</h6>
			</div>
			<HorizontalLine height='2px' width='3rem' color='var(--color-light)' />
			<h6 className='font-heading-sm'>{author}</h6>
		</TestimonialCard>
	)
}

export { TestimonialCardComponent as TestimonialCard }
