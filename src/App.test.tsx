import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders zdarova pacany', () => {
  render(<App />)
  const linkElement = screen.getByText(/zdarova pacany/i)
  expect(linkElement).toBeInTheDocument()
})
