import React from 'react'
import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { ImgArrow } from '../../images'

const MobileSection = styled.section`
	display: none;
	padding-left: 1.5rem;
	padding-bottom: 1.5rem;
	margin-top: -6rem;
	overflow-x: auto;

	> div {
		display: flex;

		.profile-m {
			min-width: 14rem;
			height: 30rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-right: 1.25rem;
			margin-right: 1.5rem;

			.image {
				width: 100%;
				height: 50%;

				.gatsby-image-wrapper {
					height: 100%;
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
		}
	}

	@media ${device.sm} {
		display: flex;
		align-items: center;
	}
`

const MobileSectionComponent = ({ attorneys }) => {
	return (
		<MobileSection>
			<div>
				{attorneys.length > 0 &&
					attorneys.map((a, i) => (
						<div className='profile-m' key={i}>
							<div className='image'>
								{a._attorney_post.image && (
									<GatsbyImage
										image={getImage(a._attorney_post.image?.localFile)}
										alt={a._attorney_post.image?.altText}
									/>
								)}
							</div>
							<div className='content'>
								<h5>{a.title}</h5>
								<h6 className='font-heading-sm '>
									{a._attorney_post.designation}
								</h6>
								<p>{a._attorney_post.content}</p>
							</div>
							<div className='button'>
								<button type='button' onClick={() => navigate(a.link)}>
									<span>Learn More</span>
									<img src={ImgArrow} alt='arrow' />
								</button>
							</div>
						</div>
					))}
			</div>
		</MobileSection>
	)
}

export { MobileSectionComponent as MobileSection }
