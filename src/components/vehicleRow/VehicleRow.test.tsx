import { render } from '@testing-library/react'
import { Vehicle } from 'commons'
import VehicleRow from './VehicleRow'

const NAME = 'name'
const PRICE = 562
const IMG = 'url'

describe('test VehicleRow', () => {
  const toggle = jest.fn()

  it('should call toggle callback on click', () => {
    renderVehicleRow(makeVehicle(true)).getByTestId('Tabbable').click()

    expect(toggle).toHaveBeenCalled()
  })

  it('should render name, price and image without checkmark when vehicle is not selected', () => {
    const container = renderVehicleRow(makeVehicle(false))

    expect(container.getByRole('img')).toHaveAttribute('src', IMG)
    expect(container.getByText(NAME)).toBeInTheDocument()
    expect(container.getByText(`$${PRICE}`)).toBeInTheDocument()
    expect(container.queryByTestId('CheckmarkIcon')).not.toBeInTheDocument()
  })

  it('should render name, price, image and checkmark when vehicle is selected', () => {
    const container = renderVehicleRow(makeVehicle(true))

    expect(container.getByRole('img')).toHaveAttribute('src', IMG)
    expect(container.getByText(NAME)).toBeInTheDocument()
    expect(container.getByText(`$${PRICE}`)).toBeInTheDocument()
    expect(container.getByTestId('CheckmarkIcon')).toBeInTheDocument()
  })

  function renderVehicleRow(vehicle: Vehicle) {
    return render(<VehicleRow vehicle={vehicle} toggle={toggle} />)
  }

  function makeVehicle(isSelected: boolean): Vehicle {
    return { name: NAME, price: PRICE, img: IMG, isSelected }
  }
})

jest.mock('icons', () => ({
  CheckmarkIcon: () => <div data-testid="CheckmarkIcon" />,
}))

jest.mock('components', () => ({
  Tabbable: (props: any) => (
    <button data-testid="Tabbable" onClick={props.onClick}>
      {props.children}
    </button>
  ),
}))
