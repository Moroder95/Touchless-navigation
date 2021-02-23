import * as React from 'react';
import styles from './styles.module.css'


export interface TouchlessAppProps {
    children: React.ReactNode
}
 
const TouchlessApp: React.SFC<TouchlessAppProps> = ({children}) => {
    React.useEffect(()=>{
        const elements = document.querySelectorAll('.' + styles.touchless);
        const keyEvent = (e: KeyboardEvent)=>{
            const controlledElement = document.querySelector('.' + styles.touchless + '.'+styles.active);
            
            
        }
        document.addEventListener( 'keydown', keyEvent );

        return ()=>{
            document.removeEventListener('keydown', keyEvent);
        }
    }, [ ]);
    
    return ( 
        <div className={styles['touchless-app']}>
            {children}
        </div>
     );
}
 
export default TouchlessApp;