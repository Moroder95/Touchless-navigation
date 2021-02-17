import * as React from 'react';
import styles from '../styles.module.css'

export interface GridItemProps {
    posX: number
    posY:number
    active: boolean
    children: React.ReactNode
}
 
const GridItem: React.SFC<GridItemProps> = ({posX, posY, active, children}) => {
    return ( 
        <div className={`${styles['grid-child-wrapper']}  ${active ? styles.active : ''}`}>
            {children}
        </div>
    );
}
 
export default GridItem;