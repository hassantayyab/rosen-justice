import { useStaticQuery, graphql } from 'gatsby'

export const useWhyChooseQuery = () => {
	const data = useStaticQuery(graphql`
		query WhyChooseQuery {
			wpPage(slug: { eq: "home" }) {
				_why_choose {
					whyChooseHeading
					whyChooseSubheading
					whyChooseImage {
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
					whyChooseBgImage {
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
					whyChooseBadges {
						heading
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

	return data.wpPage._why_choose
}
