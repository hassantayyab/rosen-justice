import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { Container } from '../layouts'
import { BackgroundImage, HorizontalLine, VerticalLine } from '../utils'
import { ButtonFab } from '../common/button-fab'
import { Button, FormModal } from '../common'
import { ImgHeaderBgLogo, ImgLogoText } from '../../images'
import {
	slideInUp,
	slideInDown,
	fadeInRight,
	fadeInLeft,
} from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const slideInUpAnimation = keyframes`${slideInUp}`
const slideInDownAnimation = keyframes`${slideInDown}`
const fadeInLeftAnimation = keyframes`${fadeInLeft}`
const fadeInRightAnimation = keyframes`${fadeInRight}`

const Hero = styled.div`
	position: relative;
	height: 50rem;
	background: linear-gradient(
		0deg,
		rgba(20, 23, 40, 0.4) 75%,
		rgba(20, 23, 40, 0.9) 92%
	);

	.bg-logo {
		position: absolute;
		width: 50rem;
		left: -12%;
		bottom: 0;
		z-index: 0;

		@media ${device.md} {
			display: none;
		}
	}

	.bg-filter {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;

		background: linear-gradient(
			0deg,
			rgba(20, 23, 40, 0.7) 10%,
			rgba(20, 23, 40, 0) 20%
		);
	}

	.lawyers-image {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		width: 100%;
		height: 100%;

		.gatsby-image-wrapper {
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			height: 100%;
		}
	}

	.logo-text {
		position: absolute;
		max-width: 78rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
		width: 60rem;
		top: 20%;
		opacity: 0;
		&.animate {
			opacity: 1;
			animation: 1.5s ${slideInDownAnimation};
		}
	}

	.content-wrapper {
		position: relative;
		z-index: 2;
		margin: 0 auto;
		text-align: center;
		max-width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--color-light);

		.text-wrapper {
			margin-top: auto;
			margin-bottom: 7rem;
		}

		.btn-wrapper {
			position: absolute;
			bottom: -4%;

			#button-fab {
				z-index: 3;
			}

			#vertical-line {
				margin: 0 auto;
				margin-bottom: 1rem;
			}
		}

		.sub-heading {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.h-first {
				width: 100%;
				opacity: 0;
				&.animate {
					opacity: 1;
					animation: 1.5s ${fadeInLeftAnimation};
				}
			}

			.h-last {
				width: 100%;
				opacity: 0;
				&.animate {
					opacity: 1;
					animation: 1.5s ${fadeInRightAnimation};
				}
			}

			h6 {
				text-transform: uppercase;
				font-size: 1rem;
				font-weight: lighter;
				color: var(--color-light);
				padding: 0 1rem;
				flex-shrink: 0;
				margin-top: 0.25rem;
				opacity: 0;
				&.animate {
					opacity: 1;
					animation: 1.5s ${slideInUpAnimation};
				}
			}
		}

		h2 {
			margin-top: 0.5rem;
			margin-bottom: 0.8rem;
			font-weight: normal;
			font-size: 4rem;
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 1.5s ${slideInDownAnimation} ease-in-out;
			}
		}

		#button {
			margin-top: 2.75rem;
		}

		p {
			text-transform: uppercase;
		}
	}

	@media ${device.md} {
		.logo-text {
			width: 87%;
		}

		.content-wrapper {
			max-width: 100%;

			#button {
				margin-top: 1rem;
			}
		}
	}

	@media ${device.sm} {
		height: 42rem;

		.lawyers-image {
			.gatsby-image-wrapper {
				width: 100%;
			}
		}

		.content-wrapper {
			h2 {
				font-size: 3.5rem;
			}
		}
	}

	@media ${device.xs} {
		margin-top: 2.9rem;

		.bg-filter {
			background: linear-gradient(
				0deg,
				rgba(20, 23, 40, 1) 35%,
				rgba(20, 23, 40, 0) 65%
			);
			z-index: 2;
		}

		#background-image {
			height: 68%;
		}

		.lawyers-image {
			height: 68%;
			z-index: 1;
			bottom: 31.95%;
		}

		.content-wrapper {
			.sub-heading {
				flex-wrap: wrap;
				justify-content: center;
				position: relative;

				.h-first {
					display: none;
				}

				.h-last {
					&.animate {
						animation: none;
					}
				}

				#horizontal-line {
					position: absolute;
					top: 50%;
					right: 0;
					width: 2rem;
					height: 2px;
				}

				h6 {
					padding: 0 2rem;
					flex-shrink: 1;
				}
			}
		}
	}
`

const HeroComponent = ({ data, scrollRef }) => {
	const [ref, inView] = useInView(View)

	const [modalIsOpen, setIsOpen] = useState(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<Hero id='hero' ref={ref}>
			<div className='bg-logo'>
				<img src={ImgHeaderBgLogo} alt='header bg logo' />
			</div>
			<div className='bg-filter'></div>
			<div className={`logo-text ${animate(inView)}`}>
				<img src={ImgLogoText} alt='website name text' />
			</div>
			<BackgroundImage
				image={getImage(data.heroBgImage?.localFile)}
				alt={data.heroBgImage?.altText}
				loading='lazy'
			/>
			<Container>
				<div className='lawyers-image'>
					{data.heroFrontImage && (
						<GatsbyImage
							image={getImage(data.heroFrontImage?.localFile)}
							alt={data.heroFrontImage?.altText}
						/>
					)}
				</div>
				<div className='content-wrapper'>
					<div className='text-wrapper'>
						{data.heroHeading && (
							<h2 className={animate(inView)}>{data.heroHeading}</h2>
						)}
						{data.heroSubheading && (
							<div className='sub-heading'>
								<div className={`h-first ${animate(inView)}`}>
									<HorizontalLine width='100%' />
								</div>
								<h6 className={`font-heading-sm  ${animate(inView)}`}>
									{data.heroSubheading}
								</h6>
								<div className={`h-last ${animate(inView)}`}>
									<HorizontalLine width='100%' />
								</div>
							</div>
						)}
						<Button
							bgColor='var(--color-secondary)'
							onClick={openModal}
							onKeyDown={openModal}>
							Request a free consultation
						</Button>
					</div>
					<div className='btn-wrapper'>
						<VerticalLine color='var(--color-dark-200)' />
						<ButtonFab scrollRef={scrollRef} />
					</div>
				</div>
			</Container>

			<FormModal isOpen={modalIsOpen} togglePlayer={closeModal} />
		</Hero>
	)
}

export const query = graphql`
	fragment HeroFragment on WpPage {
		_hero {
			heroHeading
			heroSubheading
			heroFrontImage {
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
			heroBgImage {
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

export { HeroComponent as Hero }
