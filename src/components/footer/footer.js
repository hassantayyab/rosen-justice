import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { useFooterMenuQuery, useGeneralDataQuery } from '../../hooks'
import { Container } from '../layouts'
import { Accordion } from '../utils/accordion'
import { ImgLogoIcon } from '../../images'
import { ButtonScrollTop } from '../common'

const Footer = styled.footer`
	position: relative;
	background-color: var(--color-primary);
	padding: 2rem 0;

	.static-image-wrapper {
		position: absolute;
		width: 32rem;
		right: 0;
		bottom: 0;
		z-index: 0;

		@media ${device.sm} {
			width: 93%;
			left: 3%;
			top: 7rem;
		}
	}

	main {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding: 4rem 0;

		section {
			color: var(--color-light);
			border-right: 1px solid var(--color-dark-200);
			flex-grow: 1;

			.image-wrapper {
				width: 10rem;
			}

			h6 {
				font-size: 1rem;
			}

			h5 {
				color: var(--color-secondary);
			}

			a {
				cursor: pointer;
				color: var(--color-light);
				will-change: color;
				transition: color 0.2s ease-in-out;

				:hover,
				:focus {
					color: var(--color-light);
				}
			}

			h4 {
				margin-bottom: 1.5rem;
				line-height: 1;
			}

			ul {
				li {
					&::before {
						display: none;
					}

					color: var(--color-light);
					display: flex;
					align-items: center;

					:not(:last-child) {
						margin-bottom: 1.5rem;
					}

					img {
						width: 1.25rem;
						vertical-align: middle;
						margin-right: 0.5rem;
					}
				}
			}

			:first-child {
				display: flex;
				padding-right: 3rem;
			}

			:nth-child(2) {
				padding: 0 3rem;
				display: flex;
				justify-content: space-between;
				color: var(--color-light);

				ul {
					:first-of-type {
						padding-right: 2rem;
					}

					li {
						text-transform: uppercase;
					}
				}
			}

			:last-child {
				border: none;
				padding-left: 3rem;

				h6 {
					text-transform: uppercase;
					margin-bottom: 2.5rem;

					:last-of-type {
						margin-top: auto;
					}
				}
			}

			.locations {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.address-info {
					color: var(--color-light-700);

					a {
						display: block;
						color: var(--color-light-700);
						cursor: pointer;
					}
				}

				.mobile {
					display: none;

					#accordion {
						button.accordion {
							background-color: var(--color-transparent) !important;
							cursor: pointer;
							padding: 1.5rem 1rem 0 0;
							display: flex !important;
							align-items: center;
							border: none;
							outline: none;
						}
					}

					#content {
						overflow: hidden;
						padding: 0 0.5rem;
						transition: max-height 0.3s ease;
					}
				}

				> div:first-of-type {
					padding-right: 2rem;
				}

				a {
					display: block;
					max-width: 16rem;
					margin: 1rem 0;
				}
			}
		}

		@media ${device.md} {
			section {
				:first-child {
					padding-right: 2rem;
				}

				:nth-child(2) {
					padding-right: 2rem;
				}

				:last-child {
					padding-left: 2rem;
				}
			}
		}

		@media ${device.sm} {
			flex-direction: column;
			align-items: center;
			padding: 0;

			section {
				width: 100%;
				text-align: center;
				border-right: none;

				:first-child {
					padding: 2rem 1rem;
					border: none;

					.image-wrapper {
						margin: 0 auto;
					}
				}

				:nth-child(2) {
					padding: 0 2rem;
					justify-content: flex-start;
				}

				:last-child {
					text-align: left;
					padding: 2rem 0 0 0;
					border-bottom: 1px solid var(--color-dark-200);

					h6 {
						padding-left: 1rem;
						margin-bottom: 1.25rem;
					}

					.locations {
						flex-direction: column;
						align-items: flex-start;

						.desktop {
							display: none;
						}

						.mobile {
							display: block;
							width: 100%;
						}

						> div {
							border-top: 1px solid var(--color-dark-200);
							width: 100%;
							padding-right: 0;
							padding-bottom: 1.5rem;
						}
					}
				}
			}
		}

		@media ${device.xs} {
			section {
				:nth-child(2) {
					justify-content: space-between;
				}
			}
		}
	}

	.copyright {
		text-align: center;
		color: var(--color-light);
		padding: 3rem 0;
		margin: 0 auto;
		border-top: 1px solid var(--color-dark-200);

		p {
			max-width: 50rem;
			color: var(--color-light-700);
			margin: 0 auto 2rem auto;
			opacity: 60%;
		}

		small {
			text-transform: uppercase;
		}

		@media ${device.md} {
			border-top: none;
			padding: 2rem 0 1rem 0;

			p {
				display: none;
			}
		}
	}
`

const FooterComponent = () => {
	const data = useGeneralDataQuery()
	const allMenus = useFooterMenuQuery()

	const firstColMenus = allMenus.slice(0, 4)
	const lastColMenus = allMenus.slice(4)

	return (
		<Footer>
			<ButtonScrollTop />
			<div className='static-image-wrapper'>
				<img src={ImgLogoIcon} alt='footer bg logo' />
			</div>
			<Container>
				<main>
					<section>
						<div className='image-wrapper'>
							{data.footerLogo && (
								<GatsbyImage
									image={getImage(data.footerLogo?.localFile)}
									alt={data.footerLogo?.altText}
								/>
							)}
						</div>
					</section>
					<section>
						{firstColMenus && (
							<ul>
								{firstColMenus.map((m, i) => (
									<li key={i}>
										<Link to={m.link.url}>{m.label}</Link>
									</li>
								))}
							</ul>
						)}
						{lastColMenus && (
							<ul>
								{lastColMenus.map((m, i) => (
									<li key={i}>
										<Link to={m.link.url}>{m.label}</Link>
									</li>
								))}
							</ul>
						)}
					</section>
					<section>
						<h6 className='font-heading-sm'>Office Locations</h6>
						<div className='locations'>
							{data.locations &&
								data.locations.map((p, i) => (
									<div key={i}>
										<div className='mobile'>
											<Accordion
												content={'data'}
												iconColor='var(--color-secondary'>
												<h5>{p.place}</h5>
												<div className='address-info'>
													<a
														href={p.googleLink}
														target='_blank'
														rel='noreferrer'>
														{p.address}
													</a>
													<a href={`tel:${p.number}`}>Phone: {p.number}</a>
												</div>
											</Accordion>
										</div>
										<div className='desktop'>
											<h5>{p.place}</h5>
											<div className='address-info'>
												<a href={p.googleLink} target='_blank' rel='noreferrer'>
													{p.address}
												</a>
												<a href={`tel:${p.number}`}>Phone: {p.number}</a>
											</div>
										</div>
									</div>
								))}
						</div>
					</section>
				</main>
				<footer className='copyright'>
					{data.footerText && <p>{data.footerText}</p>}
					<small>
						<span role='img' aria-label='copyright'>
							Copyright &copy;{' '}
						</span>
						{new Date().getFullYear()} {data.websiteName}
					</small>
				</footer>
			</Container>
		</Footer>
	)
}

export { FooterComponent as Footer }
