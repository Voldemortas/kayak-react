import styles from './VehicleButton.module.css'
import { Vehicle } from 'commons'
import { Button } from 'components'

interface Props {
  vehicle: Vehicle
  toggle: () => void
}

const VehicleButton = (props: Props) => {
  const { vehicle, toggle } = props

  return (
    <Button onClick={toggle} selected={vehicle.isSelected}>
      <div data-tooltip={`$${vehicle.price}+`} className={styles.container}>
        <img src={vehicle.img} className={styles.image} alt="" />
        <div className={styles.title}>{vehicle.name}</div>
      </div>
    </Button>
  )
}

export default VehicleButton
