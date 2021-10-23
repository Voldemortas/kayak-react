import { render } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import { Vehicle } from 'commons'
import App from './App'

import * as useApp from './useApp'
import { act } from 'react-dom/test-utils'
import { Children } from 'react'

describe('App', () => {
  const toggleVehicle = jest.fn()
  const resetSelected = jest.fn()

  describe('useApp returns undefined vehicles', () => {
    beforeEach(() => {
      spyHook(undefined)
    })

    test('renders 5 skeletons', () => {
      const container = render(<App />)

      expect(container.queryAllByTestId('Skeleton')).toHaveLength(5)
    })
  })

  describe('useApp returns two defined vehicles', () => {
    beforeEach(() => {
      const vehicle = mock<Vehicle>({ name: 'adzin' })
      const vehicle2 = mock<Vehicle>({ name: 'dva' })
      spyHook([vehicle, vehicle2])
    })

    test('renders two VehicleButtons', () => {
      const container = render(<App />)

      expect(container.queryAllByTestId('Skeleton')).toHaveLength(0)
      expect(container.queryAllByTestId('VehicleButton')).toHaveLength(2)
    })

    test('VehicleButton calls toggleVehicle callback from hook', () => {
      const container = render(<App />)

      act(() => {
        container.getAllByTestId('VehicleButton')[1].click()
      })

      expect(toggleVehicle).toHaveBeenCalledWith(1)
    })

    test('Reset calls resetSelected hook callback', () => {
      const container = render(<App />)

      act(() => {
        container.getByText('Reset').click()
      })

      expect(resetSelected).toHaveBeenCalled()
    })
  })

  function spyHook(vehicles: Vehicle[] | undefined) {
    jest
      .spyOn(useApp, 'default')
      .mockReturnValue({ vehicles, toggleVehicle, resetSelected })
  }
})

jest.mock('components', () => ({
  Skeleton: () => <span data-testid="Skeleton" />,
  VehicleButton: (props: any) => (
    <button data-testid="VehicleButton" onClick={props.toggle} />
  ),
  Tabbable: (props: any) => (
    <button onClick={props.onClick}>{props.children}</button>
  ),
}))
