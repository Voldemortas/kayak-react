import styles from './Tabbable.module.css'
import { ReactNode, useRef } from 'react'
import useButton from './useTabbable'

export interface Props {
  onClick: () => void
  children: ReactNode
}

const VehicleButton = (props: Props) => {
  const { onClick, children } = props
  const containerRef = useRef<HTMLDivElement>(null)
  useButton(containerRef)

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      ref={containerRef}
      className={styles.container}
    >
      {children}
    </div>
  )
}

export default VehicleButton
