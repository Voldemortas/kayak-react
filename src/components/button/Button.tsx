import styles from './Button.module.css'
import { ReactNode, useRef } from 'react'
import useButton from './useButton'

export interface Props {
  onClick: () => void
  children: ReactNode
  selected?: boolean
}

const VehicleButton = (props: Props) => {
  const { onClick, children, selected } = props
  const containerRef = useRef<HTMLDivElement>(null)
  useButton(containerRef)

  const combinedStyle = [styles.container, !!selected ? styles.selected : null]

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      ref={containerRef}
      className={combinedStyle.join(' ')}
    >
      {children}
    </div>
  )
}

export default VehicleButton
