import { useStaticQuery, graphql } from 'gatsby'

export const usePracticesQuery = () => {
	const data = useStaticQuery(graphql`
		query PracticesQuery {
			allWpPracticeArea {
				nodes {
					title
					_practice_area_post {
						link {
							... on WpPage {
								link
							}
						}
						image {
							altText
							localFile {
								childImageSharp {
									gatsbyImageData(
										quality: 100
										placeholder: BLURRED
										formats: [WEBP]
									)
								}
							}
						}
						bgImage {
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

	return data.allWpPracticeArea.nodes
}
