import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { useAttorneysList } from '../../hooks'
import { DesktopSection } from './desktop-section'
import { MobileSection } from './mobile-section'

const Team = styled.section`
	position: relative;
	padding-bottom: 4rem;

	.section-background {
		position: absolute;
		top: 0;
		right: 0;
		width: 60%;
		height: 100%;
		background-color: var(--color-light);
		z-index: -5;
	}

	@media ${device.sm} {
		padding-bottom: 2rem;

		.section-background {
			display: none;
		}
	}
`

const TeamComponent = ({ data }) => {
	const attorneys = useAttorneysList()

	return (
		<Team id='team'>
			<div className='section-background'></div>
			<DesktopSection data={data} attorneys={attorneys} />
			<MobileSection attorneys={attorneys} />
		</Team>
	)
}

export const query = graphql`
	fragment TeamFragment on WpPage {
		_team {
			teamHeading
			teamText
			teamBgImage {
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

export { TeamComponent as Team }
