import { graphql } from 'gatsby'

export const query = graphql`
	fragment SEOPostFragment on WpPost {
		seo {
			title
			opengraphDescription
			opengraphSiteName
			opengraphType
			opengraphImage {
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
			metaKeywords
			canonical
			twitterTitle
			twitterDescription
			twitterImage {
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
`
