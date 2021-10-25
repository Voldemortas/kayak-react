import styles from './App.module.css'
import {
  MultipleSelectButton,
  Skeleton,
  Tabbable,
  VehicleButton,
  VehicleRow,
} from 'components'
import useApp from './useApp'
import { Vehicle } from 'commons'

function App() {
  const { vehicles, toggleVehicle, resetSelected } = useApp()

  return (
    <>
      <div className={styles.emptySpace}></div>
      {!!vehicles ? renderButtons() : renderSkeleton()}
    </>
  )

  function renderSkeleton() {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton width={75} height={60} key={index} />
        ))}
      </>
    )
  }

  function renderButtons() {
    const firstVehicles = vehicles!.slice(0, 4)
    const secondVehicles = vehicles!.slice(4)

    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <div>Car type</div>
          {vehicles!.some((vehicle) => vehicle.isSelected) && (
            <Tabbable className={styles.reset} onClick={resetSelected}>
              Reset
            </Tabbable>
          )}
        </div>
        <div className={styles.container}>
          {firstVehicles.map((vehicle, index) => (
            <VehicleButton
              vehicle={vehicle}
              toggle={() => toggleVehicle(index)}
              key={index}
            />
          ))}
          <MultipleSelectButton<Vehicle>
            getDetails={(item) => item.name}
            resetHandler={resetSelected}
            items={secondVehicles}
            isItemSelected={(item) => item.isSelected}
          >
            <>
              {secondVehicles.map((vehicle, index) => (
                <VehicleRow
                  key={vehicle.name}
                  toggle={() => toggleVehicle(index + 4)}
                  vehicle={vehicle}
                />
              ))}
            </>
          </MultipleSelectButton>
        </div>
      </div>
    )
  }
}

export default App
