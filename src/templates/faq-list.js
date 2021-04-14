import { graphql, navigate } from 'gatsby'
import * as React from 'react'
import { CardContact } from '../components/common'
import SubPageLayout from '../components/common/sub-page-layout'
import { FaqAccordion, Pagination } from '../components/utils'
import { useFaqListQuery, useFaqQuery } from '../hooks'

const FAQListPage = ({ data, location }) => {
	const heroData = useFaqQuery()
	const faqs = data.allWpFaq.nodes.map((n) => {
		return {
			question: n.title,
			answer: n._question.answer,
		}
	})

	const totalData = useFaqListQuery().length
	const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
		? '1'
		: location.pathname.split('/').slice(-1)[0])
	const pageSize = 10

	const handlePageChange = (v) => {
		navigate(v === 0 ? `/faqs/` : `/faqs/${v + 1}`)
	}

	return (
		<SubPageLayout
			heroData={heroData._hero}
			seoData={heroData.seo}
			location={location}>
			<section>
				{faqs.length > 0 && (
					<FaqAccordion
						data={faqs.slice(
							(currentPage - 1) * pageSize,
							(currentPage - 1) * pageSize + pageSize
						)}
						page={currentPage - 1}
						pageSize={pageSize}
					/>
				)}
			</section>

			<Pagination
				currentPage={currentPage}
				totalData={totalData}
				perPageData={pageSize}
				pageChange={handlePageChange}
			/>
			<CardContact />
		</SubPageLayout>
	)
}

export const faqListQuery = graphql`
	query faqListQuery($skip: Int!, $limit: Int!) {
		allWpFaq(sort: { fields: date, order: DESC }, limit: $limit, skip: $skip) {
			nodes {
				title
				_question {
					answer
				}
			}
		}
	}
`

export default FAQListPage
