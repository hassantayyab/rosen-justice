import React from 'react'
import '../../globalStyles'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	display: flex;
	flex-direction: column;
	min-height: 100vh;

  user-select, li {
    list-style: none;
  }

  li::before {
      content: "•";
      color: var(--color-secondary);
      font-size: 2rem;
      margin-right: 1rem;
      padding-top: 0.25rem;
  }

  /* Flexbox */
  .flex {
    display: flex;

    &.jc-sb {
      justify-content: space-between;
    }
    
    &.jc-c {
      justify-content: center;
    }
    
    &.ai-c {
      align-items: center;
    }
  }

  /* Margins */
  .ml-auto {
    margin-left: auto;
  }

  /* Fonts */
  .f-g-italic {
    font-family: 'Graphik Italic', serif;
    font-style: italic;
  }

  .f-dm-italic {
    font-family: 'DM Serif Display Italic';
    font-style: italic;
  }

  .f-g-normal {
    font-family: 'Graphik', serif;
    font-style: normal;
  }

  .f-dm-normal {
    font-family: 'DM Serif Display' !important;
    font-style: normal;
  }
  
  .font-heading-sm {
    font-family: 'Graphik', serif !important;
    font-style: normal;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bolder;
  }
`

const LayoutComponent = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			{children}
		</>
	)
}

export { LayoutComponent as Layout }
