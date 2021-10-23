import styles from './App.module.css'
import { Skeleton, VehicleButton } from 'components'
import useApp from './useApp'

function App() {
  const { vehicles, toggleVehicle } = useApp()

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
      <>
        <div className={styles.container}>
          {vehicles!.map((vehicle, index) => (
            <VehicleButton
              vehicle={vehicle}
              toggle={() => toggleVehicle(index)}
              key={index}
            />
          ))}
        </div>
      </>
    )
  }
}

export default App
