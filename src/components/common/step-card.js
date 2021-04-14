import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

const StepCard = styled.div`
	display: flex;
	flex-direction: column;
	width: 15rem;
	background-color: var(--color-primary);
	text-align: center;

	:hover,
	:focus {
		.image-wrapper {
			transform: scale(1.1);
		}

		.content-wrapper {
			color: var(--color-secondary);
		}
	}

	.image-wrapper {
		display: inline-block;
		margin: -3rem auto 0 auto;
		position: relative;
		background-color: var(--color-secondary);
		border-radius: 50%;
		border: 0.25rem solid var(--color-light);
		padding: 1.5rem;
		text-align: center;
		width: 6rem;
		height: 6rem;
		line-height: 0;
		transition: all 0.2s ease-in-out;
	}

	.content-wrapper {
		padding: 3.5rem 1.5rem;
		color: var(--color-light);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: all 0.2s ease-in-out;
	}
`

const StepCardComponent = ({ image, altText, content }) => {
	return (
		<StepCard id='step-card'>
			<div className='image-wrapper'>
				{image && <GatsbyImage image={image} alt={altText} />}
			</div>

			<div className='content-wrapper'>
				<h6 className='f-dm-normal'>{content}</h6>
			</div>
		</StepCard>
	)
}

export { StepCardComponent as StepCard }
