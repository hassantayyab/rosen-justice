import { graphql, navigate } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import { zoomIn } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { device } from '../../globalStyles'
import { useFaqListQuery } from '../../hooks'
import { Button } from '../common'
import { Container } from '../layouts'
import { BackgroundImage, FaqAccordion, VerticalLine } from '../utils'

const zoomInAnimation = keyframes`${zoomIn}`

const Faq = styled.div`
	position: relative;
	min-height: 50rem;
	overflow: hidden;
	background: linear-gradient(
		0deg,
		rgba(234, 234, 235, 0.99) 25%,
		rgba(234, 234, 235, 0.8) 70%
	);
	#background-image {
		.gatsby-image-wrapper {
			filter: grayscale(100%);
		}
	}

	header {
		#vertical-line {
			margin: 0 auto;
		}

		.text-wrapper {
			margin: 2rem 0 3rem 0;
			text-align: center;

			h6.font-heading-sm {
				color: var(--color-secondary);
			}

			h3 {
				margin-top: 0;
				opacity: 0;

				&.animate {
					opacity: 1;
					animation: 1.5s ${zoomInAnimation};
				}
			}
		}
	}

	section {
		max-width: 40rem;
		margin: 0 auto;
		text-align: center;

		#button {
			margin-top: 1rem;
		}
	}

	@media ${device.xs} {
		min-height: 48rem;

		#vertical-line {
			height: 2.5rem;
		}
	}
`

const FaqComponent = ({ data }) => {
	const allFaq = useFaqListQuery()

	const [ref, inView] = useInView(View)

	return (
		<Faq id='faq' ref={ref}>
			<BackgroundImage
				image={getImage(data.faqBgImage?.localFile)}
				alt={data.faqBgImage?.altText}
				loading='lazy'
			/>
			<Container>
				<header>
					<VerticalLine width='2px' height='4rem' />
					<div className='text-wrapper'>
						<h6 className='font-heading-sm'>FAQ</h6>
						<h3 className={animate(inView)}>{data.faqHeading}</h3>
						<h6>{data.faqSubheading}</h6>
					</div>
				</header>
				<section>
					{allFaq.length > 0 && <FaqAccordion data={allFaq.slice(0, 3)} />}
					<Button
						bgColor='var(--color-secondary)'
						onClick={() => navigate('/faqs/')}>
						View More Questions
					</Button>
				</section>
			</Container>
		</Faq>
	)
}

export const query = graphql`
	fragment FaqFragment on WpPage {
		_faq {
			faqHeading
			faqSubheading
			faqBgImage {
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
`

export { FaqComponent as Faq }
