import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../globalStyles'
import { ImgArrow } from '../../images'

const Pagination = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.previous,
	.next {
		flex-shrink: 0;
		background-color: var(--color-transparent);
		border: none;
		cursor: pointer;
		padding: 0.25rem 0;

		img {
			width: 3rem;
		}
	}

	.next {
		margin-left: 0.5rem;
	}

	.previous {
		margin-right: 1.5rem;

		img {
			transform: rotate(180deg);
		}
	}

	.content-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;

		.page-collapse {
			color: var(--color-dark-200);
			margin-right: 1rem;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--color-transparent);
			color: var(--color-dark-200);
			width: 3rem;
			height: 3rem;
			border: 0.1rem solid var(--color-light-700);
			border-radius: 50%;
			padding: 1.25rem;
			cursor: pointer;
			box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
			transition: all 0.2s ease-in-out;
			font-weight: bolder;

			:hover,
			:focus {
				filter: brightness(90%);
			}

			&.active {
				background-color: var(--color-secondary);
				color: var(--color-light);
				border-color: var(--color-secondary);
			}

			margin-right: 1rem;
		}
	}

	@media ${device.xs} {
		.previous,
		.next {
			img {
				width: 2.5rem;
			}
		}

		.next {
			margin-left: 0.5rem;
		}

		.previous {
			margin-right: 1rem;
		}

		.content-wrapper {
			.page-collapse {
				margin-right: 0.5rem;
			}

			button {
				margin-right: 0.5rem;
			}

			.first,
			.last {
				display: none;
			}
		}
	}
`

const PaginationComponent = ({
	currentPage,
	totalData,
	perPageData,
	pageChange,
}) => {
	const data = Array(totalData).fill('')
	const pageSize = perPageData

	const [pageNumber, setPageNumber] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const pages = Math.ceil(data.length / pageSize)
		setTotalPages(pages)
		return () => {
			setTotalPages(1)
		}
	}, [data.length, pageSize])

	const handlePageChange = (page) => {
		setPageNumber(page)
		pageChange(page - 1)
	}

	return (
		<Pagination id='pagination'>
			<button
				type='button'
				className='previous'
				disabled={pageNumber === 1}
				onClick={() => handlePageChange(pageNumber - 1)}>
				<img src={ImgArrow} alt='arrow' />
			</button>
			{Array(totalPages)
				.fill('')
				.map((_, i) => (
					<div key={i} className='content-wrapper'>
						{/* First Buttons */}
						{pageNumber >= 4 && i === 0 && totalPages > 5 && (
							<button
								type='button'
								className={`start first ${currentPage === i + 1 && 'active'}`}
								onClick={() => handlePageChange(i + 1)}
								onKeyPress={() => handlePageChange(i + 1)}>
								<span>{i + 1}</span>
							</button>
						)}
						{pageNumber < 4 && i < 4 && totalPages > 5 && (
							<button
								type='button'
								className={`start ${currentPage === i + 1 && 'active'}`}
								onClick={() => handlePageChange(i + 1)}
								onKeyPress={() => handlePageChange(i + 1)}>
								<span>{i + 1}</span>
							</button>
						)}

						{/* Ellipses */}
						{i === 0 && pageNumber > 3 && totalPages > 5 && (
							<div className='page-collapse'>....</div>
						)}

						{/* Middle Buttons */}
						{pageNumber >= 4 &&
							pageNumber < totalPages - 2 &&
							i >= 2 &&
							i > pageNumber - 3 &&
							i < pageNumber + 1 &&
							i < totalPages - 1 &&
							totalPages > 5 && (
								<button
									type='button'
									className={`middle ${currentPage === i + 1 && 'active'}`}
									onClick={() => handlePageChange(i + 1)}
									onKeyPress={() => handlePageChange(i + 1)}>
									<span>{i + 1}</span>
								</button>
							)}

						{/* Middle Buttons When Few */}
						{totalPages <= 5 && (
							<button
								type='button'
								className={`middle ${currentPage === i + 1 && 'active'}`}
								onClick={() => handlePageChange(i + 1)}
								onKeyPress={() => handlePageChange(i + 1)}>
								<span>{i + 1}</span>
							</button>
						)}

						{/* Ellipses */}
						{i === totalPages - 1 &&
							pageNumber < totalPages - 2 &&
							totalPages > 5 && <div className='page-collapse'>....</div>}

						{/* Last Buttons */}
						{pageNumber >= totalPages - 2 &&
							i >= totalPages - 4 &&
							totalPages > 5 && (
								<button
									type='button'
									className={`end ${currentPage === i + 1 && 'active'}`}
									onClick={() => handlePageChange(i + 1)}
									onKeyPress={() => handlePageChange(i + 1)}>
									<span>{i + 1}</span>
								</button>
							)}
						{pageNumber < totalPages - 2 &&
							i === totalPages - 1 &&
							totalPages > 5 && (
								<button
									type='button'
									className={`end last ${currentPage === i + 1 && 'active'}`}
									onClick={() => handlePageChange(i + 1)}
									onKeyPress={() => handlePageChange(i + 1)}>
									<span>{i + 1}</span>
								</button>
							)}
					</div>
				))}
			<button
				type='button'
				className='next'
				disabled={pageNumber === totalPages}
				onClick={() => handlePageChange(pageNumber + 1)}>
				<img src={ImgArrow} alt='arrow' />
			</button>
		</Pagination>
	)
}

export { PaginationComponent as Pagination }
