import * as React from 'react';
import styles from 'styles.module.css'

export interface TouchlessAppProps {
    children: React.ReactNode
}
 
const TouchlessApp: React.SFC<TouchlessAppProps> = ({children}) => {
    React.useEffect(()=>{
        const elements = document.querySelectorAll('.' + styles.touchless);
        const keyEvent = (e: KeyboardEvent)=>{
            
            
        }
        document.addEventListener( 'keydown', keyEvent );

        return ()=>{
            document.removeEventListener('keydown', keyEvent);
        }
    }, []);
    
    return ( 
        <div className={styles['touchless-wrapper']}>
            {children}
        </div>
     );
}
 
export default TouchlessApp;