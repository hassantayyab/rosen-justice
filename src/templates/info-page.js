import React from 'react'
import { graphql } from 'gatsby'
import { Article } from '../components/subpage'
import { CardContact } from '../components/common/card-contact'
import SubPageLayout from '../components/common/sub-page-layout'

const InfoPage = ({ data, location }) => {
	const { _page_hero, title, content, seo } = data.wpPage

	return (
		<SubPageLayout heroData={_page_hero} seoData={seo} location={location}>
			<Article>{{ title, content }}</Article>
			<CardContact />
			{/* <ButtonBack link='/'>Back to Home</ButtonBack> */}
		</SubPageLayout>
	)
}

export default InfoPage

export const query = graphql`
	query($id: String!) {
		wpPage(id: { eq: $id }) {
			...PageHeroFragment
			...SEOPageFragment
			title
			content
		}
	}
`
