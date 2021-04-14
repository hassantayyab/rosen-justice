import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	max-width: 80rem;
	padding: 0 1.5rem;
	margin: 0 auto;
	width: 100%;
	height: 100%;
`

const ContainerComponent = ({ children }) => {
	return <Container id='container'>{children}</Container>
}

export { ContainerComponent as Container }
