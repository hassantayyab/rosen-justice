import { useStaticQuery, graphql } from "gatsby";

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
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    formats: [WEBP]
                  )
                }
              }
            }
            logo {
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
  `);

  return data.wp.generalData._general_info;
};
