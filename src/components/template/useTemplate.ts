import { useState } from 'react'

function useTemplate() {
  const [state, setState] = useState<boolean>(false)

  function toggle() {
    setState(!state)
  }

  return { state, toggle }
}

export default useTemplate
