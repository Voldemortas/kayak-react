import styles from './App.module.css'
import { Skeleton, Tabbable, VehicleButton, VehicleRow } from 'components'
import useApp from './useApp'

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
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <div>Car type</div>
          <Tabbable className={styles.reset} onClick={resetSelected}>
            Reset
          </Tabbable>
        </div>
        <div className={styles.container}>
          {vehicles!.map((vehicle, index) => (
            <VehicleButton
              vehicle={vehicle}
              toggle={() => toggleVehicle(index)}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
