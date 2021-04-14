import { useStaticQuery, graphql } from 'gatsby'

export const useProcessQuery = () => {
	const data = useStaticQuery(graphql`
		query processQuery {
			wpPage(slug: { eq: "home" }) {
				_process {
					processHeading
					processSubheading {
						top
						bottom
					}
					processBgImage {
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
					processSteps {
						text
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
					}
				}
			}
		}
	`)

	return data.wpPage._process
}
