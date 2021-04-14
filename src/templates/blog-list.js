import { graphql, navigate } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { GridCard } from '../components/blog'
import { Hero, NavBar } from '../components/common'
import { CardContact } from '../components/common/card-contact'
import { Footer } from '../components/footer'
import { Container } from '../components/layouts'
import { Layout } from '../components/layouts/layout'
import { Pagination } from '../components/utils'
import Seo from '../components/utils/seo'
import { device } from '../globalStyles'
import { useBlogs, useBlogsList } from '../hooks'

const Main = styled.main`
	margin: 6rem 0;

	.grid {
		margin: 4rem 0 4rem 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
		row-gap: 4rem;
		column-gap: 2rem;
		justify-items: center;
	}

	#grid-card {
		width: 100%;

		.image {
			height: 23rem;
		}
	}

	@media ${device.md} {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
		}

		#grid-card {
			.image {
				height: 20rem;
			}
		}
	}

	@media ${device.sm} {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		}

		#grid-card {
			.image {
				height: 16rem;
			}
		}
	}
`

const BlogListPage = ({ data, location }) => {
	const heroData = useBlogs()
	const blogs = data.allWpPost.nodes

	const totalData = useBlogsList().length
	const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
		? '1'
		: location.pathname.split('/').slice(-1)[0])
	const pageSize = 8

	const handlePageChange = (v) => {
		navigate(v === 0 ? `/blogs/` : `/blogs/${v + 1}`)
	}

	return (
		<Layout>
			<Seo data={heroData.seo} />
			<header>
				<NavBar />
				<Hero data={heroData._hero} scrollRef='#scrollRef'></Hero>
			</header>
			<Main id='scrollRef'>
				<Container>
					<section className='grid'>
						{blogs.slice(0, pageSize / 2).map((blog, i) => (
							<GridCard key={i} data={blog} />
						))}
					</section>
					<CardContact isForGrid={true} />
					<section className='grid'>
						{blogs.slice(pageSize / 2).map((blog, i) => (
							<GridCard key={i} data={blog} />
						))}
					</section>

					<Pagination
						currentPage={currentPage}
						totalData={totalData}
						perPageData={pageSize}
						pageChange={handlePageChange}
					/>
				</Container>
			</Main>
			<Footer />
		</Layout>
	)
}

export const blogListQuery = graphql`
	query blogListQuery($skip: Int!, $limit: Int!) {
		allWpPost(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip) {
			nodes {
				...PostHeroFragment
				excerpt
				date(formatString: "MMM D, Y")
				uri
			}
		}
	}
`

export default BlogListPage
