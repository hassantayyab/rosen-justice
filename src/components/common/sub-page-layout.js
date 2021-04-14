import * as React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { Footer } from '../footer/footer'
import { Process, WhyChoose } from '../home'
import { Container, Layout } from '../layouts'
import Seo from '../utils/seo'
import { Hero } from './hero'
import { NavBar } from './nav-bar'
import { PracticeAreaCard } from './practice-area-card'
import { RequestCard } from './request-card'

const Main = styled.main`
	padding-right: 4rem;
	margin-top: 6rem;
	margin-bottom: 6rem;

	section {
		margin-bottom: 2rem;

		&.grid {
			margin: 4rem 0 4rem 0;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
			row-gap: 4rem;
			column-gap: 2.5rem;
			justify-items: center;
		}
	}

	#pagination {
		margin-bottom: 5rem;
	}

	#sec-articles {
		margin-top: 6rem;
		margin-bottom: 2rem;
	}

	#card-contact {
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	#button-back {
		margin-top: 4rem;
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

const SubPageLayout = ({ heroData, seoData, children, location }) => {
	return (
		<Layout>
			<Seo data={seoData} />
			<header>
				<NavBar />
				{heroData && <Hero data={heroData} scrollRef='#scrollRef'></Hero>}
			</header>
			<Container>
				<Wrapper>
					<Main id='scrollRef'>{children}</Main>
					<aside>
						<RequestCard />
						<PracticeAreaCard path={location.pathname} />
					</aside>
				</Wrapper>
			</Container>
			<WhyChoose />
			<Process />
			<Footer />
		</Layout>
	)
}

export default SubPageLayout
