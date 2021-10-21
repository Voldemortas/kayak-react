import { render } from '@testing-library/react'
import Template from './Template'

describe('test Template', () => {
  it('should render its text', () => {
    const component = renderTemplate()

    expect(component.getByText(/template/)).toBeInTheDocument()
  })
})

function renderTemplate() {
  return render(<Template />)
}
