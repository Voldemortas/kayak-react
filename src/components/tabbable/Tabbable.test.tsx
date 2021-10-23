import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import Tabbable from './Tabbable'
import { Props } from './Tabbable'
import mock from 'jest-mock-extended/lib/Mock'
import { act } from 'react-dom/test-utils'

describe('test Tabbable', () => {
  const onClick = jest.fn()
  it('should render children', () => {
    const child = <b>child</b>
    const { container } = renderTabbable(child)

    expect(container.getByText('child')).toBeInTheDocument()
  })

  it('should call onClick callback on click event', () => {
    const { tabbable } = renderTabbable()

    act(() => tabbable.click())

    expect(onClick).toHaveBeenCalled()
  })

  function renderTabbable(children: ReactNode = '') {
    const container = render(<Tabbable onClick={onClick}>{children}</Tabbable>)
    const tabbable = container.getByRole('button')

    return { container, tabbable }
  }
})
