import { render } from '@testing-library/react'
import MultipleSelectButton from './MultipleSelectButton'
import * as useMultipleSelectButton from './useMultipleSelectButton'
import styles from './MultipleSelectButton.module.css'

type TestType = {
  name: string
  isSelected: boolean
}

describe('test MultipleSelectButton', () => {
  const resetHandler = jest.fn()
  describe('test button when selected items count is 0', () => {
    const items = [
      { name: 'name', isSelected: false },
      { name: 'title', isSelected: false },
    ]

    it('should render unselected button without children and call setOpen on click', () => {
      const { setOpen } = spyHook(false)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'false',
      )
      expect(container.getByTestId('ArrowIcon')).not.toHaveClass(
        styles.rotated180,
      )
      expect(container.queryByTestId('children')).not.toBeInTheDocument()
      expect(setOpen).toHaveBeenCalled()
    })

    it('should render selected button with children and call setClosed on click', () => {
      const { setClosed } = spyHook(true)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'true',
      )
      expect(container.getByTestId('ArrowIcon')).toHaveClass(styles.rotated180)
      expect(container.getByTestId('children')).toBeInTheDocument()
      expect(setClosed).toHaveBeenCalled()
    })
  })

  describe('test button when selected items count is 1', () => {
    const items = [
      { name: 'name', isSelected: true },
      { name: 'title', isSelected: false },
    ]

    it('should render selected button without children and call setOpen on click', () => {
      const { setOpen } = spyHook(false)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'true',
      )
      expect(container.queryByTestId('children')).not.toBeInTheDocument()
      expect(container.getByTestId('XmarkIcon')).toBeInTheDocument()
      expect(setOpen).toHaveBeenCalled()
      expect(container.getByText('name')).toBeInTheDocument()
    })

    it('should render selected button with children and call setClosed on click', () => {
      const { setClosed } = spyHook(true)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'true',
      )
      expect(container.getByTestId('children')).toBeInTheDocument()
      expect(container.getByTestId('XmarkIcon')).toBeInTheDocument()
      expect(setClosed).toHaveBeenCalled()
      expect(container.getByText('name')).toBeInTheDocument()
    })
  })

  describe('test button when selected items count is 2', () => {
    const items = [
      { name: 'name', isSelected: true },
      { name: 'title', isSelected: true },
    ]

    it('should render selected button without children and call setOpen on click', () => {
      const { setOpen } = spyHook(false)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'true',
      )
      expect(container.queryByTestId('children')).not.toBeInTheDocument()
      expect(container.getByTestId('XmarkIcon')).toBeInTheDocument()
      expect(setOpen).toHaveBeenCalled()
      expect(container.getByText('2 selected')).toBeInTheDocument()
    })

    it('should render selected button with children and call setClosed on click', () => {
      const { setClosed } = spyHook(true)
      const container = renderMultiple(items)

      container.getByTestId('Button').click()

      expect(container.getByTestId('Button')).toHaveAttribute(
        'data-selected',
        'true',
      )
      expect(container.getByTestId('children')).toBeInTheDocument()
      expect(container.getByTestId('XmarkIcon')).toBeInTheDocument()
      expect(setClosed).toHaveBeenCalled()
      expect(container.getByText('2 selected')).toBeInTheDocument()
    })
  })

  function renderMultiple(items: TestType[]) {
    return render(
      <MultipleSelectButton<TestType>
        items={items}
        getDetails={(item) => item.name}
        resetHandler={resetHandler}
        isItemSelected={(item) => item.isSelected}
      >
        <div data-testid="children" />
      </MultipleSelectButton>,
    )
  }

  function spyHook(isOpen: boolean) {
    const setOpen = jest.fn()
    const setClosed = jest.fn()

    jest.spyOn(useMultipleSelectButton, 'default').mockReturnValue({
      isOpen,
      setOpen,
      setClosed,
    })

    return { setOpen, setClosed }
  }
})

jest.mock('icons', () => ({
  ArrowIcon: (props: any) => (
    <div data-testid="ArrowIcon" className={props.className} />
  ),
  XmarkIcon: () => <div data-testid="XmarkIcon" />,
}))

jest.mock('components', () => ({
  Tabbable: (props: any) => (
    <span data-testid="Tabbable" onClick={props.onClick}>
      {props.children}
    </span>
  ),
  Button: (props: any) => (
    <button
      data-testid="Button"
      onClick={props.onClick}
      data-selected={props.selected}
    >
      {props.children}
    </button>
  ),
}))
