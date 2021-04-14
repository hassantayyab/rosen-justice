import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Chevron from './chevron'

const Accordion = styled.div`
	display: flex;
	flex-direction: column;

	.icon {
		margin-left: auto;
		transition: transform 0.3s ease;
	}

	.rotate {
		transform: rotate(90deg);
	}

	.toggle-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background-color: var(--color-secondary);
		color: var(--color-light);
		border-radius: 50%;
		font-weight: bold;
		font-size: 1.25rem;
		span {
			line-height: 1;
		}
	}
`

const AccordionComponent = (props) => {
	const [setActive, setActiveState] = useState('')
	const [setHeight, setHeightState] = useState('0px')
	const [setIcon, setIconState] = useState('+')
	const [setRotate, setRotateState] = useState('icon')

	const content = useRef(null)

	const toggleAccordion = () => {
		setActiveState(setActive === '' ? 'active' : '')
		setHeightState(
			setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
		)
		setIconState(setActive === 'active' ? '-' : '+')
		setRotateState(setActive === 'active' ? 'icon' : 'icon rotate')
	}

	useEffect(() => {
		if (props.isActive) {
			return toggleAccordion()
		}
		return () => {
			setRotateState('icon')
			setIconState('+')
			setHeightState('0px')
			setActiveState('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Accordion id='accordion'>
			<button className={`accordion ${setActive}`} onClick={toggleAccordion}>
				{props.children.slice(0, 1)}
				{props.activeType === 'single' ? (
					<div className='toggle-icon'>
						<span>{setIcon}</span>
					</div>
				) : (
					props.children.slice(1)[0] && (
						<Chevron
							className={`${setRotate}`}
							width={10}
							fill={props.iconColor}
						/>
					)
				)}
			</button>
			<div id='content' ref={content} style={{ maxHeight: `${setHeight}` }}>
				{props.children.slice(1)}
			</div>
		</Accordion>
	)
}

export { AccordionComponent as Accordion }
