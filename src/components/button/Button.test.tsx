import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import Button, { Props } from './Button'
import styles from './Button.module.css'
import mock from 'jest-mock-extended/lib/Mock'
import { act } from 'react-dom/test-utils'

describe('test Button', () => {
  describe('test styles', () => {
    it('should render button with basic container class by default', () => {
      const { content } = renderButton()

      expect(content).toHaveClass(styles.container)
      expect(content).not.toHaveClass(styles.selected)
    })

    it('should render with basic container and selected classes when selected=true', () => {
      const { content } = renderButton(mock<Props>({ selected: true }))

      expect(content).toHaveClass(styles.container)
      expect(content).toHaveClass(styles.selected)
    })
  })

  it('should render children', () => {
    const child = <b>child</b>
    const { container } = renderButton(mock<Props>(), child)

    expect(container.getByText('child')).toBeInTheDocument()
  })

  it('should call onClick callback on click event', () => {
    const onClick = jest.fn()
    const { button } = renderButton(mock<Props>({ onClick }))

    act(() => button.click())

    expect(onClick).toHaveBeenCalled()
  })

  function renderButton(
    props: Props = mock<Props>(),
    children: ReactNode = '',
  ) {
    const container = render(<Button {...props}>{children}</Button>)
    const button = container.getByRole('button')
    const content = button.children[0]

    return { container, button, content }
  }
})
jest.mock('components', () => ({
  Tabbable: (props: any) => (
    <button onClick={props.onClick} data-testid="Tabbable">
      {props.children}
    </button>
  ),
}))
