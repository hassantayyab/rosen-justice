import { useStaticQuery, graphql } from 'gatsby'

export const useAttorneysList = () => {
	const data = useStaticQuery(graphql`
		query AttorneysList {
			allWpAttorney {
				nodes {
					title
					link
					_attorney_post {
						designation
						content
						image {
							altText
							localFile {
								childImageSharp {
									gatsbyImageData(
										quality: 100
										layout: FULL_WIDTH
										placeholder: BLURRED
										formats: [WEBP]
									)
								}
							}
						}
					}
				}
			}
		}
	`)

	return data.allWpAttorney.nodes
}
