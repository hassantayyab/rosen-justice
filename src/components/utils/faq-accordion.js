import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'

const FaqAccordion = styled.div`
	display: flex;
	flex-direction: column;

	.toggle-icon {
		margin-left: auto;
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
		flex-shrink: 0;
		margin-left: 1rem;

		&.active {
			background-color: var(--color-light);
			color: var(--color-secondary);
			align-items: flex-start;
		}

		transition: all 0.3s ease-in-out;

		span {
			line-height: 1;
		}
	}

	> div {
		margin-bottom: 1rem;
	}

	h5.question {
		text-align: left;
		font-size: 1.25rem;
		display: flex;
		align-items: flex-start;

		span {
			color: var(--color-secondary);
			margin-right: 1rem;
			flex-shrink: 0;
		}
	}

	.answer {
		color: var(--color-light-700);
		background-color: #303249;
		padding: 0rem 5rem 2.5rem 4.8rem;
		text-align: left;

		p {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}
	}

	button.accordion {
		width: 100%;
		cursor: pointer;
		background-color: #303249;
		color: var(--color-light);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2.5rem;
		border: none;
		outline: none;
	}

	#content {
		margin-top: -1px;
		overflow: hidden;
		transition: max-height 0.5s ease-out;
	}

	@media ${device.xs} {
		button.accordion {
			padding: 1.25rem 1.5rem;
		}

		.answer {
			padding: 0rem 3rem 2rem 3.8rem;
		}
	}
`

const FaqAccordionComponent = ({ data, page = 0, pageSize = 0 }) => {
	const [active, setActive] = useState([])
	const [height, setHeight] = useState([])
	const [icon, setIcon] = useState([])
	const contentRefs = useRef([])

	const toggleAccordion = (i) => {
		setActive(
			active.map((el, idx) => {
				if (idx === i) {
					return el === 'active' ? '' : 'active'
				} else {
					return ''
				}
			})
		)

		setHeight(
			height.map((el, idx) =>
				idx === i
					? active[idx] === 'active'
						? '0px'
						: `${contentRefs.current[i].scrollHeight}px`
					: '0px'
			)
		)

		setIcon(
			icon.map((el, idx) =>
				idx === i ? (active[idx] === 'active' ? '+' : '_') : '+'
			)
		)
	}

	useEffect(() => {
		contentRefs.current = contentRefs.current.slice(0, data.length)
		setHeight(new Array(data.length).fill('0px'))
		setActive(new Array(data.length).fill(''))
		setIcon(new Array(data.length).fill('+'))
		return function cleanup() {}
	}, [data.length])

	return (
		<FaqAccordion id='faq-accordian'>
			{data.map((q, i) => (
				<div key={i}>
					<button
						className={`accordion ${active[i]}`}
						onClick={() => toggleAccordion(i)}>
						<h5 className='question'>
							<span>{page * pageSize + i + 1} .</span> <div>{q.question}</div>
						</h5>
						<div className={`toggle-icon ${active[i]}`}>
							<span>{icon[i]}</span>
						</div>
					</button>
					<div
						id='content'
						ref={(el) => (contentRefs.current[i] = el)}
						style={{ maxHeight: `${height[i]}` }}>
						<div className='answer'>
							<p>{q.answer}</p>
						</div>
					</div>
				</div>
			))}
		</FaqAccordion>
	)
}

export { FaqAccordionComponent as FaqAccordion }
