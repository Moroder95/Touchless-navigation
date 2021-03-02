import * as React from 'react';
import styles from 'styles.module.css'
import UidContextProvider from './Context/UidContext';
import  TouchlessApp  from './TouchlessApp'

export interface TouchlessAppWrapperProps {
    children: React.ReactNode
    startElement?: number;
    secondaryThreshold?: number;
}

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = ({ children, startElement, secondaryThreshold}) =>( 
    <UidContextProvider>
        <TouchlessApp startElement={ startElement } secondaryThreshold={ secondaryThreshold }>
            { children }
        </TouchlessApp>
    </UidContextProvider>
);
 
export default TouchlessAppWrapper;