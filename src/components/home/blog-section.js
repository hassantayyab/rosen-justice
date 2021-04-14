import { graphql, navigate } from 'gatsby'
import React, { useRef } from 'react'
import { fadeInLeft } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import Slider from 'react-slick'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { device } from '../../globalStyles'
import { useBlogsList } from '../../hooks'
import { BlogCard } from '../blog/blog-card'
import { Button } from '../common'
import { Container } from '../layouts'
import {
	ArrowButton,
	HorizontalLine,
	sliderSettingsBlog,
	VerticalLine,
} from '../utils'

const fadeInLeftAnimation = keyframes`${fadeInLeft}`

const BlogSection = styled.div`
	position: relative;
	padding-bottom: 4rem;
	overflow: hidden;
	background-color: var(--color-light);

	#vertical-line {
		display: none;
		margin: 0 auto;
	}

	#horizontal-line {
		position: absolute;
		left: 0;
		top: 7.3rem;
		width: 14%;

		@media ${device.lg} {
			width: 6%;
		}

		@media ${device.mdx} {
			display: none;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4rem;
		margin-bottom: 4rem;

		h6.font-heading-sm {
			color: var(--color-secondary);
		}

		h3 {
			margin-top: 0;
			opacity: 0;

			&.animate {
				opacity: 1;
				animation: 1.5s ${fadeInLeftAnimation};
			}
		}

		.slide-buttons {
			display: flex;
			align-items: center;
			margin-left: auto;
			padding-right: 1rem;

			#arrow-button {
				transition: all 0.2s ease-in-out;

				:hover,
				:focus {
					filter: brightness(95%);
				}

				:first-of-type {
					margin-right: 1.25rem;
				}
			}
		}
	}

	.slide-buttons-sm {
		display: none;
		text-align: center;
		margin: 2rem auto 0 auto;

		#arrow-button {
			&:first-of-type {
				margin-right: 1.25rem;
			}
		}
	}

	.card-wrapper {
		outline: none;
		margin-right: 1.5rem;
	}

	.list {
		width: 101rem;
		overflow: hidden;

		#blog-card {
			width: 32rem;
			height: 26rem;
		}
	}

	.button-wrapper {
		text-align: center;
		margin-top: 3rem;
	}

	@media ${device.md} {
		.list {
			#blog-card {
				width: 28rem;
				height: 23rem;
			}
		}
	}

	@media ${device.xs} {
		#vertical-line {
			display: block;
		}

		header {
			margin-top: 2rem;
			justify-content: center;
			text-align: center;
			margin-bottom: 2rem;

			.slide-buttons {
				display: none;
			}
		}

		.list {
			width: 110%;

			#blog-card {
				width: 18rem;
				height: 22rem;
			}
		}

		.slide-buttons-sm {
			display: block;
		}
	}
`

const BlogSectionComponent = ({ data }) => {
	const blogs = useBlogsList()
	const sliderRef = useRef()

	const [ref, inView] = useInView(View)

	return (
		<BlogSection id='blog-section' ref={ref}>
			<HorizontalLine
				height='2px'
				width='100%'
				color='var(--color-secondary)'
			/>
			<Container>
				<VerticalLine width='2px' height='2.5rem' />
				<header>
					<div>
						<h6 className='font-heading-sm'>{data.blogSubheading}</h6>
						<h3 className={animate(inView)}>{data.blogHeading}</h3>
					</div>
					<div className='slide-buttons'>
						<ArrowButton
							direction='left'
							onClick={() => sliderRef.current.slickPrev()}
						/>
						<ArrowButton
							direction='right'
							onClick={() => sliderRef.current.slickNext()}
						/>
					</div>
				</header>
				<section className='list' key={sliderSettingsBlog}>
					<Slider ref={sliderRef} {...sliderSettingsBlog}>
						{blogs.length > 0 &&
							blogs.map((blog, i) => (
								<div className='card-wrapper' key={i}>
									<BlogCard data={blog} />
								</div>
							))}
					</Slider>

					<div className='slide-buttons-sm'>
						<ArrowButton
							direction='left'
							onClick={() => sliderRef.current.slickPrev()}
						/>
						<ArrowButton
							direction='right'
							onClick={() => sliderRef.current.slickNext()}
						/>
					</div>
				</section>
				<div className='button-wrapper'>
					<Button
						bgColor='var(--color-secondary)'
						onClick={() => navigate('/blogs/')}>
						View our personal injury blog
					</Button>
				</div>
			</Container>
		</BlogSection>
	)
}

export const query = graphql`
	fragment BlogsFragment on WpPage {
		_blog {
			blogHeading
			blogSubheading
		}
	}
`

export { BlogSectionComponent as BlogSection }
