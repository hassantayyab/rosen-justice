import { graphql } from 'gatsby'
import * as React from 'react'
import { NavBar } from '../components/common'
import { Contact } from '../components/contact'
import { Footer } from '../components/footer'
import {
	Hero,
	Process,
	WhyChoose,
	PracticeArea,
	QuoteSection,
	Testimonials,
	Faq,
	BlogSection,
} from '../components/home'
import { Layout } from '../components/layouts'
import { Team } from '../components/Team'
import Seo from '../components/utils/seo'
import { Welcome } from '../components/welcome'

const IndexPage = ({ data }) => {
	return (
		<Layout>
			<Seo data={data.wpPage.seo} />
			<header>
				<NavBar />
				<Hero data={data.wpPage._hero} scrollRef='#scrollEl'></Hero>
			</header>
			<main id='scrollEl'>
				<Welcome data={data.wpPage._welcome} />
				<PracticeArea isForHome={true} />
				<WhyChoose />
				<Process />
				<Testimonials data={data.wpPage._reviews} />
				<Team data={data.wpPage._team} />
				<QuoteSection data={data.wpPage._quote} />
				<Faq data={data.wpPage._faq} />
				<Contact data={data.wpPage._contact} />
				<BlogSection data={data.wpPage._blog} />
			</main>
			<Footer />
		</Layout>
	)
}

export const query = graphql`
	{
		wpPage(slug: { eq: "home" }) {
			...SEOPageFragment
			...HeroFragment
			...BlogsFragment
			...WelcomeFragment
			...TeamFragment
			...FaqFragment
			...TestimonialsFragment
			...QuoteFragment
		}
	}
`

export default IndexPage
