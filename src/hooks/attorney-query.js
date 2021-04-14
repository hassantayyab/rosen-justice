import { useStaticQuery, graphql } from 'gatsby'

export const useAttorney = () => {
	const data = useStaticQuery(graphql`
		query Attorney {
			wpPage(slug: { eq: "attorneys" }) {
				...SEOPageFragment
				...HeroFragment
			}
		}
	`)

	return data.wpPage
}
