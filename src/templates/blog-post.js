import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { device } from '../globalStyles'
import { Container, Layout } from '../components/layouts'
import { Footer } from '../components/footer/footer'
import { ButtonBack, Hero, NavBar } from '../components/common'
import { Article } from '../components/subpage'
import { CardContact } from '../components/common/card-contact'
import Seo from '../components/utils/seo'

const Wrapper = styled.div`
	width: var(--spread);
	margin: 6rem auto 4rem auto;

	#card-contact {
		margin-bottom: 4rem;
	}

	@media ${device.md} {
		width: 100%;
	}
`

const BlogPost = ({ data }) => {
	const { _page_hero, title, content, seo } = data.wpPost

	return (
		<Layout>
			<Seo data={seo} />
			<header>
				<NavBar />
				{_page_hero && <Hero data={_page_hero} isHomePage={false}></Hero>}
			</header>
			<Container>
				<Wrapper>
					<Article>{{ title, content }}</Article>
					<CardContact />
					<ButtonBack link='/blogs/'>Back to Blog</ButtonBack>
				</Wrapper>
			</Container>
			<Footer />
		</Layout>
	)
}
export default BlogPost

export const query = graphql`
	query($id: String!) {
		wpPost(id: { eq: $id }) {
			...PostHeroFragment
			...SEOPostFragment
			title
			content
		}
	}
`
