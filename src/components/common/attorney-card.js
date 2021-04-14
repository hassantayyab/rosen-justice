import React from 'react'
import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { ImgArrow } from '../../images'

const AttorneyCard = styled.div`
	height: 42rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	outline: none;

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
		width: 100%;
		height: 62%;

		.gatsby-image-wrapper {
			height: 100%;

			img {
				transition: all 0.5s ease-in-out;
			}
		}
	}

	.content {
		margin-top: 1rem;

		h5 {
			color: var(--color-secondary);
		}

		h6 {
			margin-top: 0.2rem;
			font-size: 0.75rem;
		}

		p {
			font-size: 0.9rem;
			line-height: 1.4;
			margin: 1rem 0 0.5rem 0;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 6;
		}
	}

	.button {
		margin-top: auto;

		button {
			outline: none;
			border: none;
			text-transform: uppercase;
			font-size: 0.75rem;
			font-weight: bolder;
			background-color: var(--color-transparent);
			color: var(--color-primary);
			cursor: pointer;

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

const AttorneyCardComponent = ({ data }) => {
	return (
		<AttorneyCard
			id='attorney-card'
			role='button'
			tabIndex='0'
			onClick={() => navigate(data.link)}
			onKeyPress={() => navigate(data.link)}>
			<div className='image'>
				{data._attorney_post.image && (
					<GatsbyImage
						image={getImage(data._attorney_post.image?.localFile)}
						alt={data._attorney_post.image?.altText}
					/>
				)}
			</div>
			<div className='content'>
				<h5>{data.title}</h5>
				<h6 className='font-heading-sm '>{data._attorney_post.designation}</h6>
				<p>{data._attorney_post.content}</p>
			</div>
			<div className='button'>
				<button type='button'>
					<span>Learn More</span>
					<img src={ImgArrow} alt='arrow' />
				</button>
			</div>
		</AttorneyCard>
	)
}

export { AttorneyCardComponent as AttorneyCard }
