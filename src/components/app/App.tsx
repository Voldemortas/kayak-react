import styles from './App.module.css'
import { Skeleton } from 'components'
import useApp from './useApp'

function App() {
  const { vehicles } = useApp()

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
        <span className={styles.template}>
          {vehicles!.map((vehicle) => vehicle.name).join(', ')}
        </span>
      </>
    )
  }
}

export default App
