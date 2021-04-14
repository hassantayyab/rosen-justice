import { useStaticQuery, graphql } from 'gatsby'

export const useContactQuery = () => {
	const data = useStaticQuery(graphql`
		query contactQuery {
			wpPage(slug: { eq: "home" }) {
				_contact {
					contactBgImage {
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
	`)

	return data.wpPage._contact
}
