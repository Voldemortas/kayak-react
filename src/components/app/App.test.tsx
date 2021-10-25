import { render } from '@testing-library/react'
import { mock } from 'jest-mock-extended'
import { Vehicle } from 'commons'
import App from './App'
import * as useApp from './useApp'
import { act } from 'react-dom/test-utils'

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

  it('should not render resetButton when no vehicles are selected', () => {
    const vehicle = mock<Vehicle>({ isSelected: false })
    spyHook([vehicle])

    const container = render(<App />)

    expect(container.queryByText('Reset')).not.toBeInTheDocument()
  })

  describe('useApp returns 6 defined vehicles', () => {
    beforeEach(() => {
      const vehicle = mock<Vehicle>({ name: 'adzin' })
      const vehicle2 = mock<Vehicle>({ name: 'dwa' })
      const vehicle3 = mock<Vehicle>({ name: 'trīs' })
      const vehicle4 = mock<Vehicle>({ name: 'četri' })
      const vehicle5 = mock<Vehicle>({ name: 'pięc' })
      const vehicle6 = mock<Vehicle>({ name: 'sex' })
      spyHook([vehicle, vehicle2, vehicle3, vehicle4, vehicle5, vehicle6])
    })

    test('renders 4 VehicleButtons and 2 VehicleRow inside MultipleSelectButton', () => {
      const container = render(<App />)

      expect(container.queryAllByTestId('Skeleton')).toHaveLength(0)
      expect(container.queryAllByTestId('VehicleButton')).toHaveLength(4)
      expect(container.getByTestId('MultipleSelectButton')).toHaveAttribute(
        'data-items',
        'pięc,sex',
      )
      expect(container.queryAllByTestId('VehicleRow')).toHaveLength(2)
    })

    test('VehicleButton calls toggleVehicle callback from hook', () => {
      const container = render(<App />)

      act(() => {
        container.getAllByTestId('VehicleButton')[1].click()
        container.getAllByTestId('VehicleRow')[1].click()
      })

      expect(toggleVehicle).toHaveBeenCalledWith(1)
      expect(toggleVehicle).toHaveBeenCalledWith(5)
    })

    test('Reset calls resetSelected hook callback on Reset text', () => {
      const container = render(<App />)

      act(() => {
        container.getByText('Reset').click()
      })

      expect(resetSelected).toHaveBeenCalled()
    })

    test('Reset calls resetSelected hook callback on MultipleSelectButton reset', () => {
      const container = render(<App />)

      act(() => {
        container.getByTestId('MultipleSelectButton').click()
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
  VehicleRow: (props: any) => (
    <div onClick={props.toggle} data-testid="VehicleRow" />
  ),
  MultipleSelectButton: (props: any) => (
    <div
      onClick={props.resetHandler}
      data-items={props.items.map((item: { name: any }) => item.name)}
      data-testid="MultipleSelectButton"
    >
      {props.children}
    </div>
  ),
}))
