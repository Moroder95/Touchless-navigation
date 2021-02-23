import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessProps {
    children: React.ReactNode
}
 
const Touchless: React.SFC<TouchlessProps> = ({children}) => {
    return ( 
        <div className={styles.touchless}>
            {children}
        </div>
     );
}
 
export default Touchless;