import { useStaticQuery, graphql } from 'gatsby'

export const useFaqListQuery = () => {
	const data = useStaticQuery(graphql`
		query FaqListQuery {
			allWpFaq {
				nodes {
					title
					_question {
						answer
					}
				}
			}
		}
	`)

	return formatData(data.allWpFaq.nodes)
}

function formatData(data) {
	return data.map((e) => ({
		question: e.title,
		answer: e._question.answer,
	}))
}
