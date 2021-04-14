import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
import { device } from '../../globalStyles'

const FormInput = styled.div`
	position: relative;

	label,
	input,
	textarea {
		display: block;
		width: 100%;
		text-align: left;
	}

	label,
	input::placeholder,
	textarea::placeholder {
		text-transform: uppercase;
		font-weight: bolder;
		font-size: 0.85rem;
		color: var(--color-light);
	}

	input,
	textarea {
		border: none;
		border-bottom: 1px solid var(--color-dark-200);
		background-color: var(--color-transparent);
		color: var(--color-light);
		padding: 0.5rem 0;
		transition: color 0.3s ease-in-out;

		:focus::placeholder {
			color: transparent;
		}
	}

	@media ${device.xs} {
		flex-basis: 100%;
		margin-bottom: 3rem;
	}
`

export const FormInputComponent = ({
	name,
	type = 'text',
	className,
	label = name,
	...rest
}) => (
	<FormInput className={className}>
		{/* <label htmlFor={name} id={`${name}-label`}>
			{label}
		</label> */}
		<Field
			type={type}
			name={name}
			placeholder={label}
			aria-labelledby={`${name}-label`}
			{...rest}
		/>
		<div className='error'>
			<ErrorMessage name={name} />
		</div>
	</FormInput>
)

export { FormInputComponent as FormInput }
