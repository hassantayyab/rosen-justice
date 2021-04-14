import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { ImgBackArrow } from '../../images'
import { Button } from './button'

const ButtonBack = styled.div`
	> #button {
		display: flex;
		align-items: center;
		padding-left: 2rem;
		padding-right: 2rem;

		.arrow {
			width: 2.5rem;
			margin-right: 1.25rem;

			img {
				vertical-align: middle;
			}
		}

		font-weight: bolder;
		font-size: 0.8rem;
	}
`

const ButtonBackComponent = ({ children, link }) => {
	return (
		<ButtonBack
			id='button-back'
			role='button'
			tabIndex='0'
			onClick={() => navigate(link)}
			onKeyPress={() => navigate(link)}>
			<Button
				borderColor='var(--color-light)'
				bgColor='var(--color-light)'
				color='var(--color-primary)'>
				<div className='arrow'>
					<img src={ImgBackArrow} alt='arrow' />
				</div>
				<div>{children}</div>
			</Button>
		</ButtonBack>
	)
}

export { ButtonBackComponent as ButtonBack }
