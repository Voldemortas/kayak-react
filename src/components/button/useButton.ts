import { RefObject, useEffect } from 'react'

export default function useButton(componentRef: RefObject<HTMLElement>) {
  useEffect(() => {
    addListeners()

    return () => removeListeners()

    function addListeners() {
      componentRef.current?.addEventListener('keyup', handleKeyUp)
    }

    function removeListeners() {
      componentRef.current?.removeEventListener('keyup', handleKeyUp)
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.code === 'Enter' || event.code === 'Space')
        componentRef.current?.click()
    }
  }, [componentRef])
}
