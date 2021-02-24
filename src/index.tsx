import * as React from 'react'
import styles from './styles.module.css'
export { default as Grid} from './GridComponents/Grid'
export { default as TouchlessApp} from './TouchlessApp'
export { default as Touchless} from './Touchless'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}