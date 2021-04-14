import { useStaticQuery, graphql } from 'gatsby'

export const useFooterMenuQuery = () => {
	const data = useStaticQuery(graphql`
		query FooterMenuQuery {
			wpMenu(locations: { eq: GATSBY_FOOTER_MENU }) {
				_footer_menus {
					menus {
						label
						link {
							url
						}
					}
				}
			}
		}
	`)

	return data.wpMenu._footer_menus.menus
}
