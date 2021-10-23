import {
  renderHook,
  act,
  Renderer,
  RenderHookResult,
} from '@testing-library/react-hooks'
import { RestVehicle, Vehicle } from 'commons'
import mock from 'jest-mock-extended/lib/Mock'
import useApp, { HookResponse } from './useApp'

const VEHICLES = [mock<RestVehicle>(), mock<RestVehicle>(), mock<RestVehicle>()]

describe('test useTemplate', () => {
  let hook: RenderHookResult<unknown, HookResponse, Renderer<unknown>>

  beforeEach(async () => {
    mockFetch()

    await act(async () => {
      hook = getHook()
    })
  })

  it('should retrieve data from rest with default unselected values', () => {
    expect(hook.result.current.vehicles).toHaveLength(3)
    expect(
      hook.result.current.vehicles!.filter((vehicle) => !vehicle.isSelected),
    ).toHaveLength(3)
  })

  it('should toggle the first vehicle', () => {
    toggleVehicleAndAssert(0)
  })

  it('should toggle the middle vehicle', () => {
    toggleVehicleAndAssert(1)
  })

  it('should toggle the last vehicle', () => {
    toggleVehicleAndAssert(2)
  })

  it('should resetAll selected to false', () => {
    let preResetVehicles: Vehicle[] = []

    act(() => {
      hook.result.current.toggleVehicle(0)
    })
    act(() => {
      hook.result.current.toggleVehicle(1)
    })
    act(() => {
      hook.result.current.toggleVehicle(2)
    })
    preResetVehicles = [...hook.result.current.vehicles!]

    act(() => {
      hook.result.current.resetSelected()
    })

    const vehicles = hook.result.current.vehicles!

    expect(
      preResetVehicles.filter((vehicle) => vehicle.isSelected),
    ).toHaveLength(3)
    expect(vehicles.filter((vehicle) => !vehicle.isSelected)).toHaveLength(3)
  })

  function toggleVehicleAndAssert(index: number) {
    act(() => hook.result.current.toggleVehicle(index))

    const vehicles = hook.result.current.vehicles!

    expect(vehicles[index].isSelected).toBeTruthy()
    expect(vehicles.filter((vehicle) => !vehicle.isSelected)).toHaveLength(2)
  }
})

function getHook() {
  return renderHook(() => useApp())
}

function mockFetch() {
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(VEHICLES),
    } as unknown as Promise<Response>),
  )

  jest.spyOn(global, 'fetch').mockImplementation(fetchMock)
}
