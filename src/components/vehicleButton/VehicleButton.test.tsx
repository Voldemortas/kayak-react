import { act, render } from '@testing-library/react'
import { Vehicle } from 'commons'
import VehicleButton from './VehicleButton'
import styles from './VehicleButton.module.css'

const VEHICLE: Vehicle = {
  img: 'img',
  isSelected: true,
  price: 500,
  name: 'SUV',
}

describe('test VehicleButton', () => {
  describe('test button props rendering', () => {
    it('should pass toggle to onclick', () => {
      const toggle = jest.fn()

      const button = renderVehicleButton(toggle).getByTestId('Button')

      act(() => button.click())

      expect(toggle).toHaveBeenCalled()
    })

    it('should pass selected status to button', () => {
      const button = renderVehicleButton().getByTestId('Button')

      expect(button).toHaveAttribute('data-selected', 'true')
    })
  })

  describe('test components inside Button', () => {
    it('should render img and name', () => {
      const button = renderVehicleButton()

      expect(button.getByTestId('Button').childNodes[0]).toBeInTheDocument()
      expect(button.getByText(VEHICLE.name)).toBeInTheDocument()
      expect(
        button.getByTestId('Button').getElementsByTagName('img')[0],
      ).toHaveAttribute('src', VEHICLE.img)
    })

    it('should render container with price tooltip and appropriate class', () => {
      const container =
        renderVehicleButton().getByTestId('Button').childNodes[0]

      expect(container).toHaveAttribute('data-tooltip', `$${VEHICLE.price}+`)
      expect(container).toHaveClass(styles.container)
    })
  })
})

function renderVehicleButton(toggle: () => void = () => {}) {
  return render(<VehicleButton vehicle={VEHICLE} toggle={toggle} />)
}

jest.mock('components', () => ({
  Button: (props: any) => (
    <button
      onClick={props.onClick}
      data-selected={props.selected}
      data-testid="Button"
    >
      {props.children}
    </button>
  ),
}))
