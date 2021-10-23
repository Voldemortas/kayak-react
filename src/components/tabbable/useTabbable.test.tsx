import { fireEvent, render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { mock } from 'jest-mock-extended'
import useTabbable from './useTabbable'

describe('test useTabbable', () => {
  let element: HTMLElement
  let onClick: jest.SpyInstance

  describe('test mount and unmount', () => {
    beforeEach(() => {
      element = mock<HTMLElement>()
    })

    it('should add event listener to element on mount', () => {
      renderUseTabbable(element)

      expect(element.addEventListener).toHaveBeenCalled()
    })

    it('should remove event listener to element on unmount', () => {
      renderUseTabbable(element).unmount()

      expect(element.removeEventListener).toHaveBeenCalled()
    })
  })

  describe('test keyboard keyups', () => {
    beforeEach(() => {
      element = render(<div data-testid="element" />).getByTestId('element')
      onClick = jest.spyOn(element, 'click')

      renderUseTabbable(element)
    })

    it('should call element onclick callback on enter key', () => {
      fireEvent.keyUp(element, {
        code: 'Enter',
      })

      expect(onClick).toHaveBeenCalled()
    })

    it('should call element onclick callback on space key', () => {
      fireEvent.keyUp(element, {
        code: 'Space',
      })

      expect(onClick).toHaveBeenCalled()
    })
  })

  function renderUseTabbable(element: HTMLElement) {
    return renderHook(() => useTabbable({ current: element }))
  }
})
