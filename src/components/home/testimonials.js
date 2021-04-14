import React from 'react'
import styled, { keyframes } from 'styled-components'
import Slider from 'react-slick'
import { BackgroundImage, sliderSettings, VerticalLine } from '../utils'
import { Button, TestimonialCard } from '../common'
import { Container } from '../layouts'
import { graphql, navigate } from 'gatsby'
import { useTestimonialsListQuery } from '../../hooks'
import { ImgCardBorder } from '../../images'
import { device } from '../../globalStyles'
import { getImage } from 'gatsby-plugin-image'
import { fadeIn } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'

const fadeInAnimation = keyframes`${fadeIn}`

const Testimonials = styled.div`
	position: relative;
	padding-bottom: 6rem;
	background: linear-gradient(
		180deg,
		rgba(20, 23, 40, 0.7) 0%,
		rgba(20, 23, 40, 0.9) 60%,
		rgba(20, 23, 40, 0.95) 90%,
		rgba(20, 23, 40, 1) 100%
	);
	overflow: hidden;

	.bg-wrapper {
		position: absolute;
		top: 38%;
		left: 50%;
		width: 44rem;
		transform: translateX(-47%);
	}

	header {
		#vertical-line {
			margin: 0 auto;
		}

		.text-wrapper {
			padding: 2rem 0 4rem 0;
			text-align: center;
			color: var(--color-light);

			h3 {
				margin-top: 0;
				opacity: 0;

				span.focus {
					color: var(--color-secondary);
				}

				&.animate {
					opacity: 1;
					animation: 3s ${fadeInAnimation};
				}
			}
		}
	}

	.slide-wrapper {
		width: 44rem;
		margin: auto;
	}

	.custom-slider {
		.slick-arrow {
			position: absolute;
			transition: all 0.2s ease-in-out;
			z-index: 2;

			&.slick-next {
				right: -1.5rem;
			}
			&.slick-prev {
				left: -1.5rem;
			}
			&.slick-disabled {
				filter: brightness(80%);
				cursor: default;
			}
			:not(.slick-disabled) {
				:hover,
				:focus {
					filter: brightness(90%);
				}
			}
			::before {
				display: none;
			}
		}
	}

	.button-wrapper {
		text-align: center;
		margin-top: 6rem;
	}

	@media ${device.sm} {
		padding-bottom: 6rem;

		.bg-wrapper {
			top: 31%;
			left: 9%;
			width: 52rem;
			transform: unset;
		}

		.slide-wrapper {
			width: 100%;
		}

		.custom-slider {
			.slick-arrow {
				&.slick-prev {
					left: 38%;
					transform: translateX(-40%);
					top: 118%;
				}
				&.slick-next {
					right: 38%;
					transform: translateX(-40%);
					top: 118%;
				}
			}
		}

		.button-wrapper {
			margin-top: 10rem;
		}
	}

	@media ${device.xs} {
		#vertical-line {
			height: 2.5rem;
		}

		.bg-wrapper {
			top: 30%;
			left: 11%;
			width: 51rem;
		}

		.slide-wrapper {
			width: 100%;
		}
	}
`

const TestimonialsComponent = ({ data }) => {
	const testimonials = useTestimonialsListQuery()

	const [ref, inView] = useInView(View)

	const renderTestimonialCards = () => {
		return testimonials.map((post, i) => (
			<TestimonialCard
				key={i}
				author={post.title}
				review={post._review_post.text}
			/>
		))
	}

	return (
		<Testimonials id='testimonials' ref={ref}>
			<div className='bg-wrapper'>
				<img src={ImgCardBorder} alt='card border' />
			</div>
			{data && (
				<header>
					<BackgroundImage
						image={getImage(data.reviewsBgImage?.localFile)}
						alt={data.reviewsBgImage?.altText}
					/>
					<Container>
						<VerticalLine width='2px' height='4rem' />
						<div className='text-wrapper'>
							<h3 className={animate(inView)}>
								<span>
									{data.reviewsHeading.split(' ').slice(0, 2).join(' ')}
								</span>
								<br />
								<span className='focus'>
									{data.reviewsHeading.split(' ').slice(2).join(' ')}
								</span>
							</h3>
						</div>
					</Container>
				</header>
			)}
			<Container>
				<div className='slide-wrapper' key={sliderSettings}>
					<Slider {...sliderSettings}>{renderTestimonialCards()}</Slider>
				</div>

				<div className='button-wrapper'>
					<Button
						bgColor='var(--color-secondary)'
						onClick={() => navigate('/testimonials/')}>
						See what our clients are saying
					</Button>
				</div>
			</Container>
		</Testimonials>
	)
}

export const query = graphql`
	fragment TestimonialsFragment on WpPage {
		_reviews {
			reviewsHeading
			reviewsBgImage {
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

export { TestimonialsComponent as Testimonials }
