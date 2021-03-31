import React, { useEffect, useState } from 'react'
// import * as Leap from 'leapmotionts';
// import { LeapEvent } from 'leapmotionts';
import styles from '../styles.module.css';
import 'leapjs-plugins';
import * as Leap from 'leapjs';
import { CursorStyle, CursorRingStyle } from '../CursorStyle';
import { MyRect } from '../MyRect'
export interface LeapMotionAppProps {
    children: React.ReactNode
    topOffset?: number
    leftOffset?: number
}

const pBetween= (input:number, min:number, max:number): number => Math.round(((input - min) * 100) / (max - min));

const LeapMotionApp: React.SFC<LeapMotionAppProps> = ({children, topOffset= 1000, leftOffset= 25}) => {
    const [connectedStatus, setConnectedStatus] = useState(false);
    useEffect(() => {
       const controller = new Leap.Controller({enableGestures: true});
       const cursor: any = document.getElementsByClassName(styles.cursor)[0];
       const cursorRing: any = document.getElementsByClassName(`cursor-ring ${styles.cursor}`)[0];
       const touchlessElements = document.querySelectorAll('.' + styles.touchless);

        const touchPlane = 100;
        const clickLength = 100;
        const clickPos = touchPlane - clickLength;
        let canClick = true;
       controller.use('screenPosition');
        controller.on('connected', ()=>{
            // setConnectedStatus(true)
        })
        
        const cursorClick = (element: HTMLDivElement)=>{
            const cursorRect: MyRect = new MyRect(element);

            const rectCmp = (a:HTMLElement, b:HTMLElement)=>{
                const aDistances = cursorRect.distanceFromElToCenter(new MyRect(a));
                const bDistances = cursorRect.distanceFromElToCenter(new MyRect(b));
                const res1 = aDistances[0] - bDistances[0];
                const res2 = aDistances[1] - bDistances[1];
                return Math.abs(res1) < 2 ? res2 : res1;
            }

            let clickEl = null;
            let collidingElements: HTMLElement[] = [];
            for(let i = 0; i < touchlessElements.length; i++){
                const el = touchlessElements.item(i);
                const myRect: MyRect = new MyRect(el);

                clickEl = cursorRect.doRectsCollide(myRect);
                if(clickEl){
                    collidingElements = [...collidingElements, el as HTMLElement];
                }
            }
            
            if(collidingElements.length > 0){
                if(collidingElements.length > 1){
                    collidingElements.sort(rectCmp)
                }
                collidingElements[0].click();
            }
            
        }

       controller.on('frame', function (frame: any) {
           const { hands } = frame;
           
        if(hands.length){
            const hand = hands[0];
            const zAxis = hand.screenPosition()[2];
            if(zAxis > touchPlane){ // if not on touchplane, change cursor  position
                cursor.style.left= hand.screenPosition()[0] + leftOffset + 'px';
                cursor.style.top= hand.screenPosition()[1]+ topOffset + 'px';
                
            }else if(canClick && zAxis < clickPos){ // If at clickpos, and it's not clicked, run click function and set canClick to false, to not loop click
                canClick = false;
                cursor.style.opacity = 0.6;
                cursorClick(cursor);
            }else if(!canClick && zAxis > clickPos){ // If it has been clicked, and hand is moved back, re enable click.
                canClick = true;
                cursor.style.opacity = '';
            }

            const zPercent = pBetween(zAxis, touchPlane, touchPlane+200);

            const clickPercent = pBetween(zAxis, touchPlane, clickPos);

            if(cursorRing && zPercent >= 0 && zPercent <= 100){ // calc and set size and opacity of outer ring
                const size = (100 + 2 * zPercent) + "%";
                cursorRing.style.opacity = 1 - zPercent/100;
                cursorRing.style.height = size;
                cursorRing.style.width = size;
            }else if(cursorRing && ( cursorRing.style.opacity > 0 || parseFloat(cursorRing.style.height) < 100)){ //Else default styling
                cursorRing.style.opacity = 0;
                cursorRing.style.height = '100%';
                cursorRing.style.width = '100%';
            }

            if(cursor && clickPercent >= 0 && clickPercent <= 100){ //About to click, position locked and circle starts to fill
                const newWidth = (clickPercent)/2;
                cursor.style.borderWidth = `${Math.max(newWidth, 5)}px`
            }else if(cursor && clickPercent < 0  &&  cursor.style.borderWidth !== "5px"){ // out of click zone, default style
                cursor.style.borderWidth ="";
            }else if( cursor && clickPercent > 100 ){ // if circle is not filled, and should be, fill it.
                if(cursor.style.borderWidth !== "50px"){
                    cursor.style.borderWidth ="50px";
                }
                
            }
        }
       });
       
       controller.on('deviceRemoved', onDeviceRemoved);
       function onDeviceRemoved(){
        console.log('Removed')
           setConnectedStatus(false)
       }

       controller.on('deviceAttached', onDeviceAttached);
       function onDeviceAttached(){
           console.log('Attached')
           setConnectedStatus(true)
       }
        controller.connect();
       
        return () => {
         controller.disconnect();
        }
    }, [ topOffset, leftOffset]);


    return(
        <div className={`${styles['touchless-app']} touchless-app`}>
            {!connectedStatus && (
                <div style={{position: "absolute", top: 0, left:0, width:"100vw", height:"100vh", zIndex:1000, display:"flex", justifyContent:"center", alignItems:"center", background:"#fff"}}>
                    <h1>NO LEAPMOTION DETECTED</h1>
                </div>
            )}
                <div className={`cursor ${styles.cursor}`} style={CursorStyle}><div className={`cursor-ring ${styles.cursor}`} style={CursorRingStyle} ></div></div>
                {children}     
        </div>
    )
}
 
export default LeapMotionApp;