import { fireEvent, render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { mock } from 'jest-mock-extended'
import useButton from './useButton'

describe('test useButton', () => {
  let element: HTMLElement
  let onClick: jest.SpyInstance

  describe('test mount and unmount', () => {
    beforeEach(() => {
      element = mock<HTMLElement>()
    })

    it('should add event listener to element on mount', () => {
      renderUseButton(element)

      expect(element.addEventListener).toHaveBeenCalled()
    })

    it('should remove event listener to element on unmount', () => {
      renderUseButton(element).unmount()

      expect(element.removeEventListener).toHaveBeenCalled()
    })
  })

  describe('test keyboard keyups', () => {
    beforeEach(() => {
      element = render(<div data-testid="element" />).getByTestId('element')
      onClick = jest.spyOn(element, 'click')

      renderUseButton(element)
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

  function renderUseButton(element: HTMLElement) {
    return renderHook(() => useButton({ current: element }))
  }
})
