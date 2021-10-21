import styles from './App.module.css'
import { Template } from 'components'

function App() {
  return (
    <>
      <Template /> <span className={styles.template}>I am green</span>
    </>
  )
}

export default App
