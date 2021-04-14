import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'

const BlogCard = styled.div`
	position: relative;
	display: inline-block;
	cursor: pointer;

	:hover,
	:focus {
		.image {
			.gatsby-image-wrapper {
				img {
					transform: scale(1.1);
				}
			}
		}
	}

	.image {
		height: 100%;
		.gatsby-image-wrapper {
			height: 100%;
			z-index: -5;

			img {
				transition: all 0.5s ease-in-out;
			}
		}
	}

	section {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		transition: all 0.5s ease-in-out;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.01);

		.date {
			margin-left: 6%;
			display: inline-block;
			padding: 0.3rem 0.75rem;
			background-color: var(--color-secondary);
			color: var(--color-light-200);
			line-height: 1;
			font-size: 0.75rem;
			font-weight: bolder;
			text-transform: uppercase;
		}

		.text {
			padding: 1rem 1.5rem;
			background-color: var(--color-light-200);
			color: var(--color-dark);
			width: 80%;
			height: 4.6rem;

			h5 {
				font-size: 1rem;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
	}

	@media ${device.xs} {
		header {
			#background-image {
				height: 85%;
			}
		}

		section {
			.text {
				width: 94%;
				height: 5.8rem;

				h5 {
					-webkit-line-clamp: 3;
				}
			}
		}
	}
`

const BlogCardComponent = ({ data }) => {
	return (
		<BlogCard
			id='blog-card'
			role='button'
			tabIndex='0'
			onClick={() => navigate(`blog${data.uri}`)}
			onKeyPress={() => navigate(`blog${data.uri}`)}>
			<div className='image'>
				{data._page_hero.heroBgImage && (
					<GatsbyImage
						image={getImage(data._page_hero.heroBgImage?.localFile)}
						alt={data._page_hero.heroBgImage?.altText}
					/>
				)}
			</div>
			<section>
				<div className='date'>{data.date}</div>
				<div className='text'>
					<h5>{data._page_hero.heroHeading}</h5>
				</div>
			</section>
		</BlogCard>
	)
}

export { BlogCardComponent as BlogCard }
