import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessProps {
    children: React.ReactNode
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement | MouseEvent>) => void
    className?: string
}
 
const Touchless: React.SFC<TouchlessProps> = ({children, style, onClick, className =""}) => {
    return ( 
        <div className={`${styles.touchless} ${className}`} style={style} onClick={()=>{}} tabIndex={0}>
            {children}
        </div>
     );
}
 
export default Touchless;