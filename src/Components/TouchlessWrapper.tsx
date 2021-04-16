import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import LeapMotionApp from './LeapMotionApp';
import  TouchlessApp  from './TouchlessApp'

export interface TouchlessAppWrapperProps {
    children: React.ReactNode
    secondaryThreshold?: number;
    interactionType?: 'phoneHighlight' | 'phoneCursor' | 'leapMotion';
    leftOffset?: number;
    topOffset?: number;
}
const interactionTypes = Object.freeze({
    phoneHighlight: 0,
    phoneCursor: 1,
    leapMotion: 2
});

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = ({ children, secondaryThreshold, interactionType="phoneHighlight", leftOffset, topOffset}) =>( 
    <UidContextProvider>
        { interactionTypes[interactionType]  === 0 && 
            <TouchlessApp secondaryThreshold={ secondaryThreshold }>
                { children }
            </TouchlessApp>
        }
        { interactionTypes[interactionType]  === 2 && 
            <LeapMotionApp leftOffset={leftOffset} topOffset={topOffset} showCenterDot={true}>
                { children }
            </LeapMotionApp>
        }
    </UidContextProvider>
);
 
export default TouchlessAppWrapper;