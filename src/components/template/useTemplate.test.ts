import { renderHook, act } from '@testing-library/react-hooks'
import useTemplate from './useTemplate'

describe('test useTemplate', () => {
  it('should return falsyState by default', () => {
    const hook = getHook()

    expect(hook.current.state).toBeFalsy()
  })

  it('should toggle state', () => {
    const hook = getHook()

    act(() => hook.current.toggle())

    expect(hook.current.state).toBeTruthy()
  })
})

function getHook() {
  return renderHook(() => useTemplate()).result
}
