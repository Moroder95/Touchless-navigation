import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessProps {
    children: React.ReactNode
    style?: React.CSSProperties
}
 
const Touchless: React.SFC<TouchlessProps> = ({children, style }) => {
    return ( 
        <div className={`${styles.touchless}`} style={style}>
            {children}
        </div>
     );
}
 
export default Touchless;