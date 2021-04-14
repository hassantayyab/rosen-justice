import { graphql, navigate } from 'gatsby'
import * as React from 'react'
import { AttorneyCard } from '../components/common'
import { CardContact } from '../components/common/card-contact'
import SubPageLayout from '../components/common/sub-page-layout'
import { Pagination } from '../components/utils'
import { useAttorney, useAttorneysList } from '../hooks'

const AttorneyListPage = ({ data, location }) => {
	const heroData = useAttorney()
	const attorneys = data.allWpAttorney.nodes

	const totalData = useAttorneysList().length
	const currentPage = +(location.pathname.split('/').slice(-1)[0] === ''
		? '1'
		: location.pathname.split('/').slice(-1)[0])
	const pageSize = 8

	const handlePageChange = (v) => {
		navigate(v === 0 ? `/attorneys/` : `/attorneys/${v + 1}`)
	}

	return (
		<SubPageLayout
			heroData={heroData._hero}
			seoData={heroData.seo}
			location={location}>
			<section className='grid'>
				{attorneys.slice(0, pageSize).map((attorney, i) => (
					<AttorneyCard key={i} data={attorney} />
				))}
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

export const attorneyListQuery = graphql`
	query attorneyListQuery($skip: Int!, $limit: Int!) {
		allWpAttorney(
			sort: { fields: date, order: DESC }
			limit: $limit
			skip: $skip
		) {
			nodes {
				title
				link
				_attorney_post {
					designation
					content
					image {
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
		}
	}
`

export default AttorneyListPage
