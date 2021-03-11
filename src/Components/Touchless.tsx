import * as React from 'react';
import styles from '../styles.module.css'

export interface TouchlessProps {
    children: React.ReactNode
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement | MouseEvent>) => void
    className?: string
    startElement?: boolean;
}
 
const Touchless: React.SFC<TouchlessProps> = ({children, style, onClick, className="", startElement = false}) => {
    const ref = React.useRef<any>(null);
    // If the active class is present and a prop changes the classes passed in will still contain the active classes
    const componentClasses = ref?.current?.classList?.contains(styles.active) ? className + ' active ' + styles.active : className;
    return ( 
        <div ref={ref} className={`${styles.touchless} ${startElement ? 'start-element' : ''} ${componentClasses}`} style={style} onClick={onClick}>
            {children}
        </div>
     );
}

export default Touchless;