import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import LeapMotionApp from './LeapMotionApp';
import PhoneCursor from './PhoneCursor';
import LeapMotionAppPinch from './LeapMotionAppPinch';
import CustomKeysContextProvider from '../Context/CustomKeysContext';
import PhoneHighlight from './PhoneHighlight';

export interface TouchlessAppProps {
    children: React.ReactNode;
    interactionType?:
        | 'phoneHighlight'
        | 'phoneCursor'
        | 'leapMotion'
        | 'leapMotionPinch';
    devOptions?: boolean;
    // Props for PhoneHighlight
    secondaryThreshold?: number;

    //Props for LeapMotion Apps
    leftOffset?: number;
    topOffset?: number;

    //Props for normal LeapMotion App
    touchPlane?: number;
    clickLength?: number;
    disableLock?: boolean;

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

const TouchlessApp: React.SFC<TouchlessAppProps> = ({
    children,
    secondaryThreshold,
    interactionType = 'phoneHighlight',
    devOptions = false,
    leftOffset,
    topOffset,
    pinchOrGrab,
    strengthToClick,
    strengthBeforeClickReset,
    clickLength,
    touchPlane,
    disableLock
}) => (
    <UidContextProvider>
        <CustomKeysContextProvider>
            {interactionTypes[interactionType] === 0 && ( // Phone Highlight
                <PhoneHighlight secondaryThreshold={secondaryThreshold}>
                    {children}
                </PhoneHighlight>
            )}
            {interactionTypes[interactionType] === 1 && ( // Phone Cursor
                <PhoneCursor>{children}</PhoneCursor>
            )}
            {interactionTypes[interactionType] === 2 && ( // Leap Motion
                <LeapMotionApp
                    leftOffset={leftOffset}
                    topOffset={topOffset}
                    showCenterDot={devOptions}
                    clickLength={clickLength}
                    touchPlane={touchPlane}
                    disableLock={disableLock}
                >
                    {children}
                </LeapMotionApp>
            )}
            {interactionTypes[interactionType] === 3 && ( // Leap Motion Pinch
                <LeapMotionAppPinch
                    leftOffset={leftOffset}
                    topOffset={topOffset}
                    showCenterDot={devOptions}
                    grabOrPinch={pinchOrGrab}
                    strengthBeforeClickReset={strengthBeforeClickReset}
                    strengthToClick={strengthToClick}
                >
                    {children}
                </LeapMotionAppPinch>
            )}
        </CustomKeysContextProvider>
    </UidContextProvider>
);

export default TouchlessApp;
