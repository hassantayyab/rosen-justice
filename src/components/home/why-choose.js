import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { useWhyChooseQuery } from '../../hooks'
import { Container } from '../layouts'
import { BackgroundImage, HorizontalLine, VerticalLine } from '../utils'
import { fadeIn, fadeInRight } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import { animate, View } from '../../animations'

const fadeInRightAnimation = keyframes`${fadeInRight}`
const fadeInAnimation = keyframes`${fadeIn}`

const WhyChoose = styled.div`
	color: var(--color-light);
	position: relative;
	height: 48rem;
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

	#background-image {
		filter: blur(2px);
	}

	.heading-wrapper {
		opacity: 0;
		&.animate {
			opacity: 1;
			animation: 1.5s ${fadeInRightAnimation};
		}
	}

	.heading-line {
		position: absolute;
		top: 14%;
		right: 0;
		width: 18%;
	}

	.content-wrapper {
		h4 {
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 3s ${fadeInAnimation};
			}
		}
	}

	@media (max-width: 1200px) {
		.heading-line {
			width: 13%;
		}
	}

	@media ${device.md} {
		min-height: 68rem;

		.heading-line {
			top: 10%;
			width: 50%;
		}
	}

	@media ${device.sm} {
		min-height: 64rem;

		.heading-line {
			top: 8%;
			width: 38%;
		}

		#container {
			padding: 0;
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		height: 100%;

		section {
			flex-grow: 1;
		}

		@media ${device.md} {
			overflow: hidden;
		}
	}

	.heading-wrapper {
		text-align: right;
		margin: 3rem 0;

		h3 {
			display: inline-block;
			text-align: left;

			span:first-of-type {
				color: var(--color-secondary);
			}
		}

		@media ${device.md} {
			width: 100%;
			text-align: left;
		}

		@media ${device.sm} {
			margin: 2rem 0;
			padding: 0 1.5rem;
		}
	}

	section {
		background-color: var(--color-primary);
		padding: 4rem;
		position: relative;
		margin-top: 2rem;

		#vertical-line:not(.outline),
		.h-line {
			position: absolute;
			z-index: 0;
		}

		.h-line {
			top: -2.5rem;

			&.first {
				left: 4rem;
				width: calc(100% - 4rem);
			}

			&.last {
				right: 4rem;
				text-align: right;
				width: calc(100% - 4rem);
			}

			#horizontal-line {
				display: inline-block;
			}
		}

		#vertical-line:not(.mobile) {
			bottom: 0;
			right: -1.5rem;
		}

		@media ${device.md} {
			#vertical-line:not(.mobile) {
				right: 1rem;
			}
		}

		@media ${device.sm} {
			.h-line {
				width: 80%;

				&.first {
					top: -1.5rem;
					#horizontal-line {
						width: 100%;
					}
				}

				&.last {
					display: none;
				}
			}

			#vertical-line:not(.mobile) {
				display: none;
			}
		}

		.image-wrapper {
			position: absolute;
			width: 40%;
			left: -6%;
			bottom: 0;
			z-index: 2;

			.mobile {
				display: none;
			}

			.gatsby-image-wrapper {
				z-index: 2;
			}
		}

		.content-wrapper {
			margin-left: auto;
			width: 65%;

			h4 {
				margin-bottom: 2.25rem;
				width: 45%;
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
					transition: all 0.2s ease-in-out;

					:hover,
					:focus {
						transform: scale(1.05);

						div:last-of-type {
							color: var(--color-secondary);
						}
					}

					div:last-of-type {
						transition: all 0.2s ease-in-out;
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
				left: -2%;
			}

			.content-wrapper {
				width: 60%;
			}
		}

		@media ${device.md} {
			flex-direction: column;
			justify-content: space-between;
			height: 100%;

			.image-wrapper {
				position: static;
				height: 45%;
				overflow: hidden;
				width: 40%;
				margin: -6rem auto 3rem auto;
			}

			.content-wrapper {
				width: 100%;
				height: 100%;

				h4 {
					width: 80%;
				}
			}
		}

		@media ${device.sm} {
			background-color: transparent;
			padding: 1.5rem 0;

			.h-line {
				&.first {
					left: 0;
				}
			}

			.image-wrapper {
				position: relative;
				background-color: var(--color-primary);
				height: 40%;
				width: calc(100% - 1.25rem);
				margin: 0;
				padding-left: 1.5rem;
				padding-bottom: 3rem;

				.mobile {
					position: absolute;
					top: 4rem;
					height: 100%;
					right: 0.5rem;
					z-index: 1;
					display: inline-block;

					#vertical-line {
						display: inline-block;
					}
				}
			}

			.content-wrapper {
				background-color: var(--color-primary);
				padding: 3rem 1.5rem 0 1.5rem;

				h4 {
					margin-left: auto;
					margin-right: auto;
					text-align: center;
				}

				ul {
					:first-of-type {
						margin-right: 1.5rem;
					}
				}
			}
		}

		@media ${device.xs} {
			.image-wrapper {
				height: 30%;
			}
		}
	}
`

const WhyChooseComponent = () => {
	const {
		whyChooseHeading,
		whyChooseSubheading,
		whyChooseBadges,
		whyChooseImage,
		whyChooseBgImage,
	} = useWhyChooseQuery()

	const [ref, inView] = useInView(View)

	return (
		<WhyChoose id='why-choose' ref={ref}>
			<span className='heading-line'>
				<HorizontalLine
					height='2px'
					width='100%'
					color='var(--color-secondary)'
				/>
			</span>
			<div className='bg-wrapper'>
				<BackgroundImage
					image={getImage(whyChooseBgImage?.localFile)}
					alt={whyChooseBgImage?.altText}
				/>
			</div>
			<Container>
				<div className='main'>
					<div className={`heading-wrapper ${animate(inView)}`}>
						<h3>
							<span>{whyChooseHeading.split(' ')[0]}</span>
							<br />
							<span>{whyChooseHeading.split(' ').slice(1).join(' ')}</span>
						</h3>
					</div>
					<section>
						<VerticalLine width='2px' height='60%' color='var(--color-light)' />
						<div className='h-line first'>
							<HorizontalLine
								height='2px'
								width='40%'
								color='var(--color-light)'
							/>
						</div>
						<div className='h-line last'>
							<HorizontalLine
								height='2px'
								width='40%'
								color='var(--color-light)'
							/>
						</div>
						<div className='image-wrapper'>
							<div className='mobile'>
								<VerticalLine
									width='2px'
									height='100%'
									color='var(--color-light)'
								/>
							</div>
							{whyChooseImage && (
								<GatsbyImage
									image={getImage(whyChooseImage?.localFile)}
									alt={whyChooseImage?.altText}
								/>
							)}
						</div>
						<div className='content-wrapper'>
							<h4 className={animate(inView)}>{whyChooseSubheading}</h4>
							<div className='badges'>
								<ul>
									{whyChooseBadges.length > 0 &&
										whyChooseBadges.slice(0, 3).map((reason, i) => (
											<li key={i}>
												{reason.image && (
													<GatsbyImage
														image={getImage(reason.image?.localFile)}
														alt={reason.image?.altText}
													/>
												)}
												<div>{reason.heading}</div>
											</li>
										))}
								</ul>
								<ul>
									{whyChooseBadges.length > 3 &&
										whyChooseBadges.slice(3).map((reason, i) => (
											<li key={i}>
												{reason.image && (
													<GatsbyImage
														image={getImage(reason.image?.localFile)}
														alt={reason.image?.altText}
													/>
												)}
												<div>{reason.heading}</div>
											</li>
										))}
								</ul>
							</div>
						</div>
					</section>
				</div>
			</Container>
		</WhyChoose>
	)
}

export { WhyChooseComponent as WhyChoose }
