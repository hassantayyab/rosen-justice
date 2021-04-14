import React from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'

const Button = styled.button`
	font-family: 'Poppins', sans-serif;
	padding: 0.75rem 2.5rem;
	text-transform: uppercase;
	font-size: 0.9rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	letter-spacing: 1px;
	transition: all 0.2s ease-in-out;

	background-color: ${({ bgColor }) =>
		bgColor ? bgColor : 'var(--color-primary)'};

	border: ${({ borderColor }) =>
		`1px solid ${borderColor ? borderColor : 'var(--color-secondary)'}`};

	border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};

	color: ${({ color }) => (color ? color : 'var(--color-light)')};

	font-weight: ${({ fontWeight }) =>
		fontWeight ? fontWeight : 'var(--fw-normal)'};

	:hover,
	:focus {
		filter: brightness(90%);
	}

	:disabled {
		opacity: 0.5;
	}

	@media ${device.xs} {
		padding: 0.75rem 1.5rem;
	}
`

const ButtonComponent = ({
	children,
	href,
	target,
	color,
	bgColor,
	fontWeight,
	borderColor,
	borderRadius,
	onClick,
	disabled = false,
}) => {
	return (
		<Button
			id='button'
			as={href ? 'a' : 'button'}
			href={href}
			target={target}
			color={color}
			bgColor={bgColor}
			fontWeight={fontWeight}
			borderColor={borderColor}
			borderRadius={borderRadius}
			disabled={disabled}
			onClick={onClick}>
			{children}
		</Button>
	)
}

export { ButtonComponent as Button }
