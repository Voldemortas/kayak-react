import styles from './Button.module.css'
import { ReactNode } from 'react'
import { Tabbable } from 'components'

export interface Props {
  onClick: () => void
  children: ReactNode
  selected?: boolean
}

const VehicleButton = (props: Props) => {
  const { onClick, children, selected } = props

  const combinedStyle = [styles.container, !!selected ? styles.selected : null]

  return (
    <Tabbable onClick={onClick} className={combinedStyle.join(' ')}>
      {children}
    </Tabbable>
  )
}

export default VehicleButton
