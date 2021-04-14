import { Link } from 'gatsby'
import React from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { device } from '../../globalStyles'
import { useGeneralDataQuery } from '../../hooks'
import { ImgCall, ImgLogo, ImgMenu } from '../../images'
import { Container } from '../layouts'
import { Menu } from '../menu'
import { Button } from './button'
import { tada } from 'react-animations'
import { useEffect } from 'react'
import { FormModal } from './form-modal'

const tadaAnimation = keyframes`${tada}`

const NavBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 1.25rem 0;
	z-index: 4;
	background-color: ${({ scroll }) =>
		scroll ? 'rgb(20, 23, 40, 0.98)' : 'var(--color-transparent)'};
	color: var(--color-light);

	transition: background-color 0.3s ease-in-out;

	img {
		width: 14rem;
		vertical-align: middle;
	}

	@media ${device.xs} {
		margin-top: 2.97rem;

		img {
			width: 12rem;
		}
	}
`

const InnerWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	P {
		text-transform: uppercase;
	}

	#button {
		img {
			width: 1.75rem;
			margin-right: 0.75rem;
			animation: 1.5s ${tadaAnimation} 3;
		}
	}

	#button:last-child {
		padding: 0.75rem 1.5rem;
	}

	a#button {
		margin-left: auto;
		font-size: 1.25rem;
	}

	@media ${device.md} {
		> p {
			font-size: 0.75rem;
		}
	}

	@media ${device.sm} {
		justify-content: center;

		#button:last-child {
			display: none;
		}

		#button:first-child {
			margin-right: 0;
			padding: 0.5rem;
			padding-right: 0;

			img {
				width: 2rem;
			}
			span {
				display: none;
			}
		}
	}

	@media ${device.xs} {
		justify-content: space-between;

		a {
			order: 2;
		}

		div.flex {
			margin-left: 0;
			order: 3;
		}
	}
`

const MenuToggler = styled.button`
	border: none;
	background: none;
	margin-left: 2rem;
	cursor: pointer;

	img {
		width: 2rem;
	}

	@media ${device.xs} {
		order: 1;
		margin-left: 0;

		img {
			transform: rotate(180deg);
		}
	}
`

const TopBar = styled.div`
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
	width: 100%;

	#button {
		width: 100%;
	}

	@media ${device.xs} {
		display: block;
	}
`

const isBrowser = typeof window !== 'undefined'

const NavBarComponent = () => {
	const { contactNumber } = useGeneralDataQuery()

	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState(false)

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const openModal = () => setModalIsOpen(true)
	const closeModal = () => setModalIsOpen(false)

	useEffect(() => {
		if (isBrowser) {
			document.addEventListener('scroll', () => {
				window.scrollY > 20 ? setScroll(true) : setScroll(false)
			})
		}
		return () => {
			setScroll(false)
			setOpen(false)
			setModalIsOpen(false)
		}
	}, [])

	return (
		<>
			<NavBar id='navbar' scroll={scroll}>
				<TopBar type='button' className='top-bar'>
					<Button
						bgColor='var(--color-secondary)'
						color='var(--color-light)'
						onClick={openModal}
						onKeyDown={openModal}>
						100% free consultation
					</Button>
				</TopBar>
				<Menu isOpen={open} openChange={() => setOpen(false)} />
				<Container>
					<InnerWrapper>
						<Link to='/'>
							<img src={ImgLogo} alt='website logo' />
						</Link>
						<div className='flex jc-sb ai-c ml-auto'>
							<Button
								borderColor='var(--color-transparent)'
								bgColor='var(--color-transparent)'
								href={`tel:${contactNumber}`}>
								<img src={ImgCall} alt='call us' />
								<span>{contactNumber}</span>
							</Button>
							<Button
								bgColor='var(--color-transparent)'
								onClick={openModal}
								onKeyDown={openModal}>
								100% free consultation
							</Button>
						</div>
						<MenuToggler onClick={() => setOpen(!open)}>
							<img src={ImgMenu} alt='menu opener' />
						</MenuToggler>
					</InnerWrapper>
				</Container>
			</NavBar>

			<FormModal isOpen={modalIsOpen} togglePlayer={closeModal} />
		</>
	)
}

export { NavBarComponent as NavBar }
