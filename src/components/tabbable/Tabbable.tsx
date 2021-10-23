import styles from './Tabbable.module.css'
import { ReactNode, useRef } from 'react'
import useButton from './useTabbable'

export interface Props {
  onClick?: () => void
  className?: string
  children: ReactNode
}

const VehicleButton = (props: Props) => {
  const { onClick, children, className } = props
  const containerRef = useRef<HTMLDivElement>(null)
  useButton(containerRef)

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      ref={containerRef}
      className={[styles.tabbable, className ?? ''].join(' ')}
    >
      {children}
    </div>
  )
}

export default VehicleButton
