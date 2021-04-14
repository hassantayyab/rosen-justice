exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const result = await graphql(`
		{
			blogListPage: allWpPost(sort: { fields: date, order: DESC }) {
				edges {
					node {
						id
					}
				}
			}

			testimonialListPage: allWpReview(sort: { fields: date, order: DESC }) {
				edges {
					node {
						id
					}
				}
			}

			attorneyListPage: allWpAttorney(sort: { fields: date, order: DESC }) {
				edges {
					node {
						id
					}
				}
			}

			faqListPage: allWpFaq(sort: { fields: date, order: DESC }) {
				edges {
					node {
						id
					}
				}
			}

			attorneyPage: allWpAttorney {
				edges {
					node {
						id
						uri
						title
					}
				}
			}

			subpage: allWpPage(
				filter: { pageTemplate: { eq: "subpage-template.php" } }
			) {
				edges {
					node {
						id
						uri
					}
				}
			}

			infopage: allWpPage(
				filter: { pageTemplate: { eq: "infopage-template.php" } }
			) {
				edges {
					node {
						id
						uri
					}
				}
			}

			blogpost: allWpPost(sort: { fields: date, order: DESC }) {
				edges {
					node {
						id
						uri
					}
				}
			}
		}
	`)

	// Check for any errors
	if (result.errors) {
		throw new Error(result.errors)
	}

	// Constants
	const postsPerPage = 8

	const {
		subpage,
		infopage,
		blogpost,
		attorneyPage,
		blogListPage,
		testimonialListPage,
		attorneyListPage,
		faqListPage,
	} = result.data

	const blogListPageTemplate = require.resolve('./src/templates/blog-list.js')
	Array.from({
		length: Math.ceil(blogListPage.edges.length / postsPerPage),
	}).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/blogs/` : `/blogs/${i + 1}`,
			component: blogListPageTemplate,
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages: Math.ceil(blogListPage.edges.length / postsPerPage),
				currentPage: i + 1,
			},
		})
	})

	const testimonialListPageTemplate = require.resolve(
		'./src/templates/testimonial-list.js'
	)
	Array.from({
		length: Math.ceil(testimonialListPage.edges.length / postsPerPage),
	}).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/testimonials/` : `/testimonials/${i + 1}`,
			component: testimonialListPageTemplate,
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages: Math.ceil(testimonialListPage.edges.length / postsPerPage),
				currentPage: i + 1,
			},
		})
	})

	const attorneyListPageTemplate = require.resolve(
		'./src/templates/attorney-list.js'
	)
	Array.from({
		length: Math.ceil(attorneyListPage.edges.length / postsPerPage),
	}).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/attorneys/` : `/attorneys/${i + 1}`,
			component: attorneyListPageTemplate,
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numPages: Math.ceil(attorneyListPage.edges.length / postsPerPage),
				currentPage: i + 1,
			},
		})
	})

	const faqListPageTemplate = require.resolve('./src/templates/faq-list.js')
	Array.from({
		length: Math.ceil(faqListPage.edges.length / 10),
	}).forEach((_, i) => {
		createPage({
			path: i === 0 ? `/faqs/` : `/faqs/${i + 1}`,
			component: faqListPageTemplate,
			context: {
				limit: 10,
				skip: i * 10,
				numPages: Math.ceil(faqListPage.edges.length / 10),
				currentPage: i + 1,
			},
		})
	})

	const subpageTemplate = require.resolve(`./src/templates/sub-page.js`)
	subpage.edges.forEach(({ node }) => {
		createPage({
			path: node.uri,
			component: subpageTemplate,
			context: { id: node.id },
		})
	})

	const infopageTemplate = require.resolve(`./src/templates/info-page.js`)
	infopage.edges.forEach(({ node }) => {
		createPage({
			path: node.uri,
			component: infopageTemplate,
			context: { id: node.id },
		})
	})

	const attorneypageTemplate = require.resolve(
		`./src/templates/attorney-page.js`
	)
	attorneyPage.edges.forEach(({ node }) => {
		createPage({
			path: node.uri,
			component: attorneypageTemplate,
			context: { id: node.id },
		})
	})

	const blogpostTemplate = require.resolve(`./src/templates/blog-post.js`)
	blogpost.edges.forEach(({ node }) => {
		createPage({
			path: `/blog${node.uri}`,
			component: blogpostTemplate,
			context: { id: node.id },
		})
	})
}
