import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessProps {
    children: React.ReactNode
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement | MouseEvent>) => void
}
 
const Touchless: React.SFC<TouchlessProps> = ({children, style, onClick}) => {
    return ( 
        <div className={`${styles.touchless}`} style={style} onClick={onClick}>
            {children}
        </div>
     );
}
 
export default Touchless;