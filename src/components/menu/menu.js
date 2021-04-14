import { Link, navigate } from 'gatsby'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { useGeneralDataQuery, useHeaderMenuQuery } from '../../hooks'
import { ImgBgMenuLogo, ImgCallWhite, ImgClose } from '../../images'
import { Accordion } from '../utils/accordion'
import { Button } from '../common'
import { HorizontalLine } from '../utils'

const Menu = styled.aside`
	position: fixed;
	top: 0;
	right: 0;
	z-index: 5;
	height: 100vh;
	width: ${({ isActive }) => (isActive ? '50vw' : '0')};
	background-color: #0f1221;
	color: var(--color-light);
	overflow: hidden;
	transition: 0.5s;
	display: flex;

	.main {
		position: relative;
		width: 100%;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
		-ms-overflow-style: none;
		scrollbar-width: none;

		.img-wrapper {
			position: absolute;
			right: 0;
			bottom: 0;
			z-index: -1;
			width: 80%;

			img {
				width: 100%;
			}
		}

		.wrapper {
			z-index: 1;
			padding: 6rem 4rem;
			display: flex;
			flex-direction: column;
			height: 100%;
			opacity: ${({ isActive }) => (isActive ? '1' : '0')};
			transition: 0.3s;

			.button-wrapper {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 2rem;

				#button {
					margin-bottom: 2rem;
					min-width: 18rem;

					:first-child {
						margin-right: 2rem;
					}

					img {
						width: 1.25rem;
						margin-right: 0.5rem;
					}
				}
			}

			.menu-wrapper {
				flex-grow: 1;

				#accordion {
					transition: all 0.2s ease-in-out;
					border-top: 1px solid var(--color-primary);

					:first-child {
						border-top: 0;
					}

					:last-child {
						border-bottom: 1px solid var(--color-primary);
					}

					.menu-item {
						padding: 1.75rem 0;
						width: 100%;
						text-align: left;
					}

					a {
						color: var(--color-light);
						font-size: 1.25rem;

						:hover,
						:focus {
							color: var(--color-secondary);
						}

						&.active {
							color: var(--color-secondary);
						}
					}

					button.accordion {
						background-color: var(--color-transparent);
						cursor: pointer;
						display: flex;
						align-items: center;
						border: none;
						outline: none;
						font-family: 'Graphik', serif !important;
						text-transform: uppercase;

						.icon {
							margin-left: 0.5rem;
							margin-right: 0.5rem;
							width: 1rem;
						}
					}

					#content {
						overflow: hidden;
						padding: 0 0.5rem;
						transition: max-height 0.3s ease;

						.sub-menu-wrapper {
							padding: 0.75rem;
							:first-child {
								padding-top: 0;
							}
							:last-child {
								padding-bottom: 1.25rem;
							}
						}
					}
				}
			}
		}
	}

	.top-bar {
		position: relative;
		display: none;
		justify-content: space-between;
		align-items: stretch;
		border-bottom: 1px solid var(--color-primary);

		#horizontal-line {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.text-wrapper {
			white-space: nowrap;
			flex-grow: 1;
			padding: 1.75rem;

			h6 {
				color: var(--color-dark-200);
			}
		}

		.close-btn {
			color: var(--color-secondary);
			background-color: #0d101e;
			border: none;
			padding: 0 1.75rem;
			line-height: 1;
			cursor: pointer;

			img {
				width: 1.5rem;
			}
		}
	}

	.side-bar {
		height: 100%;
		width: 6rem;
		background-color: #0d101e;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;

		.btn-wrapper {
			text-align: center;
			width: 100%;
			overflow: hidden;

			.close-btn {
				width: 1.25rem;
				color: var(--color-secondary);
				background-color: var(--color-transparent);
				border: none;
				padding: 2rem 0 0.75rem 0;
				line-height: 1;
				cursor: pointer;
			}

			div {
				text-transform: uppercase;
				font-size: 0.8rem;
				text-align: center;
			}
		}

		h6 {
			transform: rotate(180deg);
			writing-mode: vertical-rl;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-grow: 1;
			text-align: center;
		}
	}

	@media ${device.md} {
		width: ${({ isActive }) => (isActive ? '60vw' : '0')};
	}

	@media ${device.sm} {
		width: ${({ isActive }) => (isActive ? '100%' : '0')};
	}

	@media ${device.xs} {
		.main {
			.wrapper {
				padding: 0 1.75rem;
				height: unset;
				min-height: 80vh;

				.menu-wrapper {
					a {
						white-space: nowrap;
					}
				}

				.button-wrapper {
					justify-content: center;

					#button {
						padding-top: 1rem;
						padding-bottom: 1rem;

						:first-child {
							margin-right: 0;
							order: 2;
						}
					}
				}
			}
		}

		.top-bar {
			display: flex;
		}

		.side-bar {
			display: none;
		}
	}
`

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, openChange) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				openChange()
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, openChange])
}

const MenuComponent = ({ isOpen, openChange }) => {
	const { bannerText, contactNumber } = useGeneralDataQuery()
	const menus = useHeaderMenuQuery()
	const wrapperRef = useRef(null)
	useOutsideAlerter(wrapperRef, openChange)

	return (
		<Menu isActive={isOpen} ref={wrapperRef}>
			<div className='main'>
				<div className='top-bar'>
					<HorizontalLine width='50%' height='4px' />
					<div className='text-wrapper'>
						<h6>{bannerText}</h6>
					</div>
					<button type='button' className='close-btn' onClick={openChange}>
						<img src={ImgClose} alt='click to close' />
					</button>
				</div>
				<div className='img-wrapper'>
					<img src={ImgBgMenuLogo} alt='menu logo bg' />
				</div>
				<div className='wrapper'>
					<div className='menu-wrapper'>
						{menus &&
							menus.map((m, i) => (
								<Accordion
									key={i}
									content={'data'}
									activeType={m.childItems.nodes.length === 0 && 'none'}
									iconColor='var(--color-secondary'>
									<div className='menu-item'>
										<Link to={m.path} activeClassName='active'>
											{m.label}
										</Link>
									</div>
									{m.childItems.nodes.length > 0 &&
										m.childItems.nodes.map((subMenu, i) => (
											<div className='sub-menu-wrapper' key={i}>
												<Link to={subMenu.path} activeClassName='active'>
													{subMenu.label}
												</Link>
											</div>
										))}
								</Accordion>
							))}
					</div>

					<div className='button-wrapper'>
						<Button
							borderColor='var(--color-secondary)'
							bgColor='var(--color-secondary)'
							href={`tel:${contactNumber}`}>
							<img src={ImgCallWhite} alt='call us' />
							<span>{contactNumber}</span>
						</Button>
						<Button
							bgColor='var(--color-transparent)'
							onClick={() => navigate('/contact/')}>
							100% free consultation
						</Button>
					</div>
				</div>
			</div>
			<div className='side-bar'>
				<div className='btn-wrapper'>
					<button type='button' className='close-btn' onClick={openChange}>
						<img src={ImgClose} alt='click to close' />
					</button>
					<div>Menu</div>
				</div>
				<h6>{bannerText}</h6>
			</div>
		</Menu>
	)
}

export { MenuComponent as Menu }
