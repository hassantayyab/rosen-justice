import { useStaticQuery, graphql } from 'gatsby'

export const useBlogsList = () => {
	const data = useStaticQuery(graphql`
		query BlogsList {
			allWpPost {
				nodes {
					...PostHeroFragment
					excerpt
					date(formatString: "MMM D, Y")
					uri
				}
			}
		}
	`)

	return data.allWpPost.nodes
}
