import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { ImgLogoText } from '../../images'
import { Container } from '../layouts'
import { BackgroundImage, VerticalLine } from '../utils'
import { ButtonFab } from './button-fab'
import { slideInDown, slideInUp } from 'react-animations'
import { animate, View } from '../../animations'
import { useInView } from 'react-intersection-observer'

const slideInDownAnimation = keyframes`${slideInDown}`
const slideInUpAnimation = keyframes`${slideInUp}`

const Hero = styled.div`
	position: relative;
	box-shadow: inset 10px 20px 300px var(--color-primary);
	background: radial-gradient(rgba(20, 23, 40, 0.5), var(--color-primary));
	height: ${({ height }) => (height ? height : '32rem')};

	.logo-text {
		position: absolute;
		max-width: 78rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
		width: 90%;
		top: 50%;
		transform: translateY(-70%);
	}

	.content-wrapper {
		position: relative;
		margin: 0 auto;
		text-align: center;
		max-width: 54%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--color-light);

		.text-wrapper {
			margin-top: 3rem;
		}

		.btn-wrapper {
			position: absolute;
			bottom: -1.7rem;

			#button-fab {
				z-index: 3;
			}

			#vertical-line {
				margin: 0 auto;
				margin-bottom: 1rem;
			}
		}

		h6 {
			text-transform: uppercase;
			font-size: 1rem;
			font-weight: lighter;
			color: var(--color-secondary);
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 1.5s ${slideInUpAnimation};
			}
		}

		h2 {
			margin-top: 0.5rem;
			margin-bottom: 0.8rem;
			font-weight: normal;
			font-size: 4rem;
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 1.5s ${slideInDownAnimation};
			}
		}

		#button {
			margin-top: 2.75rem;
		}

		p {
			text-transform: uppercase;
		}
	}

	@media ${device.md} {
		.content-wrapper {
			max-width: 100%;

			#button {
				margin-top: 1rem;
			}

			.badges-wrapper {
				width: 18rem;
			}
		}
	}

	@media ${device.sm} {
		height: ${({ height }) => (height ? `calc(${height} - 16rem)` : '24rem')};
	}

	@media ${device.xs} {
		margin-top: 2.9rem;

		.content-wrapper {
			h2 {
				font-size: 2.5rem;
			}
		}
	}
`

const HeroComponent = ({ isHomePage, height, data, scrollRef }) => {
	const [ref, inView] = useInView(View)

	return (
		<Hero id='hero' height={height} ref={ref}>
			<div className='logo-text'>
				<img src={ImgLogoText} alt='website name text' />
			</div>
			<BackgroundImage
				image={getImage(data.heroBgImage?.localFile)}
				alt={data.heroBgImage?.altText}
				loading={isHomePage ? 'eager' : 'lazy'}
			/>
			<Container>
				<div className='content-wrapper'>
					<div className='text-wrapper'>
						{data.heroHeading && (
							<h2 className={animate(inView)}>{data.heroHeading}</h2>
						)}
						{data.heroSubheading && (
							<h6 className={`font-heading-sm ${animate(inView)}`}>
								{data.heroSubheading}
							</h6>
						)}
					</div>
					<div className='btn-wrapper'>
						<VerticalLine color='var(--color-dark-200)' />
						<ButtonFab scrollRef={scrollRef} />
					</div>
				</div>
			</Container>
		</Hero>
	)
}

export { HeroComponent as Hero }
