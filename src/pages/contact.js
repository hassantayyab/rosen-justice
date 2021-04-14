import { graphql } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { NavBar, Hero, CardContact } from '../components/common'
import { Contact } from '../components/contact'
import { Footer } from '../components/footer'
import { Container, Layout } from '../components/layouts'
import Seo from '../components/utils/seo'
import { device } from '../globalStyles'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	margin-bottom: 4rem;
	width: 0;

	#contact {
		margin-bottom: 4rem;
	}

	@media ${device.md} {
		width: 100%;
		padding-right: 0;
	}
`

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;

	#container {
		height: unset;
	}

	@media ${device.md} {
		flex-direction: column;
	}
`

const ContactPage = ({ data }) => {
	return (
		<Layout>
			<Seo data={data.wpPage.seo} />
			<header>
				<NavBar />
				<Hero data={data.wpPage._hero} scrollRef='#scrollEl'></Hero>
			</header>
			<Wrapper>
				<Main id='scrollEl'>
					<Contact data={data.wpPage._contact} />
					<Container>
						<CardContact isForGrid={true} />
					</Container>
				</Main>
			</Wrapper>
			<Footer />
		</Layout>
	)
}

export const query = graphql`
	{
		wpPage(slug: { eq: "contact" }) {
			...SEOPageFragment
			...HeroFragment
		}
	}
`

export default ContactPage
