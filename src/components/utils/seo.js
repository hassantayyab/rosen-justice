import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

const Seo = ({
	data: {
		title,
		opengraphDescription,
		opengraphSiteName,
		opengraphType,
		opengraphImage,
		metaKeywords,
		canonical,
		twitterTitle,
		twitterDescription,
		twitterImage,
	},
}) => {
	const { wpPage } = useStaticQuery(query)

	const {
		defaultTitle,
		defaultOpengraphDescription,
		defaultOpengraphSiteName,
		defaultOpengraphType,
		defaultOpengraphImage,
		defaultMetaKeywords,
		defaultCanonical,
		defaultTwitterTitle,
		defaultTwitterDescription,
		defaultTwitterImage,
	} = wpPage.seo

	const seo = {
		title: title || defaultTitle,
		description: opengraphDescription || defaultOpengraphDescription,
		// url: `https://${opengraphSiteName || defaultOpengraphSiteName}/${baseUrl}${
		//   opengraphUrl || defaultOpengraphUrl
		// }`,
		url: `https://${opengraphSiteName || defaultOpengraphSiteName}`,
		siteName: opengraphSiteName || defaultOpengraphSiteName,
		type: opengraphType || defaultOpengraphType,
		image: opengraphImage || defaultOpengraphImage,
		keywords: metaKeywords || defaultMetaKeywords,
		canonical: canonical || defaultCanonical,
		twitterTitle: twitterTitle || defaultTwitterTitle,
		twitterDescription: twitterDescription || defaultTwitterDescription,
		twitterImage: twitterImage || defaultTwitterImage,
	}

	// Uncomment for testing purposes
	// console.log('SEO ====>', seo)

	return (
		<Helmet title={seo.title}>
			<html lang='en' />
			<meta name='description' content={seo.description} />
			<meta name='image' content={seo.image} />

			{seo.url && <meta property='og:url' content={seo.url} />}
			{seo.siteName && <meta property='og:site_name' content={seo.siteName} />}

			{(seo.type === 'article' ? true : null) && (
				<meta property='og:type' content='article' />
			)}
			{seo.title && <meta property='og:title' content={seo.title} />}
			{seo.description && (
				<meta property='og:description' content={seo.description} />
			)}
			{seo.image && (
				<meta property='og:image' content={getImage(seo.image?.localFile)} />
			)}

			{seo.canonical && <link rel='canonical' href={seo.canonical} />}

			<meta name='twitter:card' content='summary_large_image' />

			{/* Twitter */}
			{seo.twitterTitle && (
				<meta name='twitter:title' content={seo.twitterTitle} />
			)}
			{seo.twitterDescription && (
				<meta name='twitter:description' content={seo.twitterDescription} />
			)}
			{seo.twitterImage && (
				<meta
					name='twitter:image'
					content={getImage(seo.twitterImage?.localFile)}
				/>
			)}
		</Helmet>
	)
}

export default Seo

const query = graphql`
	query SEO {
		wpPage(slug: { eq: "home" }) {
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
	}
`
