import { Form, Formik } from 'formik'
import { graphql, navigate } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { Button } from '../common'
import { Container } from '../layouts'
import {
	BackgroundImage,
	HorizontalLine,
	Schema,
	submitForm,
	VerticalLine,
} from '../utils'
import { FormInput } from './form-input'
import { useState } from 'react'
import { useContactQuery } from '../../hooks'
import { fadeIn, pulse } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'

const fadeInAnimation = keyframes`${fadeIn}`
const pulseAnimation = keyframes`${pulse}`

const Contact = styled.div`
	position: relative;
	padding-bottom: 6rem;
	overflow: hidden;
	background: linear-gradient(
		0deg,
		rgba(20, 23, 40, 1) 0%,
		rgba(20, 23, 40, 0.99) 30%,
		rgba(20, 23, 40, 0.9) 60%
	);
	color: var(--color-light);

	#background-image {
		.gatsby-image-wrapper {
			filter: grayscale(100%);
		}
	}

	header {
		#vertical-line {
			margin: 0 auto;
		}

		#horizontal-line {
			margin: 2rem auto;
			width: 60rem !important;
			max-width: 100% !important;
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
					animation: 3s ${fadeInAnimation};
				}

				span {
					color: var(--color-secondary);
				}
			}

			h5 {
				opacity: 0;
				&.animate {
					opacity: 1;
					animation: ${pulseAnimation} 1.5s 3;
				}
			}
		}
	}

	section {
		max-width: 50rem;
		margin: 0 auto;

		form {
			text-align: center;

			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				flex-wrap: wrap;

				> div {
					flex-basis: 45%;
					margin-bottom: 4rem;
				}
			}

			#button {
				margin-top: 4rem;
			}

			.error {
				position: absolute;
				left: 0;
				color: #ff3f54;
				font-size: 0.85rem;
			}
		}
	}

	@media ${device.xs} {
		padding-bottom: 4rem;

		#vertical-line {
			height: 2.5rem;
		}

		section {
			form {
				.row {
					> div {
						flex-basis: 100%;
					}
				}
			}

			#button {
				width: 100%;
			}
		}
	}
`

const Message = styled.div`
	position: absolute;
	bottom: 6%;
	left: 0;
	right: 0;
	font-size: 0.9rem;
	margin-bottom: 0 !important;
	color: var(--color-light-700);
`

const ContactComponent = () => {
	const data = useContactQuery()
	const [submit, setSubmit] = useState({
		sent: false,
		error: false,
		message: '',
	})

	const [ref, inView] = useInView(View)

	const handleSubmit = async (values, setSubmitting, resetForm) => {
		try {
			await submitForm(values, setSubmitting, resetForm)
			navigate('/your-form-was-submitted/')
			resetForm()
		} catch (error) {
			setSubmit({
				sent: true,
				error: true,
				message: 'Something went wrong! Please try again.',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Contact id='contact' ref={ref}>
			<BackgroundImage
				image={getImage(data.contactBgImage?.localFile)}
				alt={data.contactBgImage?.altText}
				loading='lazy'
			/>
			<Container>
				<header>
					<VerticalLine width='2px' height='4rem' />
					<div className='text-wrapper'>
						<h6 className='font-heading-sm'>Get in touch</h6>
						<h3 className={animate(inView)}>
							Contact us for a <br />
							<span>Free Consultation</span>
						</h3>
						<HorizontalLine width='60rem' height='4px' />
						<h5 className={animate(inView)}>Send us a message!</h5>
					</div>
				</header>
				<section>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							email: '',
							phone: '',
							message: '',
						}}
						validationSchema={Schema}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							handleSubmit(values, setSubmitting, resetForm)
						}}>
						{({ isSubmitting }) => (
							<Form
								method='post'
								name='contact'
								data-netlify='true'
								data-netlify-honeypot='bot-field'>
								<input type='hidden' name='bot-field' />
								<input type='hidden' name='form-name' value='contact' />

								<div className='row'>
									<FormInput name='firstName' label='First Name' />
									<FormInput name='lastName' label='Last Name' />
								</div>
								<div className='row'>
									<FormInput name='email' label='Email' type='email' />
									<FormInput name='phone' label='Phone No' type='tel' />
								</div>
								<FormInput
									name='message'
									label='Describe Your Case'
									className='textarea'
									component='textarea'
									rows='5'
								/>
								<Button
									bgColor='var(--color-secondary)'
									color='var(--color-light-200)'
									borderColor='var(--color-secondary)'
									disabled={isSubmitting}>
									Send a message
								</Button>

								{submit.sent && (
									<Message error={submit.error}>{submit.message}</Message>
								)}
							</Form>
						)}
					</Formik>
				</section>
			</Container>
		</Contact>
	)
}

export const query = graphql`
	fragment ContactFragment on WpPage {
		_contact {
			contactBgImage {
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

export { ContactComponent as Contact }
