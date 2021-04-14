import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { navigate } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { ImgArrow } from '../../images'

const GridCard = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
	outline: none;

	:hover,
	:focus {
		.image {
			height: 100%;

			.gatsby-image-wrapper {
				img {
					transform: scale(1.1);
				}
			}
		}
	}

	.image {
		box-shadow: -2px 2px 5px 1px rgba(0, 0, 0, 0.1);
		transition: all 0.5s ease-in-out;

		.gatsby-image-wrapper {
			height: 100%;
			z-index: -5;

			img {
				transition: all 0.5s ease-in-out;
			}
		}
	}

	.section {
		width: 96%;
		margin-left: auto;
		margin-top: -4rem;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
		transition: all 0.5s ease-in-out;

		.date {
			margin-left: 5%;
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
			height: 13rem;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			padding: 1rem 1.5rem;
			background-color: var(--color-light-200);
			color: var(--color-dark);

			h5 {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				margin-bottom: 0.5rem;
			}

			.text-inner-html {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}
		}

		button {
			margin-top: 1rem;
			outline: none;
			border: none;
			text-transform: uppercase;
			font-size: 0.75rem;
			font-weight: bolder;
			background-color: var(--color-transparent);
			color: var(--color-primary);

			display: flex;
			justify-content: space-between;
			align-items: center;

			span {
				margin-right: 1rem;
			}

			img {
				width: 2rem;
			}
		}
	}
`

const GridCardComponent = ({ data }) => {
	return (
		<GridCard
			id='grid-card'
			role='button'
			tabIndex='0'
			onClick={() => navigate(`/blog${data.uri}`)}
			onKeyPress={() => navigate(`/blog${data.uri}`)}>
			<div className='image'>
				{data._page_hero.heroBgImage && (
					<GatsbyImage
						image={getImage(data._page_hero.heroBgImage?.localFile)}
						alt={data._page_hero.heroBgImage?.altText}
					/>
				)}
			</div>
			<div className='section'>
				<div className='date'>{data.date}</div>
				<div className='text'>
					<h5>{data._page_hero.heroHeading}</h5>
					<div
						className='text-inner-html'
						dangerouslySetInnerHTML={{
							__html: data.excerpt,
						}}
					/>
					<button type='button'>
						<span>Learn More</span>
						<img src={ImgArrow} alt='arrow' />
					</button>
				</div>
			</div>
		</GridCard>
	)
}

export { GridCardComponent as GridCard }
