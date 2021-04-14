import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import { useState } from 'react'
import { zoomIn } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { device } from '../../globalStyles'
import { useProcessQuery } from '../../hooks'
import { Button, ButtonPlay, FormModal, StepCard } from '../common'
import { Container } from '../layouts'
import { BackgroundImage, VerticalLine } from '../utils'

const zoomInAnimation = keyframes`${zoomIn}`

const Process = styled.div`
	margin-bottom: 4rem;

	> header {
		position: relative;
		height: 28rem;
		background: linear-gradient(
			90deg,
			rgba(234, 234, 235, 0.9) 0%,
			rgba(234, 234, 235, 0.9) 100%
		);

		#vertical-line {
			margin: 0 auto;
		}

		.text-wrapper {
			padding: 2rem 0 4rem 0;
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

	> section {
		margin-top: -12rem;
		text-align: center;

		.steps-wrapper {
			padding: 4rem 1rem 1rem 0;
			margin-bottom: 3rem;
			display: flex;
			overflow-x: auto;

			.step {
				position: relative;
				margin-right: 0.25rem;

				#button-play {
					position: absolute;
					z-index: 1;
					top: 50%;
					right: -5%;
					transform: translateY(-50%);
				}

				#step-card {
					height: 100%;
				}
			}
		}

		@media ${device.xs} {
			margin-top: -16rem;

			#container:first-of-type {
				padding-right: 0;
			}

			.steps-wrapper {
				&::-webkit-scrollbar {
					display: none;
				}
				-ms-overflow-style: none;
				scrollbar-width: none;

				.step:last-of-type {
					padding-right: 1.5rem;
				}
			}
		}
	}

	@media ${device.xs} {
		#vertical-line {
			height: 2.5rem;
		}
	}
`

const ProcessComponent = () => {
	const {
		processHeading,
		processSubheading,
		processBgImage,
		processSteps,
	} = useProcessQuery()

	const [ref, inView] = useInView(View)

	const [modalIsOpen, setIsOpen] = useState(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<Process id='process' ref={ref}>
			<header>
				<BackgroundImage
					image={getImage(processBgImage?.localFile)}
					alt={processBgImage?.altText}
				/>
				<Container>
					<VerticalLine width='2px' height='4rem' />
					<div className='text-wrapper'>
						<h6 className='font-heading-sm'>{processSubheading.top}</h6>
						<h3 className={animate(inView)}>{processHeading}</h3>
						<h6>{processSubheading.bottom}</h6>
					</div>
				</Container>
			</header>

			<section>
				<Container>
					<div className='steps-wrapper'>
						{processSteps.length > 0 &&
							processSteps.map((step, i) => (
								<div className='step' key={i}>
									<StepCard
										image={getImage(step.image?.localFile)}
										altText={step.image?.altText}
										content={step.text}
									/>
									{i < processSteps.length - 1 && <ButtonPlay size='small' />}
								</div>
							))}
					</div>
				</Container>
				<Container>
					<Button
						bgColor='var(--color-secondary)'
						onClick={openModal}
						onKeyDown={openModal}>
						Take your first step, contact us today
					</Button>
				</Container>
			</section>

			<FormModal isOpen={modalIsOpen} togglePlayer={closeModal} />
		</Process>
	)
}

export { ProcessComponent as Process }
