import { useStaticQuery, graphql } from 'gatsby'

export const useHeaderMenuQuery = () => {
	const data = useStaticQuery(graphql`
		query HeaderMenuQuery {
			allWpMenuItem(
				filter: { locations: { eq: GATSBY_HEADER_MENU } }
				sort: { fields: order }
			) {
				nodes {
					id
					label
					path
					parentId
					childItems {
						nodes {
							id
							label
							path
							parentId
							childItems {
								nodes {
									id
									label
									path
									parentId
								}
							}
						}
					}
				}
			}
		}
	`)

	return formatMenus(data.allWpMenuItem.nodes)
}

const formatMenus = (menus) => {
	return menus.filter((m) => !m.parentId)
}
