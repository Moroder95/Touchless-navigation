import React, { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import 'leapjs-plugins';
import * as Leap from 'leapjs';
import { cursorClick } from '../Functions/freeCursorClick';

import { CursorStyle, CursorRingStyle, LeapError, CenterDot } from '../CursorStyle';

export interface LeapMotionAppProps {
    children: React.ReactNode
    topOffset?: number
    leftOffset?: number
    showCenterDot?: boolean
    touchPlane?: number
    clickLength?: number
}

const pBetween= (input:number, min:number, max:number): number => Math.round(((input - min) * 100) / (max - min));

const LeapMotionApp: React.SFC<LeapMotionAppProps> = (
    {
        children, 
        topOffset= 900, 
        leftOffset= 100, 
        showCenterDot=false,
        touchPlane= 100,
        clickLength= 100,
    }) => {
    const [connectedStatus, setConnectedStatus] = useState(false);
    useEffect(() => {
       const controller = new Leap.Controller();
       const cursor: any = document.getElementsByClassName(`cursor ${styles.cursor}`)[0];
       const cursorRing: any = document.getElementsByClassName(`cursor-ring ${styles.cursor}`)[0];
       const touchlessElements = document.querySelectorAll('.' + styles.touchless);
       const clickPos = touchPlane - clickLength;
       let canClick = true;

       controller.use('screenPosition', {positioning: 'absolute', scale: 1});

       controller.on('frame', function (frame: any) {
           const { hands } = frame;
           
        if(hands.length){
            const hand = hands[0];
            const zAxis = hand.screenPosition()[2];    

            if(zAxis > touchPlane){ // if not on touchplane, change cursor  position
                
                const handOffset = hand.type === "left" ? 320 : 0;

                cursor.style.left= hand.screenPosition()[0] * 0.8 + leftOffset + handOffset + 'px';
                cursor.style.top= hand.screenPosition()[1] * 0.79 + topOffset + 'px';
                
            }else if(canClick && zAxis < clickPos){ // If at clickpos, and it's not clicked, run click function and set canClick to false, to not loop click
                canClick = false;
                cursor.style.opacity = 0.6;

                cursorClick(cursor, touchlessElements);
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
                cursor.style.borderWidth = `${Math.max(newWidth, 5)}px`;

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
            console.error('LeapMotion sensor has been removed');
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
    }, [ topOffset, leftOffset, clickLength, touchPlane]);


    return(
        <div className={`${styles['touchless-app']} touchless-app`}>
            {showCenterDot && <div  style={CenterDot}></div>}
            
            {!connectedStatus && (
                <div style={LeapError}>
                    <h1>NO LEAPMOTION DETECTED</h1>
                </div>
            )}

                <div className={`cursor ${styles.cursor}`} style={CursorStyle}>
                    <div className={`cursor-ring ${styles.cursor}`} style={CursorRingStyle}></div>
                </div>
                {children}     
        </div>
    )
}
 
export default LeapMotionApp;