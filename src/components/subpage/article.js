import React from 'react'
import styled from 'styled-components'

const Article = styled.article`
	display: flex;
	flex-direction: column;

	/* Resusable CSS for Posts */
	/* Adjust Headings for Articles */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-bottom: 0.75rem;
		font-weight: lighter;
	}
	h1 {
		font-size: 3rem;
		line-height: 1.3;
		margin-bottom: 1.25rem;
	}
	h2 {
		font-size: 2.25rem;
		line-height: 1.3;
		margin-top: 3.5rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 1.75rem;
		color: var(--color-primary);
		margin-top: 0;
		order: 0;
		line-height: 1.3;
		margin-bottom: 0.75rem;
	}
	h4 {
		font-size: 1.5rem;
	}
	h5 {
		font-size: 1.25rem;
	}
	h6 {
		font-size: 1rem;
	}
	strong {
		font-weight: bold;
	}
	span {
		color: var(--color-primary);
	}
	h5,
	h6 {
		color: var(--color-primary);
	}
	p {
		margin-bottom: 1rem;
	}
	ul {
		list-style: inside;
		margin-bottom: 1rem;
	}
	a {
		color: var(--color-secondary);
		text-decoration: underline;
	}
	.gatsby-image-wrapper {
		border-radius: var(--br-card);
		overflow: hidden !important;
		width: 100% !important;
		margin: 2rem 0;
	}
	.wp-block-gallery {
		margin: 2rem 0;
		ul {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			> li {
				.gatsby-image-wrapper {
					border-radius: var(--br-card);
					overflow: hidden !important;
					width: 15rem !important;
				}

				&:not(:last-child) {
					padding-right: 1rem;
				}
			}
		}
	}
	.title-inner-html {
		color: var(--color-dark-200);
	}
	.text-inner-html {
		line-height: 1.7;
	}
	/* Resusable CSS for Posts */
`

const ArticleComponent = ({ children }) => {
	const { title, content } = children

	return (
		<Article>
			{title && <h1>{title}</h1>}
			<div
				className='text-inner-html'
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</Article>
	)
}

export { ArticleComponent as Article }
