import React from 'react'
import styled from 'styled-components'

const ButtonPlay = styled.button`
	text-align: center;
	background: var(--color-light);
	border: none;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	line-height: 0;

	p {
		color: var(--color-light);
		margin-top: 1rem;
		font-size: 1.25rem;
		text-decoration: underline;
	}
	.play-button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
		padding-left: 2px;
		span {
			border: 0;
			background: transparent;
			width: 0;
			border-color: transparent transparent transparent var(--color-secondary);
			border-style: solid;
			border-width: 0.3rem 0 0.3rem 0.5rem;
			transition: all 0.2s ease-in-out;
		}
	}
	:hover,
	:focus {
		.play-button {
			button {
				border-color: transparent transparent transparent var(--color-light);
			}
		}
	}
`

/* 
  size props can have following values:
  'small' and 'large'. Default value is 'large'.
*/

const ButtonPlayComponent = ({ size, showText }) => {
	return (
		<ButtonPlay id='button-play'>
			<div className={`play-button ${size === 'small' && 'sm'}`}>
				<span aria-label='play'></span>
			</div>
			{showText && <p>Click here to play</p>}
		</ButtonPlay>
	)
}

export { ButtonPlayComponent as ButtonPlay }
