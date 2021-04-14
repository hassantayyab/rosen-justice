import { useStaticQuery, graphql } from 'gatsby'

export const useCardContactQuery = () => {
	const data = useStaticQuery(graphql`
		query cardContactQuery {
			wp {
				generalData {
					_card_contact {
						cardHeading
						cardSubheading
						cardBgImage {
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

	return data.wp.generalData._card_contact
}
