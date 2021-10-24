import styles from './Tabbable.module.css'
import { ReactNode, useRef, MouseEvent } from 'react'
import useTabbable from './useTabbable'

export interface Props {
  onClick?: (event: MouseEvent<HTMLDivElement, any>) => void
  className?: string
  children: ReactNode
}

const VehicleButton = (props: Props) => {
  const { onClick, children, className } = props
  const containerRef = useRef<HTMLDivElement>(null)
  useTabbable(containerRef)

  return (
    <div
      onClick={(event) => onClick && onClick(event)}
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
