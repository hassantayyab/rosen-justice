import { useStaticQuery, graphql } from 'gatsby'

export const usePracticeQuery = () => {
	const data = useStaticQuery(graphql`
		query PracticeQuery {
			wpPage(slug: { eq: "home" }) {
				_practice {
					practiceHeading
					practiceSubheading {
						top
						bottom
					}
				}
			}
		}
	`)

	return data.wpPage._practice
}
