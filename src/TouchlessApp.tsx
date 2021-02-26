import * as React from 'react';
import styles from './styles.module.css'

export interface TouchlessAppProps {
    children: React.ReactNode
    startElement?: number;
    secondaryThreshold?: number;
}
interface coordinateObj {
    x: number,
    y: number,
    pos?: DOMRect | null
}
const TouchlessApp: React.SFC<TouchlessAppProps> = ({children, startElement = 0, secondaryThreshold = 10}) => {
    React.useEffect(()=>{
        const elements = document.querySelectorAll('.' + styles.touchless); // Get all elements that can be controlled
        const controlled = document.querySelectorAll('.' + styles.touchless + '.'+styles.active); // Get currently controlled Element
        
        if(controlled.length === 0 && elements.length > 0){ //If there is no controlled and there are elements to be controlled
            const i = startElement <= elements.length ?  startElement-1 : 0 // i is index of what is chosen from props. If it's not specified in props it start with the first element of the list
            elements[i].classList.add(styles.active, 'active'); //Add classname so that it's controlled
        }
        const getCenterPos = (element: HTMLDivElement | null) : coordinateObj  => { // Function that gives X and Y coordinates on an HTMLDivElement  and the getBoundingClientRect object
            const pos =  element?.getBoundingClientRect() || null;
            const y: number = pos?.y || 0;
            const x: number = pos?.x || 0;
            
            return {x, y, pos};
        }
        
        const keyEvent = (e: KeyboardEvent)=>{
            // Get the currently selected Element from the DOM
            const controlledElement: HTMLDivElement | null = document.querySelector('.' + styles.touchless + '.'+styles.active);

            //If keypress is not = Arrow keys or Enter, return and dont execute any code
            if(!['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter'].includes(e.key)){
                return 
            }else if('Enter' === e.key){ //If enter click the selected Element and return
                controlledElement?.click();
                return
            }
            
            let closest: HTMLDivElement | null= null; // Variable for storing the closest DOM element in the direction wanted
            const xy = e.key === 'ArrowLeft' ||e.key === 'ArrowRight' ? 'x' : 'y'; // If left or Right Arrow  - Primary axis is set to X, else it is set to Y
            const xy2 = xy === 'x' ? 'y' : 'x'; //Secondary axis, the opposite of primary axis
            const direction = e.key === 'ArrowDown' ||e.key === 'ArrowRight' ? 1 : -1; // Direction variable is a multiplier to ensure positive values when an Elements position is in the right direction in relation to the starting point
            const sThreshold =  secondaryThreshold
            ; //Threshold is how far of an element is allowed to be positioned in the secondary direction in relation to the starting point
            let loops = 1; // Variable to keep count of loops made and used for multiplying the threshold, to gradually find closest element in relation to the secodnary axis.
            const maxLoops= 15; // Variable to stop if loops variable exceeds this number

            // Function the alters the variable called Closest, it calls itself no more than the times maxLoops contains.
            const findClosestElement = (thresMultplier: number) => { 
                //Goes through the list of all the elements that can potentially be selected
                elements.forEach(el=>{
                    //closest is null and the element that is controlled is not the current element then. This only executes when no closest element has been set.
                    if(closest === null && el !== controlledElement && el && controlledElement){
                        const controlled= getCenterPos(controlledElement); //get x, y coordinates of the controlled element
                        const check = getCenterPos(el as HTMLDivElement) //get x, y coordinates of the current element in the nodeList
                        
                        // newDifference stores the difference in position on PRIMARY axis between the current Element in the nodeList and the controlled Elements. 
                        // It is muliplied by direction to get positive values if it's the direction the arrowKey is pointing at
                        const newDifference  = (check[xy] - controlled[xy]) * direction; 
                        //newDifferenceSecondary stores the difference in position on SECONDARY axis between the current Element in the nodeList and the controlled Elements.
                        //The value is absolute as it can be to either side of the controlled Element
                        const newDifferenceSecondary = Math.abs(check[xy2] - controlled[xy2]); 

                        //If the newDifference is above 0, it's in the right direction AND the difference on the secondary axis is below the threshold
                        //set the current element in the nodelist as the closest for now.
                        if(newDifference > 0 && newDifferenceSecondary < sThreshold*thresMultplier){ 
                            closest = el as HTMLDivElement;
                        }
                        
                    }else if(closest && controlledElement && el as HTMLDivElement && el !== controlledElement){
                        const controlled= getCenterPos(controlledElement); //get x, y coordinates of the controlled element
                        const check = getCenterPos(el as HTMLDivElement) //get x, y coordinates of the current element in the nodeList
                        const close = getCenterPos(closest); //get x, y coordinates of the currently closest element in the nodeList

                        // closestDifference and newDifference stores the difference in position on PRIMARY axis between the currently closest and current Element in the nodeList and the controlled Elements. 
                        // It is muliplied by direction to get positive values if it's the direction the arrowKey is pointing at
                        const closestDifference = (close[xy] - controlled[xy]) * direction;
                        const newDifference  = (check[xy] - controlled[xy]) * direction;

                        //newDifferenceSecondary and newDifferenceSecondary stores the difference in position on SECONDARY axis between the currently closest and current Element in the nodeList and the controlled Elements.
                        //The value is absolute as it can be to either side of the controlled Element
                        const closestDifferenceSecondary= Math.abs(close[xy2] - controlled[xy2]);
                        const newDifferenceSecondary = Math.abs(check[xy2] - controlled[xy2]);
                        
                        if(    newDifference > 0 
                            && newDifferenceSecondary <= closestDifferenceSecondary
                            && newDifference <= closestDifference  
                            && newDifferenceSecondary < sThreshold*thresMultplier ){
                            closest = el as HTMLDivElement;   
                        }
                        
                    }
                });
                loops++; // loop counts up
                if(closest === null && loops<maxLoops){ // closest is still not found and loops hasn't exceeded max, try find a closest element with a larger threshold multiplier
                    findClosestElement(loops);
                }
                
            }
            //Execute function with starting multipler as 1
            findClosestElement(1);

            if(closest && controlledElement ){    //remove and add classname on controlled and new controlled element        
                controlledElement.classList.remove(styles.active, 'active');
                (closest as HTMLDivElement).classList.add(styles.active, 'active');
            }  
        }

        document.addEventListener( 'keydown', keyEvent ); // bind eventlistener

        return ()=>{
            console.log('removing event')
            document.removeEventListener('keydown', keyEvent);// remove eventlistener is unmount
        }
    }, [ secondaryThreshold, startElement ]);
    
    return ( 
        <div className={styles['touchless-app']}>
            {children}
        </div>
     );
}
 
export default TouchlessApp;