import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import styled from 'styled-components'
import { NavBar, RequestCard, Hero } from '../components/common'
import { CardContact } from '../components/common/card-contact'
import { PracticeAreaCard } from '../components/common/practice-area-card'
import { Footer } from '../components/footer/footer'
import { Process, WhyChoose } from '../components/home'
import { Container, Layout } from '../components/layouts'
import { Article } from '../components/subpage'
import { HorizontalLine, VerticalLine } from '../components/utils'
import Seo from '../components/utils/seo'
import { device } from '../globalStyles'

const Main = styled.main`
	padding-right: 4rem;
	margin-bottom: 2rem;

	section {
		position: relative;
	}

	#sec-articles {
		margin-top: 6rem;
		margin-bottom: 2rem;
	}

	#card-contact {
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	@media ${device.md} {
		padding-right: 0;
	}
`

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;

	aside {
		z-index: 1;
		margin-top: -5.5rem;
		margin-bottom: 4rem;

		#request-card {
			margin-bottom: 4rem;
		}
	}

	@media ${device.md} {
		flex-direction: column;

		aside {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			margin-top: 0;

			#request-card {
				margin-bottom: 0;
				width: unset;
				flex-basis: 48%;
			}

			#practice-area-card {
				flex-basis: 48%;
			}
		}
	}

	@media ${device.sm} {
		aside {
			flex-direction: column;
			justify-content: center;

			#request-card {
				margin-bottom: 4rem;
				width: 100%;
			}

			#practice-area-card {
				width: 100%;
			}
		}
	}
`

const BannerImage = styled.div`
	width: 65vw;
	position: relative;
	left: 68%;
	margin-left: -50vw;
	margin-top: 2rem;
	margin-bottom: 1rem;
	padding-top: 4%;
	overflow: hidden;

	#horizontal-line,
	#vertical-line {
		position: absolute;
		z-index: 1;

		&:first-child {
			top: 0;
			left: 0;
		}

		&:nth-child(2) {
			bottom: 7%;
			left: 0;
		}

		&:nth-child(3) {
			bottom: 7%;
			right: 5%;
		}
	}

	#vertical-line {
		bottom: 7%;
		right: 5%;
	}

	@media ${device.xl} {
		left: 78%;
		width: 59vw;
	}

	@media ${device.lg} {
		left: 78%;
		width: 60vw;
	}

	@media (max-width: 1300px) {
		left: 77%;
		width: 62vw;
	}

	@media ${device.mdx} {
		width: 63vw;
	}

	@media ${device.md} {
		width: 100%;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}
`

const OuterWrapper = styled.div`
	position: relative;

	.line {
		position: absolute;
		top: 7.5rem;
		width: 12%;
	}

	@media (max-width: 1400px) {
		.line {
			display: none;
		}
	}
`

const SubPage = ({ data, location }) => {
	const {
		_page_hero,
		_page_text: { textEditor },
		_page_banner_image,
		seo,
	} = data.wpPage

	// TODO: Extract this function in a separate file
	const renderArticleContent = () => {
		return textEditor.map(({ content }, index) => {
			const data = [content && <Article key={index}>{{ content }}</Article>]

			if (index === 0 && _page_banner_image.bannerImage) {
				data.push(
					<BannerImage key={`banner-${index}`}>
						<HorizontalLine
							height='2px'
							width='80%'
							color='var(--color-secondary)'
						/>
						<HorizontalLine
							height='2px'
							width='30%'
							color='var(--color-secondary)'
						/>
						<HorizontalLine
							height='2px'
							width='40%'
							color='var(--color-secondary)'
						/>
						<VerticalLine
							height='70%'
							width='2px'
							color='var(--color-secondary)'
						/>
						{_page_banner_image.bannerImage && (
							<GatsbyImage
								image={getImage(_page_banner_image.bannerImage?.localFile)}
								alt={_page_banner_image.bannerImage?.altText}
							/>
						)}
					</BannerImage>
				)
			}

			if (index === textEditor.length - 2) {
				data.push(
					<div key={`card-contact-${index}`} className='card-full-width'>
						<CardContact />
					</div>
				)
			}

			return data
		})
	}

	return (
		<Layout>
			<Seo data={seo} />
			<header>
				<NavBar />
				{_page_hero && <Hero data={_page_hero} scrollRef='#scrollRef'></Hero>}
			</header>
			<OuterWrapper>
				<div className='line'>
					<HorizontalLine
						height='2px'
						width='100%'
						color='var(--color-secondary)'
					/>
				</div>
				<Container>
					<Wrapper>
						<Main id='scrollRef'>
							{textEditor.length > 0 && (
								<section id='sec-articles'>{renderArticleContent()}</section>
							)}
						</Main>
						<aside>
							<RequestCard />
							<PracticeAreaCard path={location.pathname} />
						</aside>
					</Wrapper>
				</Container>
			</OuterWrapper>
			<WhyChoose />
			<Process />
			<Footer />
		</Layout>
	)
}

export default SubPage

export const query = graphql`
	query($id: String!) {
		wpPage(id: { eq: $id }) {
			...PageHeroFragment
			...SEOPageFragment
			_page_text {
				textEditor {
					content
				}
			}
			_page_banner_image {
				bannerImage {
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
