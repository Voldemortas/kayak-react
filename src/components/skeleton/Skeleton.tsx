import styles from './Skeleton.module.css'

interface Props {
  width: number
  height: number
}

const Skeleton = (props: Props) => {
  const { width, height } = props

  return <span style={{ width, height }} className={styles.skeleton} />
}

export default Skeleton
