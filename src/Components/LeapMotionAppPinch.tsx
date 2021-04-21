import React, { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import 'leapjs-plugins';
import * as Leap from 'leapjs';
import { cursorClick } from '../Functions/freeCursorClick';

import { CursorStyle, LeapError, CenterDot } from '../CursorStyle';

export interface LeapMotionAppProps {
    children: React.ReactNode
    topOffset?: number
    leftOffset?: number
    showCenterDot?: boolean
    grabOrPinch? : 'grab' | 'pinch',
    strengthToClick?: number
    strengthBeforeClickReset?: number
}

const pBetween= (input:number, min:number, max:number): number => Math.round(((input - min) * 100) / (max - min));

const LeapMotionApp: React.SFC<LeapMotionAppProps> = (
    {
        children, 
        topOffset= 900, 
        leftOffset= 100, 
        showCenterDot=false,
        strengthToClick= 1,
        strengthBeforeClickReset = 0.6,
        grabOrPinch= 'pinch'
    }) => {
    const [connectedStatus, setConnectedStatus] = useState(false);
    useEffect(() => {
       const controller = new Leap.Controller();
       const cursor: any = document.getElementsByClassName(`cursor ${styles.cursor}`)[0];

       let canClick = true;

       controller.use('screenPosition', {positioning: 'absolute', scale: 1});

       controller.on('frame', function (frame: any) {
           const { hands } = frame;
           
        if(hands.length){
            const hand = hands[0]; 
            const strength = hand[`${grabOrPinch}Strength`];
            const handOffset = hand.type === "left" ? 320 : 0;

            cursor.style.left= hand.screenPosition()[0] * 0.8 + leftOffset + handOffset + 'px';
            cursor.style.top= hand.screenPosition()[1] * 0.79 + topOffset + 'px';
           if(canClick && strength >= strengthToClick){ // If at clickpos, and it's not clicked, run click function and set canClick to false, to not loop click
                canClick = false;
                cursor.style.opacity = 0.6;
                
                cursorClick(cursor);
            }else if(!canClick && strength <= strengthBeforeClickReset){ // If it has been clicked, and hand is moved back, re enable click.
                canClick = true;
                cursor.style.opacity = '';
            }

            const clickPercent = pBetween(strength, 0, strengthToClick);


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
    }, [ topOffset, leftOffset, strengthToClick, strengthBeforeClickReset]);


    return(
        <div className={`${styles['touchless-app']} touchless-app`}>
            {showCenterDot && <div  style={CenterDot}></div>}
            
            {!connectedStatus && (
                <div style={LeapError}>
                    <h1>NO LEAPMOTION DETECTED</h1>
                </div>
            )}

                <div className={`cursor ${styles.cursor}`} style={CursorStyle}></div>
                {children}     
        </div>
    )
}
 
export default LeapMotionApp;