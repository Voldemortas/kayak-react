import { render } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import { Vehicle } from 'commons'
import App from './App'

import * as useApp from './useApp'

describe('App', () => {
  const toggleVehicle = jest.fn()

  test('useApp returns undefined vehicles', () => {
    spypHook(undefined)

    const container = render(<App />)

    expect(container.queryAllByTestId('Skeleton')).toHaveLength(5)
  })

  test('useApp returns defined vehicles', () => {
    const vehicle = mock<Vehicle>({ name: 'adzin' })
    spypHook([vehicle])

    const container = render(<App />)

    expect(container.queryAllByTestId('Skeleton')).toHaveLength(0)
    expect(container.getByText('adzin')).toBeInTheDocument()
  })

  function spypHook(vehicles: Vehicle[] | undefined) {
    jest.spyOn(useApp, 'default').mockReturnValue({ vehicles, toggleVehicle })
  }
})

jest.mock('components', () => ({
  Skeleton: () => <span data-testid="Skeleton" />,
}))
