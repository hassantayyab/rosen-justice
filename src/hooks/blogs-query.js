import { useStaticQuery, graphql } from 'gatsby'

export const useBlogs = () => {
	const data = useStaticQuery(graphql`
		query Blogs {
			wpPage(slug: { eq: "blogs" }) {
				...SEOPageFragment
				...HeroFragment
			}
		}
	`)

	return data.wpPage
}
