import styles from './Template.module.css'
import useTemplate from './useTemplate'

const Template = () => {
  const { state, toggle } = useTemplate()

  const combinedStyle = [
    styles.template,
    state ? styles.pink : styles.blue,
  ].join(' ')

  return (
    <span onClick={toggle} className={combinedStyle}>
      I am a template, reuse me
    </span>
  )
}

export default Template
