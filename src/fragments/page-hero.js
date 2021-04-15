import { graphql } from "gatsby";

export const query = graphql`
  fragment PageHeroFragment on WpPage {
    _page_hero {
      heroHeading
      heroSubheading
      heroBgAltText
      heroBgImage {
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
`;
