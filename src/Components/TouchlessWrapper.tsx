import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import LeapMotionApp from './LeapMotionApp';
import  TouchlessApp  from './TouchlessApp'

export interface TouchlessAppWrapperProps {
    children: React.ReactNode
    secondaryThreshold?: number;
    leapMotion?: boolean;
    phoneController?: boolean;
}

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = ({ children, secondaryThreshold, leapMotion=false, phoneController=false}) =>( 
    <UidContextProvider>
        { phoneController && 
            <TouchlessApp secondaryThreshold={ secondaryThreshold }>
                { children }
            </TouchlessApp>
        }
        { leapMotion && 
            <LeapMotionApp>
                { children }
            </LeapMotionApp>
        }
    </UidContextProvider>
);
 
export default TouchlessAppWrapper;