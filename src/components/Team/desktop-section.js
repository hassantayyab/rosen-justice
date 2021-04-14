import React from 'react'
import { navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { BackgroundImage } from '../utils'
import { fadeIn, slideInDown, slideInUp, zoomIn } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'
import { ImgView } from '../../images'
import { Button } from '../common'
import { Container } from '../layouts'
import { useState } from 'react'
import { useEffect } from 'react'
import merge from 'react-animations/lib/merge'

const slideInDownAnimation = keyframes`${slideInDown}`
const slideInUpAnimation = keyframes`${slideInUp}`
const fadeInDownAnimation = keyframes`${merge(fadeIn, zoomIn)}`

const DesktopSection = styled.div``

const TopSection = styled.div`
	position: relative;
	overflow: hidden;

	.bg-wrapper {
		position: relative;
		width: 68%;
		height: 34rem;
		background: linear-gradient(
			90deg,
			rgba(20, 23, 40, 0.9) 70%,
			rgba(20, 23, 40, 0.99) 90%,
			rgba(20, 23, 40, 1) 100%
		);
	}

	header {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		color: var(--color-light);

		.container {
			max-width: 80rem;
			padding: 0 1.5rem;
			margin: 0 auto;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.text-wrapper {
			flex-shrink: 0;
			flex-basis: 40%;

			h3 {
				line-height: 1;
				width: 50%;
				margin-bottom: 1rem;
				opacity: 0;

				&.animate {
					opacity: 1;
					animation: ${slideInDownAnimation} 1.5s;
				}
			}

			h6 {
				width: 75%;
				opacity: 0;

				&.animate {
					opacity: 1;
					animation: ${slideInUpAnimation} 1.5s;
				}
			}

			.button-wrapper {
				margin-top: 2rem;

				#button {
					padding: 0.75rem 1rem;
				}
			}
		}
	}

	.wrapper {
		position: absolute;
		right: 0;
		top: 17%;
		width: 55%;
		z-index: 2;

		.list {
			display: flex;
			align-items: center;
			overflow-x: auto;
			&::-webkit-scrollbar {
				height: 0.5rem;
			}
			&::-webkit-scrollbar-track {
				box-shadow: inset 0 0 2px var(--color-light-700);
				background: var(--color-light-700);
				border-radius: 1rem;
			}
			&::-webkit-scrollbar-thumb {
				background: var(--color-secondary);
				border-radius: 1rem;
			}
			&::-webkit-scrollbar-thumb:hover {
				filter: brightness(90%);
			}

			.profiles-wrapper {
				display: flex;
				align-items: center;
				padding-bottom: 0.5rem;
			}

			.image-wrapper {
				position: relative;
				width: 21vw;
				height: 23vw;
				margin-right: 1.25rem;
				outline: none;
				cursor: pointer;

				> .gatsby-image-wrapper {
					height: 100%;
					z-index: -1;
				}

				.view-icon {
					display: none;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 4rem;
				}

				:hover,
				:focus,
				&.active {
					background: linear-gradient(
						0deg,
						rgba(201, 172, 43, 0.5) 0%,
						rgba(201, 172, 43, 0.5) 100%
					);

					.view-icon {
						display: inline-block;
					}
				}
			}
		}
	}

	@media ${device.md} {
		.bg-wrapper {
			height: 24rem;
		}

		header {
			.text-wrapper {
				h3 {
					width: 75%;
				}

				h6 {
					width: 100%;
				}
			}
		}

		.wrapper {
			top: 12%;
		}
	}

	@media ${device.sm} {
		.bg-wrapper {
			height: 20rem;
			width: 100%;
		}

		header {
			width: 100%;
			text-align: center;
			top: 28%;

			.text-wrapper {
				flex-basis: 100%;

				h3 {
					width: 100%;
				}

				h6 {
					display: none;
				}
			}
		}

		.wrapper {
			display: none;
		}
	}
`

const BottomSection = styled.section`
	height: 44rem;

	> #container:first-of-type {
		display: flex;
		align-items: flex-end;
	}

	.profile {
		display: none;
		justify-content: center;
		align-items: center;
		padding: 4rem 0;
		opacity: 0;

		&.animate {
			opacity: 1;
			animation: ${fadeInDownAnimation} 0.5s ease-in-out;
		}

		&.active {
			display: flex;
		}

		> div {
			flex-grow: 1;
			flex-basis: 0;
		}

		.image-wrapper {
			padding-right: 2rem;
			display: flex;
			justify-content: flex-end;
			margin-top: auto;

			.image {
				width: 24rem;
				height: auto;
				position: relative;

				.img-bg {
					position: absolute;
					left: -1.4rem;
					bottom: -1.25rem;
					width: 92%;
					height: 6rem;
					background-color: var(--color-primary);
				}
			}
		}

		.content-wrapper {
			padding-left: 2rem;

			.text-wrapper {
				width: 80%;
			}

			h3 {
				color: var(--color-secondary);
			}

			p {
				margin: 2rem 0;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 14;
			}
		}
	}

	@media ${device.sm} {
		display: none;
	}
`

const DesktopSectionComponent = ({ data, attorneys }) => {
	const [ref, inView] = useInView(View)
	const [selectedProfile, setSelectedProfile] = useState(0)

	useEffect(() => {
		setSelectedProfile(0)
		return () => {
			setSelectedProfile(0)
		}
	}, [attorneys.length])

	return (
		<DesktopSection>
			<TopSection ref={ref}>
				<div className='bg-wrapper'>
					<BackgroundImage
						image={getImage(data.teamBgImage?.localFile)}
						alt={data.teamBgImage?.altText}
					/>
				</div>

				<header>
					<div className='container'>
						<div className='text-wrapper'>
							<h3 className={animate(inView)}>{data.teamHeading}</h3>
							<h6 className={animate(inView)}>{data.teamText}</h6>
							<div className='button-wrapper'>
								<Button
									bgColor='var(--color-secondary)'
									onClick={() => navigate('/attorneys/')}>
									Meet our personal injury attorneys
								</Button>
							</div>
						</div>
					</div>
				</header>

				<div className='wrapper'>
					<div className='list'>
						<div className='profiles-wrapper'>
							{attorneys.length > 0 &&
								attorneys.map(({ _attorney_post }, i) => (
									<div
										key={i}
										className={`image-wrapper ${
											i === selectedProfile && 'active'
										}`}
										role='button'
										tabIndex='0'
										onClick={() => setSelectedProfile(i)}
										onKeyPress={() => setSelectedProfile(i)}>
										<div className='view-icon'>
											<img src={ImgView} alt='view' />
										</div>
										{_attorney_post.image && (
											<GatsbyImage
												image={getImage(_attorney_post.image?.localFile)}
												alt={_attorney_post.image?.altText}
											/>
										)}
									</div>
								))}
						</div>
					</div>
				</div>
			</TopSection>

			<BottomSection>
				<Container>
					{attorneys.length > 0 &&
						attorneys.map((a, i) => (
							<div
								className={`profile ${
									i === selectedProfile && 'active'
								} ${animate(inView)}`}
								key={i}>
								<div className='image-wrapper'>
									<div className='image'>
										<div className='img-bg'></div>
										{a._attorney_post.image && (
											<GatsbyImage
												image={getImage(a._attorney_post.image?.localFile)}
												alt={a._attorney_post.image?.altText}
												loading='auto'
											/>
										)}
									</div>
								</div>
								<div className='content-wrapper'>
									<div className='text-wrapper'>
										<h3>{a.title}</h3>
										<h6 className='font-heading-sm '>
											{a._attorney_post.designation}
										</h6>
										<p>{a._attorney_post.content}</p>
										<Button
											color='var(--color-light-200)'
											bgColor='var(--color-secondary)'
											borderColor='var(--color-secondary)'
											onClick={() => navigate(a.link)}>
											Learn More
										</Button>
									</div>
								</div>
							</div>
						))}
				</Container>
			</BottomSection>
		</DesktopSection>
	)
}

export { DesktopSectionComponent as DesktopSection }
