import styles from './MultipleSelectButton.module.css'
import { Button, Tabbable } from 'components'
import { ReactElement, useRef } from 'react'
import useMultipleSelectButton from './useMultipleSelectButton'
import { ArrowIcon, XmarkIcon } from 'icons'

interface Props<T> {
  getDetails: (item: T) => string
  resetHandler: () => void
  items: T[]
  isItemSelected: (item: T) => boolean
  children: ReactElement
}

function MultipleSelectButton<T>(props: Props<T>) {
  const { getDetails, resetHandler, items, isItemSelected, children } = props
  const buttonRef = useRef<HTMLDivElement>(null)
  const { isOpen, setOpen, setClosed } = useMultipleSelectButton(buttonRef)

  const selectedItems = items.filter(isItemSelected)

  return (
    <div className={styles.container} ref={buttonRef}>
      <Button
        onClick={isOpen ? setClosed : setOpen}
        selected={isOpen || selectedItems.length > 0}
      >
        <div className={styles.buttonContainer}>
          <div className={styles.information}>
            <div>More</div>
            <div className={styles.details}>{makeDetails()}</div>
          </div>
          <div
            className={[
              styles.iconContainer,
              selectedItems.length > 0 ? styles.xmark : null,
            ].join(' ')}
          >
            {renderIcon()}
          </div>
        </div>
      </Button>
      {isOpen && renderRows()}
    </div>
  )

  function makeDetails(): string {
    if (selectedItems.length === 0) return ''
    if (selectedItems.length === 1) return getDetails(selectedItems[0])
    return `${selectedItems.length} selected`
  }

  function renderIcon() {
    if (selectedItems.length > 0)
      return (
        <Tabbable
          className={styles.icon}
          onClick={() => {
            setTimeout(() => {
              resetHandler()
              setClosed()
            }, 0)
          }}
        >
          <XmarkIcon />
        </Tabbable>
      )

    return <ArrowIcon className={isOpen ? styles.rotated180 : null} />
  }

  function renderRows() {
    return <div className={styles.rows}>{children}</div>
  }
}

export default MultipleSelectButton
