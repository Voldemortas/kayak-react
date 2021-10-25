import { RefObject, useEffect, useState } from 'react'

interface ResponseProps {
  isOpen: boolean
  setOpen: () => void
  setClosed: () => void
}

function useMultipleSelectButton(
  buttonRef: RefObject<HTMLElement>,
): ResponseProps {
  const [openStatus, setOpenStatus] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)

    function handleOutsideClick(event: MouseEvent) {
      if (!buttonRef.current?.contains(event.target as Node))
        setOpenStatus(false)
    }
  }, [buttonRef])

  function setOpen() {
    setOpenStatus(true)
  }

  function setClosed() {
    setOpenStatus(false)
  }

  return {
    isOpen: openStatus,
    setOpen,
    setClosed,
  }
}

export default useMultipleSelectButton
