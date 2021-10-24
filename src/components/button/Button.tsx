import styles from './Button.module.css'
import { MouseEvent, ReactNode } from 'react'
import { Tabbable } from 'components'

export interface Props {
  onClick: (event: MouseEvent) => void
  children: ReactNode
  selected?: boolean
  className?: string
}

const VehicleButton = (props: Props) => {
  const { onClick, children, selected, className } = props

  const combinedStyle = [
    className,
    styles.container,
    !!selected ? styles.selected : null,
  ]

  return (
    <Tabbable onClick={onClick} className={combinedStyle.join(' ')}>
      {children}
    </Tabbable>
  )
}

export default VehicleButton
