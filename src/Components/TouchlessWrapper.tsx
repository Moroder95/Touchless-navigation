import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import LeapMotionApp from './LeapMotionApp';
import PhoneCursor from './PhoneCursor';
import LeapMotionAppPinch from './LeapMotionAppPinch';
import  TouchlessApp  from './TouchlessApp'
import CustomKeysContextProvider from '../Context/CustomKeysContext';

export interface TouchlessAppWrapperProps {
    children: React.ReactNode
    interactionType?: 'phoneHighlight' | 'phoneCursor' | 'leapMotion' | 'leapMotionPinch'
    devOptions?: boolean;
    // Props for PhoneHighlight
    secondaryThreshold?: number;

    //Props for LeapMotion Apps
    leftOffset?: number;
    topOffset?: number;

    //Props for normal LeapMotion App¨
    touchPlane?: number
    clickLength?: number

    //Props for Pinch LeapMotion App
    strengthToClick?: number;
    strengthBeforeClickReset?: number;
    pinchOrGrab?: 'pinch' | 'grab';
}
const interactionTypes = Object.freeze({
    phoneHighlight: 0,
    phoneCursor: 1,
    leapMotion: 2,
    leapMotionPinch: 3
});

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = (
    { 
        children, 
        secondaryThreshold, 
        interactionType="phoneHighlight", 
        devOptions= false, 
        leftOffset, 
        topOffset, 
        pinchOrGrab, 
        strengthToClick, 
        strengthBeforeClickReset, 
        clickLength, 
        touchPlane
    }) =>( 
    <UidContextProvider>
        <CustomKeysContextProvider>
            { interactionTypes[interactionType]  === 0 && // Phone Highlight
                <TouchlessApp secondaryThreshold={ secondaryThreshold }>
                    { children }
                </TouchlessApp>
            }
            { interactionTypes[interactionType]  === 1 &&  // Phone Cursor
                <PhoneCursor>
                    { children }
                </PhoneCursor>
            }
            { interactionTypes[interactionType]  === 2 && // Leap Motion
                <LeapMotionApp leftOffset={leftOffset} topOffset={topOffset} showCenterDot={devOptions} clickLength={clickLength} touchPlane={touchPlane}>
                    { children }
                </LeapMotionApp>
            }
            { interactionTypes[interactionType]  === 3 && // Leap Motion Pinch
                <LeapMotionAppPinch leftOffset={leftOffset} topOffset={topOffset} showCenterDot={devOptions} grabOrPinch={pinchOrGrab} strengthBeforeClickReset={strengthBeforeClickReset} strengthToClick={strengthToClick}>
                    { children }
                </LeapMotionAppPinch>
            }
        </CustomKeysContextProvider>
    </UidContextProvider>
);

export default TouchlessAppWrapper;
