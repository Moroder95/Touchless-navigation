import * as React from 'react'
import styles from './styles.module.css'
export { v4 as uuid} from 'uuid'
export { default as Grid} from './GridComponents/Grid'
export { default as TouchlessApp} from './TouchlessWrapper';
export { default as Touchless} from './Touchless'
export { default as MobileQR} from './MobileQR'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}