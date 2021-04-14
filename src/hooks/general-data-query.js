import { useStaticQuery, graphql } from 'gatsby'

export const useGeneralDataQuery = () => {
	const data = useStaticQuery(graphql`
		query GeneralDataQuery {
			wp {
				generalData {
					_general_info {
						websiteName
						bannerText
						footerText
						contactNumber
						locations {
							address
							number
							place
							googleLink
						}
						footerLogo {
							altText
							localFile {
								childImageSharp {
									gatsbyImageData
								}
							}
						}
						logo {
							altText
							localFile {
								childImageSharp {
									gatsbyImageData
								}
							}
						}
					}
				}
			}
		}
	`)

	return data.wp.generalData._general_info
}
