import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import { ImgPattern } from '../../images'
import { Container } from '../layouts'

const BottomSection = styled.section`
	padding: 1.5rem 0;
	background: var(--color-primary) url(${ImgPattern}) no-repeat center/cover;

	ul {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		li {
			&::before {
				display: none;
			}

			margin-top: 1rem;
			margin-bottom: 1rem;

			:not(:last-of-type) {
				margin-right: 0.5rem;
			}

			:not(:first-of-type) {
				margin-left: 0.5rem;
			}

			&,
			img {
				width: 5rem;
				max-height: 5rem;
			}

			img {
				object-fit: contain !important;
			}
		}
	}
`

const BottomSectionComponent = ({ data: { welcomeBadges } }) => {
	return (
		<BottomSection>
			<Container>
				<ul>
					{welcomeBadges.length > 0 &&
						welcomeBadges.map((badge, i) => (
							<li key={i}>
								{badge.image && (
									<GatsbyImage
										image={getImage(badge.image?.localFile)}
										alt={badge.image?.altText}
									/>
								)}
							</li>
						))}
				</ul>
			</Container>
		</BottomSection>
	)
}

export { BottomSectionComponent as BottomSection }
