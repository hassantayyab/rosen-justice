import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { navigate } from 'gatsby'
import React from 'react'
import { fadeIn, fadeInLeft } from 'react-animations'
import InView, { useInView } from 'react-intersection-observer'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { device } from '../../globalStyles'
import { ImgR } from '../../images'
import { Button } from '../common'
import { BackgroundImage, HorizontalLine, VerticalLine } from '../utils'
import { Container } from '../layouts'

const fadeInAnimation = keyframes`${fadeIn}`
const fadeInLeftAnimation = keyframes`${fadeInLeft}`

const TopSection = styled.section`
	position: relative;
	color: var(--color-light);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(
		90deg,
		rgba(20, 23, 40, 0.95) 0%,
		rgba(20, 23, 40, 0.95) 100%
	);
	overflow: hidden;

	.bg-logo {
		position: absolute;
		z-index: 1;
		right: -3%;
		bottom: -1%;
		width: 36%;

		@media ${device.md} {
			display: none;
		}
	}

	.heading-wrapper {
		opacity: 0;
		&.animate {
			opacity: 1;
			animation: 1.5s ${fadeInLeftAnimation};
		}
	}

	#background-image {
		filter: blur(2px);
	}

	.heading-line {
		position: absolute;
		top: 17%;
		left: 0;
		width: 14%;

		#horizontal-line {
			position: static;
		}
	}

	@media ${device.lg} {
		.heading-line {
			width: 6%;
		}
	}

	@media (max-width: 1200px) {
		.heading-line {
			display: none;
		}
	}

	@media ${device.md} {
		.heading-line {
			display: block;
			top: 13%;
			width: 30%;
		}
	}

	@media ${device.sm} {
		.heading-line {
			top: 10%;
			width: 24%;
		}

		#container {
			padding: 0;
		}
	}

	@media ${device.xs} {
		.heading-line {
			top: 8%;
			width: 12%;
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.heading-wrapper {
		margin: 5rem 0 4rem 0;

		h3 {
			display: inline-block;

			span:first-of-type {
				color: var(--color-secondary);
			}
		}

		@media ${device.md} {
			width: 100%;
			text-align: center;

			h3 {
				text-align: left;
			}
		}

		@media ${device.sm} {
			margin: 2rem 0;
			padding: 0 1.5rem;
		}
	}

	.section-wrapper {
		height: 100%;
		background-color: var(--color-primary);
		padding: 4rem;
		position: relative;
		margin: 1.4rem 1.4rem 0 0;
		z-index: 2;

		#vertical-line {
			position: absolute;
			bottom: 0;
			left: 1.5rem;
		}
	}

	.v-line-desktop {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 100%;
		z-index: 2;
	}

	.h-line {
		#horizontal-line {
			position: absolute;
			right: 0;
			z-index: 2;
		}
	}

	.image-wrapper {
		position: absolute;
		right: -4%;
		bottom: 0;
		width: 45%;
		z-index: 2;

		.bg-logo-m {
			position: absolute;
			display: none;
			top: 8%;
			left: 4%;
			width: 90%;
		}

		.v-line-mobile {
			display: none;
		}

		.gatsby-image-wrapper {
			z-index: 4;
		}
	}

	.content-wrapper {
		width: 50%;

		.text-wrapper {
			h4 {
				margin-bottom: 1.5rem;
				color: var(--color-secondary);
				opacity: 0;

				&.animate {
					opacity: 1;
					animation: 3s ${fadeInAnimation};
				}
			}

			h1 {
				margin-bottom: 2.25rem;
			}

			p {
				color: var(--color-light-700);
				margin-bottom: 2.25rem;
			}
		}

		.badges {
			display: flex;
			justify-content: flex-start;
		}

		ul {
			:first-of-type {
				margin-right: 4rem;
			}

			li {
				&::before {
					display: none;
				}

				display: flex;
				align-items: flex-start;

				:not(:last-of-type) {
					margin-bottom: 2rem;
				}

				.gatsby-image-wrapper {
					flex-basis: 20%;
					margin-right: 1rem;
					> div {
						max-width: 100% !important;
					}
				}

				> div {
					flex-basis: 80%;
				}
			}
		}
	}

	@media (max-width: 1200px) {
		.image-wrapper {
			right: -2%;
		}
	}

	@media ${device.md} {
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		.image-wrapper {
			position: relative;
			height: 20rem;
			width: 60%;
			margin: -6rem auto 3rem auto;
			overflow: hidden;

			.bg-logo-m {
				display: inline-block;
			}
		}

		.content-wrapper {
			width: 100%;
			height: 100%;
		}
	}

	@media ${device.sm} {
		.v-line-desktop {
			display: none;
		}

		.h-line {
			#horizontal-line {
				position: absolute;
				right: 0;
				z-index: 2;
				width: 46%;
			}
		}

		.section-wrapper {
			margin-right: 0;
			background-color: transparent;
			padding: 0;

			#vertical-line {
				height: 45%;
				left: 1.5rem;
			}

			.image-wrapper {
				position: relative;
				right: 0;
				background-color: var(--color-primary);
				height: 18rem;
				width: calc(100% - 1.5rem);
				padding: 2rem 1.5rem 3rem 0;
				padding-right: 1.5rem;
				padding-bottom: 3rem;
				margin: 0 0 0 auto;

				.v-line-mobile {
					display: inline-block;
					position: absolute;
					bottom: 0;
					height: 100%;
					left: 0;

					#vertical-line {
						height: 70%;
					}
				}
			}

			.content-wrapper {
				background-color: var(--color-primary);
				padding: 3rem 1.5rem 0 1.5rem;

				.text-wrapper {
					margin-left: 1.75rem;
					padding-bottom: 3rem;
				}
			}
		}
	}

	@media ${device.xs} {
		.image-wrapper {
			height: 30%;
		}
	}
`

const TopSectionComponent = ({
	data: {
		welcomeTitle,
		welcomeHeading,
		welcomeSubheading,
		welcomeText,
		welcomeImage,
		welcomeBgImage,
	},
}) => {
	const [ref, inView] = useInView(View)

	return (
		<TopSection ref={ref}>
			<div className='bg-logo'>
				<img src={ImgR} alt='website logo large' />
			</div>
			<span className='heading-line'>
				<HorizontalLine
					height='2px'
					width='100%'
					color='var(--color-secondary)'
				/>
			</span>
			<div className='bg-wrapper'>
				<BackgroundImage
					image={getImage(welcomeBgImage?.localFile)}
					alt={welcomeBgImage?.altText}
				/>
			</div>
			<Container>
				<div className='main'>
					<div className={`heading-wrapper ${animate(InView)}`}>
						<h3>
							<span>{welcomeTitle.split('.')[0].trim()}.</span>
							<br />
							<span>{welcomeTitle.split('.')[1].trim()}.</span>
							<br />
							<em>{welcomeTitle.split('.')[2].trim()}.</em>
						</h3>
					</div>
					<section>
						<div className='v-line-desktop'>
							<VerticalLine
								width='2px'
								height='100%'
								color='var(--color-light)'
							/>
						</div>
						<div className='h-line'>
							<HorizontalLine
								width='80%'
								height='2px'
								color='var(--color-light)'
							/>
						</div>
						<div className='section-wrapper'>
							<VerticalLine
								width='2px'
								height='75%'
								color='var(--color-light)'
							/>
							<div className='image-wrapper'>
								<div className='bg-logo-m'>
									<img src={ImgR} alt='website logo large' />
								</div>
								<div className='v-line-mobile'>
									<VerticalLine
										width='2px'
										height='100%'
										color='var(--color-light)'
									/>
								</div>
								{welcomeImage && (
									<GatsbyImage
										image={getImage(welcomeImage?.localFile)}
										alt={welcomeImage?.altText}
									/>
								)}
							</div>
							<div className='content-wrapper'>
								<div className='text-wrapper'>
									<h4 className={animate(inView)}>{welcomeHeading}</h4>
									<h1 className='font-heading-sm'>{welcomeSubheading}</h1>
									<p>{welcomeText}</p>
									<Button onClick={() => navigate('/about-us/')}>
										Read More
									</Button>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Container>
		</TopSection>
	)
}

export { TopSectionComponent as TopSection }
