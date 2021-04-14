import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Contact } from '../contact'
import { device } from '../../globalStyles'
import { View } from '../../animations'
import { useInView } from 'react-intersection-observer'
import { fadeIn } from 'react-animations'

const fadeInAnimation = keyframes`${fadeIn}`

const FormModal = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 98;
	animation: 0.3s ${fadeInAnimation};

	.modal-wrapper {
		margin: auto;
		width: 100%;

		#contact {
			padding-bottom: 0;
			height: 100vh;
		}
	}

	@media ${device.xs} {
		.modal-wrapper {
			#contact {
				#vertical-line {
					display: none;
				}

				form {
					.textarea {
						margin-bottom: 0;
					}
				}
				padding-bottom: 4rem;
				height: unset;
			}
		}
	}
`

const CloseButton = styled.button`
	position: absolute;
	top: 0;
	right: 3rem;
	font-size: 4rem;
	color: var(--color-light);
	background: transparent;
	border: none;
	cursor: pointer;
	z-index: 99;

	@media ${device.xs} {
		top: 0;
		right: 1.75rem;
		font-size: 3.5rem;
	}
`

const FormModalComponent = ({ isOpen, togglePlayer }) => {
	const [ref] = useInView(View)

	if (!isOpen) {
		return null
	}

	return (
		<FormModal id='form-modal' ref={ref}>
			<CloseButton onClick={togglePlayer}>&times;</CloseButton>
			<div className='modal-wrapper'>
				<Contact />
			</div>
		</FormModal>
	)
}

export { FormModalComponent as FormModal }
