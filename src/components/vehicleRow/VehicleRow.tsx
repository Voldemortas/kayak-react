import styles from './VehicleRow.module.css'
import { Vehicle } from 'commons'
import { Tabbable } from 'components'
import { CheckmarkIcon } from 'icons'

interface Props {
  vehicle: Vehicle
  toggle: () => void
}

const VehicleRow = (props: Props) => {
  const { vehicle, toggle } = props

  return (
    <Tabbable onClick={toggle}>
      <div className={styles.container}>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} tabIndex={-1} />
          <div className={styles.box} />
          {vehicle.isSelected && <CheckmarkIcon className={styles.checkmark} />}
        </div>
        <div>
          <img src={vehicle.img} alt="" className={styles.image} />
        </div>
        <div className={styles.name}>{vehicle.name}</div>
        <div className={styles.price} tabIndex={0}>
          ${vehicle.price}
        </div>
      </div>
    </Tabbable>
  )
}

export default VehicleRow
