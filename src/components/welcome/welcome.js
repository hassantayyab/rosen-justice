import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { TopSection } from './top-section'
import { BottomSection } from './bottom-section'

const Welcome = styled.div`
	position: relative;
	top: -1px;
	overflow: hidden;

	section {
		flex-grow: 1;
		position: relative;
	}
`

const WelcomeComponent = ({ data }) => {
	return (
		<Welcome id='welcome'>
			<TopSection data={data} />
			<BottomSection data={data} />
		</Welcome>
	)
}

export const query = graphql`
	fragment WelcomeFragment on WpPage {
		_welcome {
			welcomeTitle
			welcomeHeading
			welcomeSubheading
			welcomeText
			welcomeBgImage {
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
			welcomeImage {
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
			welcomeBadges {
				image {
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
	}
`

export { WelcomeComponent as Welcome }
