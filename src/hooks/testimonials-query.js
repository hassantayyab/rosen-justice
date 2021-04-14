import { useStaticQuery, graphql } from 'gatsby'

export const useTestimonialsQuery = () => {
	const data = useStaticQuery(graphql`
		query TestimonialsQuery {
			wpPage(slug: { eq: "testimonials" }) {
				...SEOPageFragment
				...HeroFragment
			}
		}
	`)

	return data.wpPage
}
