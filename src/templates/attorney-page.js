import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { device } from '../globalStyles'
import { Container, Layout } from '../components/layouts'
import { Footer } from '../components/footer/footer'
import { ButtonBack, Hero, NavBar } from '../components/common'
import { CardContact } from '../components/common/card-contact'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Seo from '../components/utils/seo'

const Wrapper = styled.div`
	position: relative;
	width: var(--spread);
	margin: 6rem auto 4rem auto;

	h3 {
		color: var(--color-secondary);
		margin-bottom: 1rem;
	}

	h6 {
		margin-bottom: 2rem;
	}

	.profile-wrapper {
		position: absolute;
		right: 0;
		top: -16.5rem;
		width: 20rem;
	}

	#card-contact {
		margin-top: 2rem;
		margin-bottom: 4rem;
	}

	.button-wrapper {
		> #button {
			display: flex;
			align-items: center;
			padding-left: 2rem;
			padding-right: 2rem;

			.arrow {
				width: 2.5rem;
				margin-right: 1.25rem;

				img {
					vertical-align: middle;
				}
			}

			font-weight: bolder;
			font-size: 0.8rem;
		}
	}

	@media ${device.md} {
		width: 100%;
	}

	@media ${device.sm} {
		width: 100%;

		.profile-wrapper {
			width: 100%;
			position: relative;
			top: 0;
			left: 0;
			margin-bottom: 3rem;
		}
	}
`

const AttorneyPage = ({ data }) => {
	const { title, _attorney_post, seo } = data.wpAttorney

	const heroData = {
		heroHeading: title,
		heroSubheading: _attorney_post.designation,
		heroBgImage: _attorney_post.image,
	}

	return (
		<Layout>
			<Seo data={seo} />
			<header>
				<NavBar />
				{heroData && <Hero data={heroData} isHomePage={false}></Hero>}
			</header>
			<Container>
				<Wrapper>
					<div className='profile-wrapper'>
						{_attorney_post.image && (
							<GatsbyImage
								image={getImage(_attorney_post.image?.localFile)}
								alt={_attorney_post.image?.altText}
							/>
						)}
					</div>
					<h3>{title}</h3>
					<h6 className='font-heading-sm'>{_attorney_post.designation}</h6>
					<p>{_attorney_post.content}</p>
					<CardContact />
					<ButtonBack link='/attorneys/'>Back to Attorneys</ButtonBack>
				</Wrapper>
			</Container>
			<Footer />
		</Layout>
	)
}

export default AttorneyPage

export const query = graphql`
	query($id: String!) {
		wpAttorney(id: { eq: $id }) {
			title
			seo {
				title
				opengraphDescription
				opengraphSiteName
				opengraphType
				opengraphImage {
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
				metaKeywords
				canonical
				twitterTitle
				twitterDescription
				twitterImage {
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
			_attorney_post {
				content
				designation
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
