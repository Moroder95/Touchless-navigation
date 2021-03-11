import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import  TouchlessApp  from './TouchlessApp'

export interface TouchlessAppWrapperProps {
    children: React.ReactNode
    secondaryThreshold?: number;
}

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = ({ children, secondaryThreshold}) =>( 
    <UidContextProvider>
        <TouchlessApp secondaryThreshold={ secondaryThreshold }>
            { children }
        </TouchlessApp>
    </UidContextProvider>
);
 
export default TouchlessAppWrapper;