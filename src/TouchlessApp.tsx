import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessAppProps {
    children: React.ReactNode
}
interface coordinateObj {
    x: number,
    y: number,
    pos?: DOMRect | null
}
const TouchlessApp: React.SFC<TouchlessAppProps> = ({children}) => {
    React.useEffect(()=>{
        const elements = document.querySelectorAll('.' + styles.touchless);
        const controlled = document.querySelectorAll('.' + styles.touchless + '.'+styles.active);
        
        if(controlled.length === 0 && elements.length > 0){
            elements[0].classList.add(styles.active);
        }
        const getCenterPos = (element: HTMLDivElement | null) : coordinateObj  => {
            const pos =  element?.getBoundingClientRect() || null;
            // const y: number = pos.top + (element.offsetHeight / 2);
            // const x: number = pos.left + (element.offsetWidth / 2);
            const y: number = pos?.y || 0;
            const x: number = pos?.x || 0;
            
            return {x, y, pos};
        }
        
        const keyEvent = (e: KeyboardEvent)=>{
            const controlledElement: HTMLDivElement | null = document.querySelector('.' + styles.touchless + '.'+styles.active);
            const elements = document.querySelectorAll('.' + styles.touchless);
            
            // console.log(controlledElement, e.key, elements);
            let closest: HTMLDivElement | null= null;
            const elementsArray: HTMLDivElement[] = Array.prototype.slice.call(elements, 0);
            const xy = e.key === 'ArrowLeft' ||e.key === 'ArrowRight' ? 'x' : 'y';
            const xy2 = xy === 'x' ? 'y' : 'x';
            const direction = e.key === 'ArrowDown' ||e.key === 'ArrowRight' ? 1 : -1;
            const secondaryThreshold = 100;
            // hello my name is frederik and i make this code work yes
            const sortStuff = (a: HTMLDivElement, b: HTMLDivElement) =>{
                
                const controlled= getCenterPos(controlledElement);
                const aPos = getCenterPos(a);
                const bPos = getCenterPos(b);
                const aDif = (aPos[xy] - controlled[xy]) * direction;
                const bDif  = (bPos[xy] - controlled[xy]) * direction;

                const aDifSecond= Math.abs(aPos[xy2] - controlled[xy2]);

                const bDifSecond = Math.abs(bPos[xy2] - controlled[xy2]);
                if(aDifSecond - bDifSecond === 0  && aDif >0){
                    return aDif-bDif ;
                }else{
                    return aDifSecond - bDifSecond
                }
            }
            console.log(elementsArray.sort(sortStuff));
            elements.forEach(el=>{
                
                if(closest === null && el !== controlledElement && el && controlledElement){
                    const controlled= getCenterPos(controlledElement);
                    const check = getCenterPos(el as HTMLDivElement)
                    
                   
                    const newDif  = (check[xy] - controlled[xy]) * direction;
                    const nds = Math.abs(check[xy2] - controlled[xy2]);
                    if(newDif > 0 && nds < secondaryThreshold){
                        closest = el as HTMLDivElement;
                    }
                    
                }else if(closest && controlledElement && el as HTMLDivElement && el !== controlledElement){
                    const controlled= getCenterPos(controlledElement);
                    const check = getCenterPos(el as HTMLDivElement)
                    const close = getCenterPos(closest);
                    
                    const closestDif = (close[xy] - controlled[xy]) * direction;
                    const newDif  = (check[xy] - controlled[xy]) * direction;

                    const cdp= closestDif;
                    const cds= Math.abs(close[xy2] - controlled[xy2]);
                    const cdt = cdp + cds;
                    
                    const ndp = newDif;
                    const nds = Math.abs(check[xy2] - controlled[xy2]);
                    const ndt = ndp + nds;
                    if(ndp > 0 && nds <= cds){
                        if(ndp <= cdp  && nds <secondaryThreshold){
                            closest = el as HTMLDivElement; 
                        }
                    }
                    
                }
            });

            if(closest && controlledElement ){            
                controlledElement.classList.remove(styles.active);
                (closest as HTMLDivElement).classList.add(styles.active);
            } 
            
        }
        document.addEventListener( 'keydown', keyEvent );

        return ()=>{
            console.log('removing event')
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