import { useStaticQuery, graphql } from 'gatsby'

export const useFaqQuery = () => {
	const data = useStaticQuery(graphql`
		query FaqQuery {
			wpPage(slug: { eq: "faq" }) {
				...SEOPageFragment
				...HeroFragment
			}
		}
	`)

	return data.wpPage
}
