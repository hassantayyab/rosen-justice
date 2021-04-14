import { useStaticQuery, graphql } from 'gatsby'

export const useTestimonialsListQuery = () => {
	const data = useStaticQuery(graphql`
		query TestimonialsListQuery {
			allWpReview {
				nodes {
					title
					link
					_review_post {
						text
					}
				}
			}
		}
	`)

	return data.allWpReview.nodes
}
