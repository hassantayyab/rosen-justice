import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { zoomIn } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { device } from '../../globalStyles'
import {
	useHeaderMenuQuery,
	usePracticeQuery,
	usePracticesQuery,
} from '../../hooks'
import { Button } from '../common'
import { Container } from '../layouts'
import { BackgroundImage, HorizontalLine, VerticalLine } from '../utils'

const zoomInAnimation = keyframes`${zoomIn}`

const PracticeArea = styled.div`
	margin-bottom: 4rem;
	overflow: hidden;

	header {
		#vertical-line {
			margin: 0 auto;
		}

		.text-wrapper {
			margin: 2rem 0 3rem 0;
			text-align: center;

			h6.font-heading-sm {
				color: var(--color-secondary);
			}

			h3 {
				margin-top: 0;
				opacity: 0;

				&.animate {
					opacity: 1;
					animation: 1.5s ${zoomInAnimation};
				}
			}
		}
	}

	section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: 2rem;
		justify-items: center;

		.practice {
			position: relative;
			width: 100%;
			height: 17rem;
			color: var(--color-light-200);
			cursor: pointer;
			background: linear-gradient(
				90deg,
				rgba(20, 23, 40, 0.6) 0%,
				rgba(20, 23, 40, 0.6) 100%
			);

			transition: all 1s ease-in-out;

			#vertical-line,
			#horizontal-line {
				position: absolute;
				filter: brightness(80%);
			}

			#vertical-line {
				&:first-of-type {
					bottom: 5%;
					right: 5%;
				}
				&:last-of-type {
					top: 5%;
					left: 5%;
				}
			}

			#horizontal-line {
				&:first-of-type {
					top: 5%;
					left: 5%;
				}
				&:last-of-type {
					bottom: 5%;
					right: 5%;
				}
			}

			:hover,
			:focus {
				background: linear-gradient(
					0deg,
					rgba(201, 172, 43, 1) 25%,
					rgba(201, 172, 43, 0.9) 100%
				);

				.image-wrapper {
					img {
						filter: brightness(0) invert(1);
					}
				}

				#vertical-line,
				#horizontal-line {
					background-color: var(--color-light);
					filter: brightness(90%);
				}
			}

			.content-wrapper {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.image-wrapper {
					display: inline-block;
					width: 4rem;
				}

				.text {
					font-size: 1rem;
					font-weight: bolder;
					padding: 0 1rem;
					text-align: center;
					line-height: 1.2;
					margin-top: 0.75rem;
				}
			}

			@media ${device.md} {
				height: 20rem;
			}

			@media ${device.sm} {
				.content-wrapper {
					.image-wrapper {
						width: 2.5rem;
					}
				}

				height: 10rem;
			}

			@media ${device.xs} {
				height: 12rem;
			}
		}

		@media ${device.sm} {
			grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
			gap: 1rem;
		}
	}

	.button-wrapper {
		margin-top: 4rem;
		text-align: center;

		@media ${device.xs} {
			#button {
				width: 100%;
			}
		}
	}

	@media ${device.xs} {
		#vertical-line {
			height: 2.5rem;
		}
	}
`

const PracticeAreaComponent = ({ isForHome = false }) => {
	const data = usePracticeQuery()
	const practiceAreaMenu = useHeaderMenuQuery().find(
		(m) => m.label === 'Practice Areas'
	)
	const practices = usePracticesQuery()

	const [ref, inView] = useInView(View)

	return (
		<PracticeArea id='practice-area' ref={ref}>
			<Container>
				{isForHome && (
					<header>
						<VerticalLine width='2px' height='4rem' />
						<div className='text-wrapper'>
							<h6 className='font-heading-sm'>{data.practiceSubheading.top}</h6>
							<h3 className={animate(inView)}>{data.practiceHeading}</h3>
							<h6>{data.practiceSubheading.bottom}</h6>
						</div>
					</header>
				)}

				<section>
					{practices.length > 0 &&
						practices.map((practice, i) => (
							<div
								className='practice'
								key={i}
								role='button'
								tabIndex='0'
								onClick={() => navigate(practice._practice_area_post.link.link)}
								onKeyPress={() =>
									navigate(practice._practice_area_post.link.link)
								}>
								<div className='v-lines'>
									<VerticalLine
										width='1px'
										height={`${80 - (i + 2) * i}%`}
										color='var(--color-light-700)'
									/>
									<VerticalLine
										width='1px'
										height={`${20 + (i + 2) * i}%`}
										color='var(--color-light-700)'
									/>
								</div>
								<div className='h-lines'>
									<HorizontalLine
										width={`${10 + (i + 1) * (i + 1)}%`}
										height='1px'
										color='var(--color-light-700)'
									/>
									<HorizontalLine
										width={`${80 - (i + 1) * (i + 1)}%`}
										height='1px'
										color='var(--color-light-700)'
									/>
								</div>
								<BackgroundImage
									image={getImage(
										practice._practice_area_post.bgImage?.localFile
									)}
									alt={practice._practice_area_post.bgImage?.altText}
								/>
								<div className='content-wrapper'>
									<div className='image-wrapper'>
										{practice._practice_area_post.image && (
											<GatsbyImage
												image={getImage(
													practice._practice_area_post.image?.localFile
												)}
												alt={practice._practice_area_post.image?.altText}
											/>
										)}
									</div>
									<div className='text'>{practice.title}</div>
								</div>
							</div>
						))}
				</section>

				<div className='button-wrapper'>
					<Button
						bgColor='var(--color-secondary)'
						onClick={() => navigate(practiceAreaMenu.path)}>
						View our practice areas
					</Button>
				</div>
			</Container>
		</PracticeArea>
	)
}

export { PracticeAreaComponent as PracticeArea }
