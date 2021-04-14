import { graphql } from 'gatsby'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { Button, FormModal } from '../common'
import { Container } from '../layouts'
import { BackgroundImage } from '../utils'
import { ImgQuoteLine } from '../../images'
import { getImage } from 'gatsby-plugin-image'
import fadeInDown from 'react-animations/lib/fade-in-down'
import { fadeIn } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const fadeInDownAnimation = keyframes`${fadeInDown}`
const fadeInAnimation = keyframes`${fadeIn}`

const QuoteSection = styled.div`
	height: 56rem;
	position: relative;
	background: linear-gradient(
		0deg,
		rgba(20, 23, 40, 1) 0%,
		rgba(20, 23, 40, 1) 20%,
		rgba(20, 23, 40, 0.7) 75%
	);

	.bg-line {
		position: absolute;
		width: 59rem;
		top: 55%;
		left: 50%;
		transform: translateX(-50%);
	}

	.content-wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		text-align: center;
		width: 46rem;
		margin: 0 auto;
		padding-bottom: 10rem;
		position: relative;

		.left-bar,
		.right-bar {
			display: none;
			width: 3rem;
			height: 75%;
			border-top: 2px solid var(--color-light);
			border-bottom: 2px solid var(--color-light);
		}
		.left-bar {
			left: 0;
			margin-right: 1rem;
			border-left: 2px solid var(--color-light);
		}
		.right-bar {
			right: 0;
			margin-left: 1rem;
			border-right: 2px solid var(--color-light);
		}

		h3 {
			color: var(--color-secondary);
			margin-top: 0;
			margin-bottom: 1rem;
			opacity: 0;

			&.animate {
				opacity: 1;
				animation: 2.5s ${fadeInDownAnimation};
			}
		}

		p {
			color: var(--color-light);
			margin-bottom: 2.5rem;
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 5s ${fadeInAnimation};
			}
		}

		#button {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	@media ${device.md} {
		.bg-line {
			top: 66%;
		}

		.content-wrapper {
			padding-bottom: 4rem;
		}
	}

	@media (max-width: 840px) {
		.bg-line {
			display: none;
		}

		.content-wrapper {
			.text-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;

				.left-bar,
				.right-bar {
					display: inline-block;
				}
			}
		}
	}

	@media ${device.sm} {
		background: linear-gradient(
			0deg,
			rgba(20, 23, 40, 1) 0%,
			rgba(20, 23, 40, 1) 42%,
			rgba(20, 23, 40, 0.7) 75%
		);

		.content-wrapper {
			width: 100%;

			h3 {
				font-size: 2.25rem;
			}

			p {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 14;
			}

			#button {
				width: 90%;
			}
		}
	}
`

const QuoteSectionComponent = ({ data }) => {
	const [ref, inView] = useInView(View)

	const [modalIsOpen, setIsOpen] = useState(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<QuoteSection id='quote-section'>
			<BackgroundImage
				image={getImage(data.quoteBgImage?.localFile)}
				alt={data.quoteBgImage?.altText}
			/>
			<div className='bg-line'>
				<img src={ImgQuoteLine} alt='outline' />
			</div>
			<Container>
				<div className='content-wrapper'>
					<div className='text-wrapper'>
						<div className='left-bar' />
						<div ref={ref}>
							<h3 className={animate(inView)}>{data.quoteHeading}</h3>
							<p className={animate(inView)}>{data.quoteContent}</p>
							<Button
								bgColor='var(--color-secondary)'
								onClick={openModal}
								onKeyDown={openModal}>
								Request for a free quote
							</Button>
						</div>
						<div className='right-bar' />
					</div>
				</div>
			</Container>

			<FormModal isOpen={modalIsOpen} togglePlayer={closeModal} />
		</QuoteSection>
	)
}

export const query = graphql`
	fragment QuoteFragment on WpPage {
		_quote {
			quoteHeading
			quoteContent
			quoteBgImage {
				altText
				localFile {
					childImageSharp {
						gatsbyImageData(
							quality: 100
							layout: FULL_WIDTH
							placeholder: BLURRED
							formats: [WEBP]
						)
					}
				}
			}
		}
	}
`

export { QuoteSectionComponent as QuoteSection }
