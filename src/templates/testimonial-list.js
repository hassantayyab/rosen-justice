import { graphql, navigate } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'
import { Hero, NavBar, TestimonialCard } from '../components/common'
import { CardContact } from '../components/common/card-contact'
import { Footer } from '../components/footer'
import { Container } from '../components/layouts'
import { Layout } from '../components/layouts/layout'
import { Pagination } from '../components/utils'
import Seo from '../components/utils/seo'
import { device } from '../globalStyles'
import { useTestimonialsListQuery, useTestimonialsQuery } from '../hooks'

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

const TestimonialListPage = ({ data, location }) => {
	const heroData = useTestimonialsQuery()
	const testimonials = data.allWpReview.nodes

	const totalData = useTestimonialsListQuery().length
	const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
		? '1'
		: location.pathname.split('/').slice(-1)[0])
	const pageSize = 8

	const handlePageChange = (v) => {
		navigate(v === 0 ? `/testimonials/` : `/testimonials/${v + 1}`)
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
				<div className="birdeyeScrollingReviewsWidget" id="bf-revz-widget-1234567935183" style={{ webkitOverflowScrolling: "touch" }}><div className="bf-dv"><span className="bf-spn"> powered by <a className="bf-pwr" href="http://www.localreviews.buzz/" target="_blank" rel="noreferrer">LocalReviews.Buzz</a></span></div></div>
					<section className='grid'>
						{testimonials.slice(0, pageSize / 2).map((testimonial, i) => (
							<TestimonialCard
								key={i}
								author={testimonial.title}
								review={testimonial._review_post.text}
							/>
						))}
					</section>
					<CardContact isForGrid={true} />
					<section className='grid'>
						{testimonials.slice(pageSize / 2).map((testimonial, i) => (
							<TestimonialCard
								key={i}
								author={testimonial.title}
								review={testimonial._review_post.text}
							/>
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

export const testimonialistQuery = graphql`
	query testimonialistQuery($skip: Int!, $limit: Int!) {
		allWpReview(
			sort: { fields: date, order: DESC }
			limit: $limit
			skip: $skip
		) {
			nodes {
				title
				link
				_review_post {
					text
				}
			}
		}
	}
`

export default TestimonialListPage
