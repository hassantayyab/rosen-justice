import { Link } from 'gatsby'
import React from 'react'
import { fadeIn } from 'react-animations'
import { useInView } from 'react-intersection-observer'
import styled, { keyframes } from 'styled-components'
import { animate, View } from '../../animations'
import { useHeaderMenuQuery } from '../../hooks'

const fadeInAnimation = keyframes`${fadeIn}`

const PracticeAreaCard = styled.div`
	background-color: var(--color-light-200);
	color: var(--color-primary);
	border: 1px solid var(--color-light);

	.title {
		padding: 2rem 2rem 1.5rem 2rem;

		h4 {
			opacity: 0;
			&.animate {
				opacity: 1;
				animation: 1.5s ${fadeInAnimation};
			}
		}
	}

	.menus {
		padding: 0 2rem 2rem 2rem;

		ul {
			li {
				a {
					color: var(--color-primary);
					will-change: color;
					transition: color 0.2s ease-in-out;

					:hover,
					:focus {
						color: var(--color-secondary);
					}

					&.active {
						color: var(--color-secondary);
					}
				}
			}
		}
	}
`

const PracticeAreaCardComponent = () => {
	const [ref, inView] = useInView(View)

	const allMenus = useHeaderMenuQuery().find(
		(m) => m.label === 'Practice Areas'
	)

	return (
		<PracticeAreaCard id='practice-area-card' ref={ref}>
			<div className='title'>
				<h4 className={animate(inView)}>{allMenus && allMenus.label}</h4>
			</div>
			<div className='menus'>
				{allMenus &&
					allMenus.childItems.nodes.length > 0 &&
					allMenus.childItems.nodes.map((menu) => (
						<ul key={menu.id}>
							<li>
								<Link to={menu.path} activeClassName='active'>
									{menu.label}
								</Link>
							</li>
							{menu.childItems.nodes.map((m) => (
								<li key={m.id}>
									<Link to={m.path} activeClassName='active'>
										{m.label}
									</Link>
								</li>
							))}
						</ul>
					))}
			</div>
		</PracticeAreaCard>
	)
}

export { PracticeAreaCardComponent as PracticeAreaCard }
