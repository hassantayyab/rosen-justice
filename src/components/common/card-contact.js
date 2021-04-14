import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { useCardContactQuery, useGeneralDataQuery } from '../../hooks'
import { Button } from './button'
import { ImgCallWhite, ImgCardOutline, ImgCardOutlineLarge } from '../../images'
import { pulse } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'

const pulseAnimation = keyframes`${pulse}`

const CardContact = styled.div`
	position: relative;
	overflow: hidden;
	background: linear-gradient(
		0deg,
		rgba(20, 23, 40, 0.9) 0%,
		rgba(20, 23, 40, 0.9) 100%
	);

	.outline-image {
		position: absolute;
		top: ${({ isForGrid }) => (isForGrid ? '52%' : '50%')};
		width: ${({ isForGrid }) => (isForGrid ? '75%' : '85%')};
		left: 50%;
		transform: translate(-50%, -50%);

		.gatsby-image-wrapper {
			width: 100%;
		}
	}

	.image-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(2px);
	}

	.content-wrapper {
		position: relative;
		color: var(--color-light);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: ${({ isForGrid }) => (isForGrid ? '3rem 20rem' : '3rem 10rem')};
		align-items: center;

		h4 {
			margin-top: 0;

			span.focus {
				color: var(--color-secondary);
			}
		}

		h6 {
			font-size: 1.5rem;
			margin-top: 2rem;
			margin-bottom: 2rem;
			opacity: 0;

			&.animate {
				opacity: 1;
				animation: ${pulseAnimation} 1.5s 3;
			}
		}

		#button {
			img {
				width: 1.25rem;
				margin-right: 0.5rem;
			}
		}
	}

	@media ${device.md} {
		.outline-image {
			top: ${({ isForGrid }) => isForGrid && '52%'};
			width: ${({ isForGrid }) => (isForGrid ? '78%' : '55%')};
		}

		.content-wrapper {
			padding: ${({ isForGrid }) => (isForGrid ? '3rem 15rem' : '3rem 30%')};
		}
	}

	@media (max-width: 900px) {
		.outline-image {
			width: ${({ isForGrid }) => (isForGrid ? '85%' : '75%')};
		}

		.content-wrapper {
			padding: ${({ isForGrid }) => (isForGrid ? '3rem 13rem' : '3rem 30%')};
		}
	}

	@media ${device.sm} {
		.outline-image {
			display: none;
		}

		.content-wrapper {
			padding: 3rem;
		}
	}

	@media ${device.xs} {
		.content-wrapper {
			padding: 1.25rem;

			h4 {
				font-size: 1.25rem;
			}

			h6 {
				font-size: 1rem;
				margin: 0.5rem 0 1rem 0;
			}
		}
	}
`

const CardContactComponent = ({ isForGrid }) => {
	const { cardHeading, cardSubheading, cardBgImage } = useCardContactQuery()
	const { contactNumber } = useGeneralDataQuery()

	const [ref, inView] = useInView(View)

	return (
		<CardContact id='card-contact' isForGrid={isForGrid} ref={ref}>
			<div className='outline-image'>
				{!isForGrid && (
					<img className='small' src={ImgCardOutline} alt='card outline' />
				)}
				{isForGrid && (
					<img className='large' src={ImgCardOutlineLarge} alt='card outline' />
				)}
			</div>
			<div className='image-wrapper'>
				{cardBgImage && (
					<GatsbyImage
						image={getImage(cardBgImage?.localFile)}
						alt={cardBgImage?.altText}
					/>
				)}
			</div>
			<div className='content-wrapper'>
				<h4>
					{cardHeading &&
						cardHeading.split(' ').map((word, i) => {
							if (i === 3 || i === 4) {
								return (
									<span key={i} className='focus'>
										{' '}
										{word}
									</span>
								)
							} else {
								return (
									<span key={i}>
										{i === 0 ? '' : ' '}
										{word}
									</span>
								)
							}
						})}
				</h4>
				<h6 className={animate(inView)}>{cardSubheading}</h6>
				<Button
					borderColor='var(--color-secondary)'
					bgColor='var(--color-secondary)'
					href={`tel:${contactNumber}`}>
					<img src={ImgCallWhite} alt='call us' />
					<span>{contactNumber}</span>
				</Button>
			</div>
		</CardContact>
	)
}

export { CardContactComponent as CardContact }
