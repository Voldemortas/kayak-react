import { render, screen } from '@testing-library/react'
import App from './App'

test('renders zdarova pacany', () => {
  render(<App />)
  const linkElement = screen.getByText(/green/i)
  expect(linkElement).toBeInTheDocument()
  expect(screen.getByTestId('Template')).toBeInTheDocument()
  expect(screen.queryByText('template')).not.toBeInTheDocument()
})

jest.mock('components', () => ({
  Template: () => <span data-testid="Template" />,
}))
